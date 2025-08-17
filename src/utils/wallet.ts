import { Mnemonic, HDNodeWallet, Wallet, JsonRpcProvider, formatEther, parseEther } from "ethers";
import CryptoJS from 'crypto-js';
import * as bip39 from "bip39";

let cachedProvider: JsonRpcProvider | null = null;

function timeout<T>(p: Promise<T>, ms: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const t = setTimeout(() => reject(new Error('RPC timeout')), ms);
        p.then((v) => { clearTimeout(t); resolve(v); }).catch((e) => { clearTimeout(t); reject(e); });
    });
}

export async function getWorkingProvider(): Promise<JsonRpcProvider> {
    if (cachedProvider) return cachedProvider;

    const candidates: string[] = [];
    if (process.env.NEXT_PUBLIC_RPC_URL && process.env.NEXT_PUBLIC_RPC_URL.trim().length > 0) {
        candidates.push(process.env.NEXT_PUBLIC_RPC_URL.trim());
    }
    candidates.push(
        'https://ethereum.publicnode.com',
        'https://rpc.ankr.com/eth',
        'https://eth-mainnet.public.blastapi.io',
        'https://cloudflare-eth.com'
    );

    for (const url of candidates) {
        try {
            const p = new JsonRpcProvider(url);
            // quick health check with timeout
            await timeout(p.getBlockNumber(), 3000);
            cachedProvider = p;
            return p;
        } catch {
            // try next candidate
        }
    }

    // As a last resort, return a provider with the last candidate (may still fail, but avoids null)
    cachedProvider = new JsonRpcProvider(candidates[candidates.length - 1]);
    return cachedProvider;
}

export async function generateWalletFromMnemonic(mnemonic: string, index: number) {
    const path = `m/44'/60'/0'/0/${index}`;
    const hdNode = await HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic), path);
    return {
        address: hdNode.address,
        privateKey: hdNode.privateKey,
    };
}

export function deriveAddressesFromMnemonic(mnemonic: string, count: number): { index: number; address: string; privateKey: string }[] {
    const results: { index: number; address: string; privateKey: string }[] = [];
    for (let i = 0; i < count; i++) {
        const path = `m/44'/60'/0'/0/${i}`;
        const hdNode = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic), path);
        results.push({ index: i, address: hdNode.address, privateKey: hdNode.privateKey });
    }
    return results;
}

export async function getBalance(address: string): Promise<string> {
    try {
        const provider = await getWorkingProvider();
        const bal = await provider.getBalance(address);
        return formatEther(bal);
    } catch (e) {
        console.error('getBalance failed on primary RPC, retrying with fallback', e);
        // reset cache and retry once
        cachedProvider = null;
        const provider = await getWorkingProvider();
        const bal = await provider.getBalance(address);
        return formatEther(bal);
    }
}

export async function sendNative(mnemonic: string, fromIndex: number, to: string, amountEth: string): Promise<string> {
    const path = `m/44'/60'/0'/0/${fromIndex}`;
    const hdNode = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic), path);
    const provider = await getWorkingProvider();
    const wallet = new Wallet(hdNode.privateKey, provider);
    const tx = await wallet.sendTransaction({ to, value: parseEther(amountEth) });
    await tx.wait();
    return tx.hash;
}

export async function lookupEnsName(address: string): Promise<string | null> {
    try {
        const provider = await getWorkingProvider();
        const name = await provider.lookupAddress(address);
        return name;
    } catch {
        return null;
    }
}

export function encryptMnemonic(mnemonic: string, key: string): string {
    // key is expected to be a hex SHA256 string; use as passphrase directly
    return CryptoJS.AES.encrypt(mnemonic, key).toString();
}

export function decryptMnemonic(cipher: string, key: string): string | null {
    try {
        const bytes = CryptoJS.AES.decrypt(cipher, key);
        const text = bytes.toString(CryptoJS.enc.Utf8);
        return text || null;
    } catch {
        return null;
    }
}
import { Mnemonic, HDNodeWallet } from "ethers";
import * as bip39 from "bip39";



export async function generateWalletFromMnemonic(mnemonic: string, index: number) {
    const path = `m/44'/60'/0'/0/${index}`;
    const hdNode = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic), path);
    return {
        address: hdNode.address,
        privateKey: hdNode.privateKey,
    };
}
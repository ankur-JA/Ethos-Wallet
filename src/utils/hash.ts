import CryptoJS from "crypto-js";

export default function hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
}


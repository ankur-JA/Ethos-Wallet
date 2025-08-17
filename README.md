# 🦊 Ethos Wallet

A secure, non-custodial Ethereum wallet built with **Next.js**, **TypeScript**, and **TailwindCSS**. Features mnemonic-based key generation, multi-account support, real-time token balances, and a beautiful modern UI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Ethereum](https://img.shields.io/badge/Ethereum-Compatible-purple)

---

## ✨ Features

### 🔐 **Wallet Management**
- **Create New Wallet**: Generate secure 12-word mnemonic phrases
- **Import Existing Wallet**: Restore wallets using seed phrases
- **Multi-Account Support**: HD wallet with multiple derived accounts
- **Password Protection**: Local encryption with AES encryption
- **Auto-Lock**: Automatic wallet locking on browser refresh

### 💰 **Portfolio & Assets**
- **Real-Time Balances**: Live ETH and ERC-20 token balances
- **Price Integration**: Current prices and 24h changes via CoinGecko API
- **Portfolio Value**: Total USD portfolio calculation
- **Token Icons**: Visual token identification with logos
- **Multiple RPC Support**: Resilient blockchain connectivity

### 🔄 **Transactions**
- **Send ETH**: Native Ethereum transfers with gas estimation
- **Send Tokens**: ERC-20 token transfers
- **Receive**: QR code generation for easy receiving
- **Transaction History**: Recent activity with Etherscan links
- **Address Validation**: Prevents invalid transactions

### 🔒 **Security Features**
- **Client-Side Only**: No servers, fully browser-based
- **Encrypted Storage**: AES-encrypted seed phrases in localStorage
- **Password Hashing**: SHA256 password verification
- **Lock/Unlock**: Manual and automatic wallet locking
- **Private Key Access**: Secure viewing with password confirmation
- **Reset Wallet**: Complete data removal with confirmation

### 🎨 **User Experience**
- **Modern UI**: Glass morphism and gradient design
- **Responsive Design**: Mobile and desktop optimized
- **Dark Theme**: Beautiful dark color scheme
- **Smooth Animations**: Framer Motion transitions
- **Intuitive Navigation**: Clean and organized interface

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15.3.5 |
| **Language** | TypeScript |
| **Styling** | TailwindCSS |
| **Blockchain** | Ethers.js v6 |
| **Crypto** | BIP39, crypto-js |
| **UI Components** | Lucide React |
| **QR Codes** | react-qr-code |
| **Animations** | Framer Motion |
| **APIs** | CoinGecko, Multiple Ethereum RPCs |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with localStorage support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankur-JA/Ethos-Wallet.git
   cd ethos-wallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3001
   ```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 📱 How to Use

### Creating a New Wallet
1. Click "Create Wallet" on the home page
2. Set a strong password for local encryption
3. Securely write down your 12-word seed phrase
4. Confirm your seed phrase
5. Access your new wallet dashboard

### Importing an Existing Wallet
1. Click "Import Wallet" on the home page
2. Set a password for this device
3. Enter your existing 12-word seed phrase
4. Wallet validates and imports your accounts

### Managing Your Wallet
- **Lock Wallet**: Account menu → "Lock Wallet"
- **View Private Keys**: Account menu → "Show Private Keys" (requires password)
- **Switch Accounts**: Use account switcher in balance card
- **Reset Wallet**: Account menu → "Reset Wallet" (⚠️ permanent action)

### Sending Transactions
1. Navigate to dashboard
2. Click "Send" in the balance card
3. Enter recipient address and amount
4. Review transaction details and confirm
5. Transaction broadcasts to Ethereum network

---

## 🏗 Project Structure

```
ethos-wallet/
├── src/
│   ├── components/          # React components
│   │   ├── NavBar.tsx       # Navigation with account management
│   │   ├── HomeCard.tsx     # Landing page content
│   │   ├── BalanceCard.tsx  # Portfolio display
│   │   ├── AssetsCard.tsx   # Token list with prices
│   │   ├── TransactionCard.tsx # Send/receive interface
│   │   ├── CreatePassword.tsx # Password creation
│   │   ├── MnemonicCard.tsx # Seed phrase display
│   │   ├── InputMnemonicCard.tsx # Seed phrase input
│   │   └── Footer.tsx       # App footer
│   ├── pages/
│   │   ├── index.tsx        # Home page
│   │   ├── about/           # About page
│   │   ├── create-wallet/   # Wallet creation flow
│   │   ├── import-wallet/   # Wallet import flow
│   │   ├── dashboard/       # Main wallet interface
│   │   └── _app.tsx         # App wrapper with auth logic
│   ├── utils/
│   │   ├── wallet.ts        # Wallet operations
│   │   └── hash.ts          # Cryptographic functions
│   └── styles/
│       └── globals.css      # Global styles
├── public/                  # Static assets
├── next.config.ts           # Next.js configuration
└── package.json            # Dependencies and scripts
```

---

## 🔐 Security

### Local Storage
- Seed phrases are **AES-encrypted** before localStorage
- Passwords are **SHA256-hashed** for verification
- Private keys never leave your browser
- No data transmitted to external servers

### Best Practices
- Always backup your seed phrase securely
- Use strong passwords for wallet encryption
- Keep your browser updated
- Don't share private keys or seed phrases
- Verify recipient addresses before sending

### Data Storage
```javascript
localStorage:
- wallet_mnemonic_enc: AES-encrypted seed phrase
- wallet_password_hash: SHA256 password hash
- wallet_account_index: Current account index

sessionStorage:
- wallet_unlocked: Session unlock status
```

---

## 🌐 Supported Networks

Currently supports **Ethereum Mainnet** with plans for:
- Polygon
- Arbitrum
- Optimism
- Base

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind for styling
- Ensure responsive design
- Add proper error handling
- Test on multiple browsers

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This wallet is for educational and development purposes. While security best practices are implemented:

- Use at your own risk
- Always backup seed phrases
- Test with small amounts first
- Not audited by security professionals
- No warranty provided

---

## 🔗 Links

- **Live Demo**: [https://ethos-wallet.vercel.app](https://next-l31t.vercel.app/)
- **GitHub**: [https://github.com/ankur-JA/Ethos-Wallet](https://github.com/ankur-JA/Ethos-Wallet)
- **Issues**: [Report bugs or request features](https://github.com/ankur-JA/Ethos-Wallet/issues)

---

## 👨‍💻 Created By

**Gearhead** - [GitHub Profile](https://github.com/ankur-JA)

Built with ❤️ using modern web technologies for the Ethereum ecosystem.

---

*Ethos Wallet - Your keys, your crypto, your control.*

## LemonPay

### Description

LemonPay is a salary payment system designed to ensure freelancers receive their payments securely and promptly. The project includes a smart contract, a TheGraph subgraph index, and a web application. The smart contract enables employers to fund and lock their organization’s account, providing freelancers/employees assurance that their salary will be paid in advance. Additionally, the system allows freelancers/employees to trigger payments at any time after their work has been registered.

### Tech Stack

#### Smart Contract

- Solidity
- Hardhat
- Base Chain (Base-Sepolia)

#### Verification and Security

- WorldID for human verification

#### Indexing and Data Query

- TheGraph
- @apollo/client for querying data from Subgraph (GraphQL)

#### Web Application

- React/NextJs
- Typescript
- MUI for UI components

#### Blockchain Interaction

- Wagmi
- Viem

#### Additional Integrations

- ENS for front-end employee registration
- WalletConnect for wallet integration
- BlockScout for smart contract verification and on-chain activity viewing

### Features

- Employers can fund and lock their organization’s account in advance.
- Freelancers/employees can trigger payments at any time after the work has been registered.
- Ensures participation of unbanked individuals in the global financial system through blockchain payments.
- Records financial activity on-chain for transparency and accountability.
- Uses ENS for simplified and secure employee registration.
- Verifies employees as real humans with WorldID.
- Integrates WalletConnect for seamless wallet interactions.
- Smart contract and on-chain activities can be viewed and verified on BlockScout.

### How It Works

1. **Employer Registration**: Employers register their organization and fund their account.
2. **Employee Registration**: Employees register using ENS and verify their identity with WorldID.
3. **Work Registration**: Employees log their work days.
4. **Payment Trigger**: Employees can trigger the payment process anytime after work registration, ensuring timely and secure payment.

### Getting Started

1. Clone the repository.
2. Install dependencies:
   npm install
3.	Deploy the smart contract using Hardhat.
4.	Set up TheGraph subgraph to index on-chain events.
5.	Run the web application:
   npm run dev
  	
Link to project website: https://payroll-sand.vercel.app/

Link to project smart contract: https://base-sepolia.blockscout.com/address/0xa11548dEE3C0c753FcDaA20a1eb3aD4b9fEeFcD7#code

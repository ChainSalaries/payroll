# LemonPay

### Description

A salary payment system which makes sure freelancer will get the payment. The project contains a smart contract, thegraph subgraph index and a web application. The smart contract make employer fund and lock the organization account, which freelancer/employee could make sure their salary will be definitely paid in advance. What's more, the system allow freelancer/employee could trigger the payment at anytime.

### Tech Stack

The smart contract is built with solidity, hardhat and deployed to Base chain. The onchain events are indexed with thegraph subgraph. The main web application is built with React/NextJs with Typescript. Wagmi and Viem are used for interactive with blockchain, @apollo/client is used for query data from Subgraph(GraphQL).

- Sodility, Hardhat, Base Chain
- WorldID
- TheGraph, Walletconnect
- React/Next.Js, Typescript, MUI

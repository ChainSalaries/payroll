const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 6);
};

describe("USDC Token Contract", function () {
    let USDC;
    let usdc;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        USDC = await ethers.getContractFactory("USDC");
        [owner, addr1, addr2, _] = await ethers.getSigners();

        // Deploy the contract and wait for it to be mined.
        usdc = await USDC.deploy();
        await usdc.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await usdc.owner()).to.equal(owner.address);
        });

        it("Should have 6 decimals", async function () {
            expect(await usdc.decimals()).to.equal(6);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            // Mint tokens to the owner for transfer testing
            await usdc.mint(owner.address, tokens(1000));

            // Transfer 50 tokens from owner to addr1
            await usdc.transfer(addr1.address, tokens(50));
            const addr1Balance = await usdc.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(tokens(50));

            // Transfer 50 tokens from addr1 to addr2
            await usdc.connect(addr1).transfer(addr2.address, tokens(50));
            const addr2Balance = await usdc.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(tokens(50));
        });

        it("Should fail if sender doesn’t have enough tokens", async function () {
            const initialOwnerBalance = await usdc.balanceOf(owner.address);

            // Try to send 1 token from addr1 (0 tokens) to owner.
            await expect(
                usdc.connect(addr1).transfer(owner.address, tokens(1))
            ).to.be.reverted;

            // Owner balance shouldn't have changed.
            expect(await usdc.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });
    });

    describe("Minting", function () {
        it("Should mint tokens to an address", async function () {
            const mintAmount = tokens(100);
            await usdc.mint(addr1.address, mintAmount);
            const addr1Balance = await usdc.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(mintAmount);
        });

        it("Should fail to mint tokens if it exceeds max supply", async function () {
            const mintAmount = tokens(120000001); // Exceeding the max supply
            await expect(usdc.mint(addr1.address, mintAmount)).to.be.revertedWith("USDC: Exceeds max supply");
        });
    });
});

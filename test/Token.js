const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Token contract", function () {

  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("Token");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await Token.deploy();
    await hardhatToken.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, owner, addr1, addr2 };
  }

  describe("Deployment", function() {
    
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const { hardhatToken, owner } = await loadFixture(deployTokenFixture);    

        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Deployment should not assign the any Token to anyone else", async function () {
        const { hardhatToken, addr1 } = await loadFixture(deployTokenFixture);  

        const anotherBalance = await hardhatToken.balanceOf(addr1.address);
        expect(0).to.equal(anotherBalance);
    });

  })    

  describe("Transactions", function() {
    
    it("Should transfer tokens between accounts", async function() {
        const { hardhatToken, addr1, addr2 } = await loadFixture(deployTokenFixture);  

        // Transfer 50 tokens from owner to addr1
        await hardhatToken.transfer(addr1.address, 50);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

        // Transfer 50 tokens from addr1 to addr2
        await hardhatToken.connect(addr1).transfer(addr2.address, 50);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function() {
        const { hardhatToken, addr1, addr2 } = await loadFixture(deployTokenFixture);  

        // Transfer 50 tokens from owner to addr1
        await hardhatToken.transfer(addr1.address, 50);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

        // Fail to transfer 60 tokens from addr1 to addr2
        await expect(
            hardhatToken.connect(addr1).transfer(addr2.address, 60)
          ).to.be.revertedWith("Not enough tokens");

    });
  }) 

});
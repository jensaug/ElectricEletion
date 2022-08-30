const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

// https://www.val.se/download/18.5af422c516299cedac1fb5/1538729830824/Att%20r%C3%B6sta%20(engelska).pdf
describe("ElectrifiedElection contract", function () {

  async function deployElElFixture() {
    const ElectricElection = await ethers.getContractFactory("ElectricElection");
    const [owner] = await ethers.getSigners();

    const hhElEl = await ElectricElection.deploy();
    await hhElEl.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { ElectricElection, hhElEl, owner, ballot};
  }

  describe("Deployment", function() {
    
    it("Should not be possible to vote", async function () {
        const { hhElEl, owner } = await loadFixture(deployElElFixture);    

        await expect(
          hhElEl.vote(owner.address, 42)
        ).to.be.revertedWith("Too Soon Vote");
    });
  })    

  describe("Pre election", function() {

    it("Should be able to add a national ballot", async function () {
      const { hhElEl, owner, ballot } = await loadFixture(deployElElFixture);    

      await expect(
        hhElEl.addBallot(owner.address, 42)
      ).to.be.revertedWith("Too Soon Vote");
    });

    // it("Should be able to add a regional ballot", async function () {
    //   const { hhElEl, owner } = await loadFixture(deployElElFixture);    

    //   await expect(
    //     hhElEl.vote(owner.address, 42)
    //   ).to.be.revertedWith("Too Soon Vote");
    // });

    // it("Should be able to add a voting card", async function () {
    //   const { hhElEl, owner } = await loadFixture(deployElElFixture);    

    //   await expect(
    //     hhElEl.vote(owner.address, 42)
    //   ).to.be.revertedWith("Too Soon Vote");
    // });

    // it("Validate voting card", async function () {
    //   const { hhElEl, owner } = await loadFixture(deployElElFixture);    

    //   await expect(
    //     hhElEl.vote(owner.address, 42)
    //   ).to.be.revertedWith("Too Soon Vote");
    // });

    // it("Should not be possible to vote before start", async function () {
    //   const { hhElEl, owner } = await loadFixture(deployElElFixture);    

    //   await expect(
    //     hhElEl.vote(owner.address, 42)
    //   ).to.be.revertedWith("Too Soon Vote");
    // });

  })

  describe("Voting", function() {
  
    // it("Should be able to vote with a standard ballot", async function () {
    //   const { hhElEl, owner } = await loadFixture(deployElElFixture);    

    //   await expect(
    //     hhElEl.vote(owner.address, 42)
    //   ).to.be.revertedWith("Too Soon Vote");
    // });

    // it("Should be able to add a custom ballot", async function () {
    //   const { hhElEl, owner } = await loadFixture(deployElElFixture);    

    //   await expect(
    //     hhElEl.vote(owner.address, 42)
    //   ).to.be.revertedWith("Too Soon Vote");
    // });

    // it("Should not be possible to vote twice within a day", async function () {
    //   const { hhElEl, owner } = await loadFixture(deployElElFixture);    

    //   await expect(
    //     hhElEl.vote(owner.address, 42)
    //   ).to.be.revertedWith("Too Many Votes");
    // });

    // it("Should not be possible to view current standings before in-election result time", async function () {
    //   const { hhElEl, owner } = await loadFixture(deployElElFixture);    

    //   await expect(
    //     hhElEl.vote(owner.address, 42)
    //   ).to.be.revertedWith("Too Many Votes");
    // });
    
  })
      
  describe("Post election", function() {

    // it("Should not be possible to vote after end", async function () {
    //   const { hhElEl, owner } = await loadFixture(deployElElFixture);    

    //   await expect(
    //     hhElEl.vote(owner.address, 42)
    //   ).to.be.revertedWith("Too Soon Vote");
    // });      
  })  

});
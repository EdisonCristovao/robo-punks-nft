import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

describe("RoboPunksNFT", function () {
  async function deployRoboPunksNFTFixture() {
    const [owner] = await ethers.getSigners();

    const roboPunksNft = await ethers.getContractFactory("RoboPunksNft");
    const contract = await roboPunksNft.deploy();
    await contract.deployed();

    return { owner, contract };
  }
  it("Shoud not mint when miting is not enabled", async function () {
    const { contract } = await loadFixture(deployRoboPunksNFTFixture);

    await contract.setIsPublicMintEnabled(false);

    expect(contract.mint(1)).to.be.revertedWith("minting not enabled");
  });

  it("Total supply cant be grater than maxSpply", async function () {
    const { contract } = await loadFixture(deployRoboPunksNFTFixture);

    const newMaxSupply = 1;
    await contract.setIsPublicMintEnabled(true);
    await contract.setMaxSupply(newMaxSupply);

    expect(await contract.maxSupply()).to.equal(newMaxSupply);
    expect(await contract.mint(2)).to.be.revertedWith("sold out'");
  });
});

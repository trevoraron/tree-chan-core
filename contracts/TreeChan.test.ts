import { expect } from "chai";
import { TreeChan, TreeChan__factory } from "../@types/generated";
import hre from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber } from "ethers";

const { ethers } = hre;

const burn = "0x0000000000000000000000000000000000000000";

describe("TreeChan", () => {
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let token: TreeChan;

  beforeEach(async () => {
    [alice, bob] = await ethers.getSigners();

    const myTokenFactory = (await hre.ethers.getContractFactory(
      "TreeChan"
    )) as TreeChan__factory;

    token = await myTokenFactory.deploy("nfts.com/");
  });

  it("can make new thread", async () => {
    await token.connect(alice).newThread("hi");

    expect(await token.balanceOf(alice.address)).to.equal(1);
    expect(await token.getMessage(1)).to.equal("hi");
    expect(await token.tokenURI(1)).to.equal("nfts.com/1");
    expect(await token.getParent(1)).to.equal(0);
  });

  it("cant comment on token that does not exist", async () => {
    await expect(token.connect(alice).comment(1, "hola")).to.be.reverted;
  });

  it("can comment on new thread", async () => {
    await expect(token.connect(alice).newThread("hi"))
      .to.emit(token, "Transfer")
      .withArgs(burn, alice.address, 1);
    expect(await token.getDepth(1)).to.equal(0);

    await expect(token.connect(alice).comment(1, "hola"))
      .to.emit(token, "Transfer")
      .withArgs(burn, alice.address, 2);

    expect(await token.getMessage(2)).to.equal("hola");
    expect(await token.getDepth(2)).to.equal(1);
    const arr1 = await token.getParents(2);
    expect(arr1.length).to.equal(1);
    expect(arr1[0]).to.equal(BigNumber.from(1));
    expect(await token.getParent(2)).to.equal(1);

    const arr2 = await token.getBranches(1);
    expect(arr2.length).to.equal(1);
    expect(arr2[0]).to.equal(BigNumber.from(2));
  });

  /*
    1
    |
    2
    /\
    3  4
    /\
    5 6
  */
  it("can have many branches", async () => {
    await token.connect(alice).newThread("hi");
    await token.connect(bob).comment(1, "hola");
    await token.connect(alice).comment(2, "ni hao");
    await token.connect(alice).comment(2, "bon jeour");
    await token.connect(alice).comment(3, "yo");
    await token.connect(bob).comment(3, "ayy");

    const parents5 = await token.getParents(5);
    expect(parents5.length).to.equal(3);
    expect(parents5[0]).to.equal(1);
    expect(parents5[1]).to.equal(2);
    expect(parents5[2]).to.equal(3);

    const branches2 = await token.getBranches(2);
    expect(branches2.length).to.equal(2);
    expect(branches2[0]).to.equal(3);
    expect(branches2[1]).to.equal(4);
  });

  it("can transfer", async () => {
    expect(await token.balanceOf(bob.address)).to.equal(0);
    await expect(token.connect(alice).newThread("hi"))
      .to.emit(token, "Transfer")
      .withArgs(burn, alice.address, 1);

    await token.connect(alice).transferFrom(alice.address, bob.address, 1);
    expect(await token.balanceOf(alice.address)).to.equal(0);
    expect(await token.balanceOf(bob.address)).to.equal(1);
  });
});

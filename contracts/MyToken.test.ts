import { expect } from "chai";
import { MyToken, MyToken__factory } from "../@types/generated";
import hre from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

const { ethers } = hre;

const burn = "0x0000000000000000000000000000000000000000";

describe("MyToken", () => {
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let token: MyToken;

  beforeEach(async () => {
    [alice, bob] = await ethers.getSigners();

    const myTokenFactory = (await hre.ethers.getContractFactory(
      "MyToken"
    )) as MyToken__factory;

    token = await myTokenFactory.deploy("nfts.com");
  });

  it("can make new thread", async () => {
    await token.connect(alice).newThread("hi");

    expect(await token.balanceOf(alice.address)).to.equal(1);
  });

  it("can make new thread", async () => {
    await token.connect(alice).newThread("hi");

    expect(await token.balanceOf(alice.address)).to.equal(1);
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

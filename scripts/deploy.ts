import { TreeChan__factory } from "../@types/generated";
import hre from "hardhat";

const { ethers } = hre;

async function main() {
  const myTokenFactory = (await hre.ethers.getContractFactory(
    "MyToken"
  )) as TreeChan__factory;

  const myToken = await myTokenFactory.deploy("trevor.com");

  await myToken.deployed();
  console.log("TreeChan deployed at:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

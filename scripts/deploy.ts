import { MyToken__factory } from "../@types/generated";
import hre from "hardhat";

const { ethers } = hre;

async function main() {
  const myTokenFactory = (await hre.ethers.getContractFactory(
    "MyToken"
  )) as MyToken__factory;

  const initialSupply = ethers.utils.parseEther("1000000");
  const myToken = await myTokenFactory.deploy(initialSupply);

  await myToken.deployed();

  console.log("MyToken deployed at:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

import { TreeChan__factory } from "../@types/generated";
import hre from "hardhat";

async function main() {
  const treeChanFactory = (await hre.ethers.getContractFactory(
    "TreeChan"
  )) as TreeChan__factory;

  const myToken = await treeChanFactory.deploy("trevor.com");

  await myToken.deployed();
  console.log("TreeChan deployed at:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

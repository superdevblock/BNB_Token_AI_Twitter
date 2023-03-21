// scripts/create-handsree.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const Handsree = await ethers.getContractFactory("HANDSREE");
  const handsree = await upgrades.deployProxy(Handsree, ['HANDSREE', 'HANDSREE'], { initializer: 'initialize' });
  await handsree.deployed();
  console.log("Handsree deployed to:", handsree.address);
}

main();
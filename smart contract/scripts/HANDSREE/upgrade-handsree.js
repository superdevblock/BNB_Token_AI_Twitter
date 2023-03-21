// scripts/upgrade-handsree.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const Handsree = await ethers.getContractFactory("HANDSREE");
  const handsree = await upgrades.upgradeProxy('0x277B401D32C12274eF3aB83eBb6Fdd8550460b89', Handsree);
  console.log("Handsree upgraded");
}

main();
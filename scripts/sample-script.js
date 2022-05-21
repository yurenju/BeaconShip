const hre = require("hardhat");

async function main() {
  const Ship = await hre.ethers.getContractFactory("Ship");
  const ShipFactory = await hre.ethers.getContractFactory("ShipFactory");
  const shipBlueprintV1 = await Ship.deploy();
  console.log(`blueprint address: ${shipBlueprintV1.address}`)
  const factory = await ShipFactory.deploy(shipBlueprintV1.address)

  for (let i = 0; i < 2; i++) {
    const name = `Ship ${i}`
    const fuel = 50 * (i+1)
    const shipId = i

    await factory.buildShip(name, fuel, shipId)
    const shipAddress = await factory.getShipAddress(i)
    const ship = Ship.attach(shipAddress)

    console.log(await ship.name(),await ship.fuel())
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

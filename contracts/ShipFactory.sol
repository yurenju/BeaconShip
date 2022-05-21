pragma solidity 0.8.7;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

import "./ShipBeacon.sol";
import "./Ship.sol";

contract ShipFactory {
    mapping(uint32 => address) private ships;
    ShipBeacon immutable beacon;

    constructor(address _initBlueprint) {
        beacon = new ShipBeacon(_initBlueprint);
    }

    function buildShip(string memory _name, uint256 _fuel, uint32 shipId) public {
        BeaconProxy ship = new BeaconProxy(
            address(beacon),
            abi.encodeWithSelector(Ship(address(0)).initialize.selector, _name, _fuel)
        );
        ships[shipId] = address(ship);
    }

    function getShipAddress(uint32 shipId) external view returns (address) {
        return ships[shipId];
    }

    function getBeacon() public view returns (address) {
        return address(beacon);
    }

    function getImplementation() public view returns (address) {
        return beacon.implementation();
    }
}

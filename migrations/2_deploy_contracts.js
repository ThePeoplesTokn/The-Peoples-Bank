let BN = web3.utils.BN;
const Gringotts = artifacts.require("Gringotts");
const Galleon = artifacts.require("Galleon");

module.exports = async function(deployer) {
  
  /** Deploys Galleon.sol **/
  await deployer.deploy(Galleon);
  const galleon = await Galleon.deployed();

  /** Deploys Gringotts.sol **/
  await deployer.deploy(Gringotts, galleon.address);
  const gringotts = await Gringotts.deployed();
  
  /** Allocates total supply of ERC20 Galleon tokens to Gringotts.sol  **/
  const amount = new BN('100000000000000000000000000');
  await galleon.increaseAllowance(gringotts.address,amount);
  await gringotts.transferGalleonsToContract(amount);

}
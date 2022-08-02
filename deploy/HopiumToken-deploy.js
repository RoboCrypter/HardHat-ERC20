const { INITIAL_SUPPLY } = require("../helper-hardhat-config")



module.exports = async({ getNamedAccounts, deployments }) => {

    const { deployer } = await getNamedAccounts()

    const { deploy, log } = deployments

   
    await deploy("HopiumToken", {
    
        from: deployer,
        args: [INITIAL_SUPPLY],
        log: true
    })
}


/**  I did my Verification on Etherscan manually by running the following command:

 * yarn hardhat verify --network rinkeby --contract contracts/HopiumToken.sol:HopiumToken 0x49446855d1e0aD48c2Ff909048D9a1a75D7c0865 "10000000000000000000000"

*/


module.exports.tags = ["all", "hopium"]

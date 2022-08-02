const { expect } = require("chai")
const { network, getNamedAccounts, ethers, deployments } = require("hardhat")
const { devNetworks, INITIAL_SUPPLY } = require("../helper-hardhat-config")



!devNetworks.includes(network.name) ? describe.skip

: describe("Unit Testing HopiumToken Contract", () => {

    let deployer, hopium, spender

    const amount = "100"

    beforeEach("Deploying HopiumToken Contract...", async() => {

        deployer = (await getNamedAccounts()).deployer

        spender = (await getNamedAccounts()).spender

        await deployments.fixture(["all"])

        hopium = await ethers.getContract("HopiumToken", deployer)
    })

    describe("constructor", () => {

        it("It should give the correct token name and symbol", async() => {

            const tokenName = await hopium.name()
            const tokenSymbol = await hopium.symbol()

            expect(tokenName).to.equal("Hopium Token")
            expect(tokenSymbol).to.equal("HTN")
        })

        it("It should have the correct Initial Supply", async() => {

            const initialSupply = await hopium.totalSupply()

            expect(initialSupply).to.equal(INITIAL_SUPPLY)
        })
    })

    describe("transfer", () => {

        it("It should transfer amount to the spender", async() => {

            const beforeSpenderBalance = await hopium.balanceOf(spender)

            await hopium.transfer(spender, amount)

            const afterSpenderBalance = await hopium.balanceOf(spender)

            expect(afterSpenderBalance.toString()).to.equal(beforeSpenderBalance.add(amount).toString())
        })

        it("It should emit an event upon transfer", async() => {

            await expect(hopium.transfer(spender, amount)).to.emit(hopium, "Transfer")
        })
    })

    describe("allowance", () => {

        it("Spender Allowance by default should be equal to 0", async() => {

            const spenderAllowance = await hopium.allowance(deployer, spender)

            expect(spenderAllowance).to.equal("0")
        })

        it("Owner have to approve to give Allowance/Approval to Spender", async() => {

            await hopium.approve(spender, amount)

            const spenderApproval = await ethers.getContract("HopiumToken", spender)

            await spenderApproval.transferFrom(deployer, spender, amount)

            expect(await hopium.balanceOf(spender)).to.equal(amount)
        })

        it("It should emits an event upon Approval", async() => {

            await expect(hopium.approve(spender, amount)).to.emit(hopium, "Approval")
        })

        it("Cannot get Allowance without Owner's Approval", async() => {
            
            await expect(hopium.transferFrom(deployer, spender, amount)).to.revertedWith("ERC20: insufficient allowance")
        })

        it("The given Allowance should be accurate", async() => {

            await hopium.approve(spender, amount)

            const allowance = await hopium.allowance(deployer, spender)

            expect(allowance).to.equal(amount)
        })

        it("It should not let spender, spend's more than the Allowance", async() => {

            await hopium.approve(spender, amount)

            await expect(hopium.transferFrom(deployer, spender, amount + 1)).to.be.revertedWith("ERC20: insufficient allowance")
        }) 
    })

    describe("increaseAllowance", () => {

        it("It should increase the Allowance", async() => {

            await hopium.increaseAllowance(spender, amount)

            const spenderAllowance = await ethers.getContract("HopiumToken", spender)

            await spenderAllowance.transferFrom(deployer, spender, amount)

            expect(await hopium.balanceOf(spender)).to.equal(amount)
        })

        it("It should emits an event upon increase Allowance", async() => {

            await expect(hopium.increaseAllowance(spender, amount)).to.emit(hopium, "Approval")
        })
    })

    describe("decreaseAllowance", () => {

        it("It should revert if subtracted Allowance is greater than current Allowance", async() => {

            await hopium.approve(spender, amount)

            const subtractedAllowance = "200"
            
            await expect(hopium.decreaseAllowance(spender, subtractedAllowance)).to.be.revertedWith("ERC20: decreased allowance below zero")
        })

        it("It should emits an event upon decreasing Allowance", async() => {

            await expect(hopium.decreaseAllowance(spender, 0)).to.emit(hopium, "Approval")
        })
    })
})
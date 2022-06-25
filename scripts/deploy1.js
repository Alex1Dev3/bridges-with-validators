const dotenv = require("dotenv");
dotenv.config();
const { VALIDATOR_PRIVATE_KEY } = process.env;

async function main() {
    const account1 = await ethers.getSigner();

    const Token = await ethers.getContractFactory("Token");
    const token1 = await Token.deploy('Test Token 1', 'TT1', {gasLimit: 10000000});
    console.log('Token1 address:', token1.address);

    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge1 = await Bridge.deploy(token1.address, {gasLimit: 10000000});
    console.log('Bridge1 address:', bridge1.address);

    for (let i = 0; i < 10; i++) {
        await token1.mint(account1.address, i, {gasLimit: 10000000});
    }

    let check = true;
    for (let i = 0; i < 10; i++) {
        const owner = await token1.ownerOf(i);
        if (owner !== account1.address) check = false;
    }
    if (check) {
        console.log('10 tokens created');
    } else {
        console.log('Failed to create tokens');
    }

    validator = new ethers.Wallet(VALIDATOR_PRIVATE_KEY);
    bridge1.setValidator(validator.address, 1, {gasLimit: 10000000});
}

main()
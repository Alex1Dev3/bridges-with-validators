const dotenv = require("dotenv");
dotenv.config();
const { VALIDATOR_PRIVATE_KEY } = process.env;

async function main() {
    const Token = await ethers.getContractFactory("Token");
    const token2 = await Token.deploy('Test Token 2', 'TT2', {gasLimit: 10000000});
    console.log('Token2 address:', token2.address);

    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge2 = await Bridge.deploy(token2.address, {gasLimit: 10000000});
    console.log('Bridge2 address:', bridge2.address);

    for (let i = 0; i < 10; i++) {
        await token2.mint(bridge2.address, i, {gasLimit: 10000000});
    }

    let check = true;
    for (let i = 0; i < 10; i++) {
        const owner = await token2.ownerOf(i);
        if (owner !== bridge2.address) check = false;
    }
    if (check) {
        console.log('10 tokens created');
    } else {
        console.log('Failed to create tokens');
    }

    validator = new ethers.Wallet(VALIDATOR_PRIVATE_KEY);
    bridge2.setValidator(validator.address, 1, {gasLimit: 10000000});
}

main()
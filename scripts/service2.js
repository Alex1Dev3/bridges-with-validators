const {
    BRIDGE1_ADDRESS,
    BRIDGE2_ADDRESS,
    TOKEN1_ADDRESS,
    TOKEN2_ADDRESS,
    ABI_BRIDGE,
    ABI_TOKEN,
    NET1_URL
} = require("./constants.json");

const dotenv = require("dotenv");
dotenv.config();
const { VALIDATOR_PRIVATE_KEY } = process.env;

async function fix(validator, bridge1, bridge2, token1, token2, sender, tokenId, nonce) {
    console.log('New exchange request for', sender);
    let balance1 = await token1.balanceOf(sender);
    let balance2 = await token2.balanceOf(bridge2.address);
    console.log(' Was', parseInt(balance1), 'tokens in first net on account and', parseInt(balance2), 'in second net on bridge');
    const hash = await bridge1.getHash(validator.address, sender, tokenId, nonce);
    const signature = await validator.signMessage(ethers.utils.arrayify(hash));
    await bridge1.redeemSwap(validator.address, sender, tokenId, nonce, signature, {gasLimit: 10000000});
    balance1 = await token1.balanceOf(sender);
    balance2 = await token2.balanceOf(bridge2.address);
    console.log(' Now', parseInt(balance1), 'tokens in first net on account and', parseInt(balance2), 'in second net on bridge');
}

async function main() {
    const provider1 = new ethers.providers.JsonRpcProvider(NET1_URL);
    const validator = new ethers.Wallet(VALIDATOR_PRIVATE_KEY, provider1);
    const bridge1 = new ethers.Contract(BRIDGE1_ADDRESS, ABI_BRIDGE, validator);

    const account2 = await ethers.getSigner();

    const bridge2 = new ethers.Contract(BRIDGE2_ADDRESS, ABI_BRIDGE, account2);
    const token1 = new ethers.Contract(TOKEN1_ADDRESS, ABI_TOKEN, validator);
    const token2 = new ethers.Contract(TOKEN2_ADDRESS, ABI_TOKEN, account2);

    bridge2.on("Init", (sender, tokenId, nonce) => {
        fix(validator, bridge1, bridge2, token1, token2, sender, tokenId, nonce);
    })
}

main()

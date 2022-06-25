const {
    BRIDGE2_ADDRESS,
    TOKEN2_ADDRESS,
    ABI_BRIDGE,
    ABI_TOKEN
} = require("./constants.json");

async function main(index) {
    console.log('initSwap request');
    const account2 = await ethers.getSigner();

    const token2 = new ethers.Contract(TOKEN2_ADDRESS, ABI_TOKEN, account2);
    const bridge2 = new ethers.Contract(BRIDGE2_ADDRESS, ABI_BRIDGE, account2);

    let balance_account = await token2.balanceOf(account2.address);
    let balance_bridge = await token2.balanceOf(BRIDGE2_ADDRESS);
    console.log(' Was', parseInt(balance_account), 'tokens on account and', parseInt(balance_bridge), 'on bridge');

    await token2.approve(BRIDGE2_ADDRESS, index, {gasLimit: 10000000});
    await bridge2.initSwap(index, {gasLimit: 10000000});

    balance_account = await token2.balanceOf(account2.address);
    balance_bridge = await token2.balanceOf(BRIDGE2_ADDRESS);
    console.log(' Now', parseInt(balance_account), 'tokens on account and', parseInt(balance_bridge), 'on bridge');
}

main(0)

const {
    BRIDGE1_ADDRESS,
    TOKEN1_ADDRESS,
    ABI_BRIDGE,
    ABI_TOKEN
} = require("./constants.json");

async function main(index) {
    console.log('initSwap request');
    const account1 = await ethers.getSigner();

    const token1 = new ethers.Contract(TOKEN1_ADDRESS, ABI_TOKEN, account1);
    const bridge1 = new ethers.Contract(BRIDGE1_ADDRESS, ABI_BRIDGE, account1);

    let balance_account = await token1.balanceOf(account1.address);
    let balance_bridge = await token1.balanceOf(BRIDGE1_ADDRESS);
    console.log(' Was', parseInt(balance_account), 'tokens on account and', parseInt(balance_bridge), 'on bridge');

    await token1.approve(BRIDGE1_ADDRESS, index, {gasLimit: 10000000});
    await bridge1.initSwap(index, {gasLimit: 10000000});

    balance_account = await token1.balanceOf(account1.address);
    balance_bridge = await token1.balanceOf(BRIDGE1_ADDRESS);
    console.log(' Now', parseInt(balance_account), 'tokens on account and', parseInt(balance_bridge), 'on bridge');
}

main(0)

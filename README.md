### Scripts:
##### deploy1.js 
deploying smart contracts to first network (now it's binance chain), and also creating 10 tokens (owned by user, his private key is in .env)
##### deploy2.js 
deploying smart contracts to second network (now it's polygon), and also creating 10 tokens (owned by bridge)
##### service1.js 
service to listen bridge of first network, and if events appear, service transfers tokens to second network
##### service2.js 
service to listen bridge of second network, and if events appear, service transfers tokens to first network
##### initswap1.js 
initiation of request to transfer tokens from first network to second
##### initswap2.js 
initiation of request to transfer tokens from second network to first

### Start commands:
```
npm install
```
and creating .env file with private keys by template:
```
PRIVATE_KEY=XXXX
VALIDATOR_PRIVATE_KEY=XXXX
```
and working with hardhat:
```
npx hardhat ...
```

## Hyperledger Network
This is an standalone hyperledger fabric application that has an comprehensive chaincode with an apllication with swagger ui to perform intractions with chaincode.

# Depedencies:
- Docker
- Node.js

# To Run:
- Command to bring the network Up. 
```bash
./network.sh up createChannel -ca
```
- To deploy smart contact 
```bash
./network.sh deployCC -ccn ComprehensiveSmartContract -ccp ./chaincode -ccl javascript
```
- To start the api navigate to application folder and run
```bash
npm i
npm start
```

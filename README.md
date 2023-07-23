## Hyperledger Network
This is an standalone hyperledger fabric application that has an comprehensive chaincode with an apllication with swagger ui to perform intractions with chaincode.

# Depedencies:
- Docker
- Node.js

# How to run:
- Initialize the network binaries based on ur operating system (Linux/Ubuntu/Mac) with the command.
```bash
node init.js
```
- This project includes an Comprehensive Chaincode which can cover upto 99% of your business use cases with an application to intract with the Comprehensive Chaincode the apis have an swagger documentation available in the endpoint */docs* to do start application ,deploy chaincode and setup network just run start.js.
```bash
node start.js
```
- To down the network and clear cache run this command.
```bash
node stop.js
```

# Useful Commands:
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

# Additional Commands
- To Stop the application
```
npx kill-port 3000
```
- To start server in background
```
2>&1 &
```

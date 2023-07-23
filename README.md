## Hyperledger Network
This is an standalone hyperledger fabric application that has an comprehensive chaincode with an apllication with swagger ui to perform intractions with chaincode.

# Description:
🚀 Building Your Own Hyperledger Fabric Network Made Easy! 🌐

Are you fascinated by blockchain technology and curious to try your hands on creating your own blockchain network? Look no further! In this post, I'll guide you on setting up a Hyperledger Fabric network with the help of convenient helper scripts. 🛠️

Hyperledger Fabric is a powerful open-source framework that enables developers to build scalable and secure blockchain solutions for a wide range of use cases. But setting it up from scratch can be daunting, right? Fear not! Thanks to the incredible Hyperledger-Network repository, you can breeze through the process. 🎉

📌 Step 1: Clone the Repository
Start by cloning the Hyperledger-Network repository from my GitHub account Navin3d. These samples come with pre-built scripts that make the setup process a breeze! 🌬️

📌 Step 2: Navigate to Hyperledger-Network
Once you have the repository on your local machine, head to the Hyperledger-Network directory. We are almost there! 💻

📌 Step 3: Magic Command - Let's Launch!
Now comes the fun part! Execute the command node init.js and node start.js, and watch the magic happen. This command will start a basic Fabric network, creating a channel named mychannel for transactions, deploying a comprehensive chaincode with 99% business use case and also starts an API made with node.js at port 3000. 😎

📌 Step 4: Explore & Learn
Congratulations! You've successfully set up your Hyperledger Fabric network with just a few simple steps. Now you can explore the transactions, blocks, and smart contracts running on your network. 📊

🔍 Why Helper Scripts Are Awesome
The beauty of these helper scripts lies in their ability to automate complex tasks behind the scenes. They save time, effort, and let you focus on building innovative blockchain applications! 🤖

💡 The Power of Hyperledger Fabric
Hyperledger Fabric opens up a world of possibilities in various industries - from supply chain and healthcare to finance and beyond. The decentralized, transparent, and secure nature of Fabric empowers businesses to revolutionize their processes. 🏢🌐

📚 Keep Exploring
If you're hungry for more knowledge, check out the official Hyperledger Fabric documentation and immerse yourself in the thriving blockchain community. The possibilities are endless! 🚀

🔗 [Link to Hyperledger-Network repository](https://github.com/Navin3d/Hyperledger-Network)

#Blockchain #HyperledgerFabric #OpenSource #BlockchainTechnology #Decentralization #SmartContracts

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

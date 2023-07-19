const { Gateway } = require('fabric-network');

const getWallet = require("./utils/config/wallet"); 
const { createWalletAdmin, createWalletUser } = require("./services/wallet.service");
const { getCCORG1, getCAClientOrg1 } = require("./utils/config/ca-client");
const { CHAINCODENAME, CHANNELNAME, MSPORG1, AFFIILIATION } = require("./utils/config");

function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function main() {
    try {
        const ccp = getCCORG1();
        const wallet = await getWallet();

        const ORG1USERID = "apiuser1";

        // const caClient = getCAClientOrg1();
        // await createWalletAdmin(caClient, MSPORG1, "admin", "adminpw");
        // await createWalletUser(caClient, MSPORG1, "admin", ORG1USERID, AFFIILIATION);

        const gateway = new Gateway();

        try {
            await gateway.connect(ccp, {
                wallet,
                identity: ORG1USERID,
                discovery: { enabled: true, asLocalhost: true }
            });

            console.log("ok>>>>");

            const network = await gateway.getNetwork(CHANNELNAME);
            const contract = network.getContract(CHAINCODENAME);

            const document = {
                "name": "John Doe",
                "age": 30,
                "email": "johndoe@example.com",
                "address": {
                    "street": "123 Main St",
                    "city": "New York",
                    "state": "NY",
                    "zipcode": "10001"
                },
                "hobbies": ["reading", "hiking", "cooking"],
                "active": true
            };

            console.log('\n--> Submit Transaction: CreateAssert 1, change the appraisedValue to 350');
            await contract.submitTransaction('CreateAssert', ORG1USERID, 1, JSON.stringify(document));
            console.log('*** Result: committed');

            console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
            result = await contract.evaluateTransaction('ReadAsset', 1);
            console.log(`*** Result: ${prettyJSONString(result.toString())}`);

        } finally {
            // Disconnect from the gateway when the application is closing
            // This will close all connections to the network
            gateway.disconnect();
        }
    } catch (error) {
        console.error(`******** FAILED to run the application: ${error}`);
        process.exit(1);
    }
}

main();


// const { Gateway, Wallets } = require('fabric-network');
// const FabricCAServices = require('fabric-ca-client');
// const path = require('path');
// const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('./utils/CAUtil');
// const { buildCCPOrg1, buildWallet } = require('./utils/AppUtil.js');

// const channelName = 'mychannel';
// const chaincodeName = 'ComprehensiveSmartContract';

// const mspOrg1 = 'Org1MSP';
// const walletPath = path.join(__dirname, './utils/wallet');
// const org1UserId = 'apiuser';

// function prettyJSONString(inputString) {
//     return JSON.stringify(JSON.parse(inputString), null, 2);
// }

// async function main() {
//     try {
//         const ccp = buildCCPOrg1();

//         const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

//         const wallet = await buildWallet(Wallets, walletPath);

//         await enrollAdmin(caClient, wallet, mspOrg1);

//         await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

//         const gateway = new Gateway();

//         try {
//             await gateway.connect(ccp, {
//                 wallet,
//                 identity: org1UserId,
//                 discovery: { enabled: true, asLocalhost: false }
//             });

//             const network = await gateway.getNetwork(channelName);

//             const contract = network.getContract(chaincodeName);

//             const document = {
//                 "name": "John Doe",
//                 "age": 30,
//                 "email": "johndoe@example.com",
//                 "address": {
//                     "street": "123 Main St",
//                     "city": "New York",
//                     "state": "NY",
//                     "zipcode": "10001"
//                 },
//                 "hobbies": ["reading", "hiking", "cooking"],
//                 "active": true
//             };

//             console.log('\n--> Submit Transaction: CreateAssert 1, change the appraisedValue to 350');
//             await contract.submitTransaction('CreateAssert', org1UserId, 1, JSON.stringify(document));
//             console.log('*** Result: committed');

//             console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
//             const result = await contract.evaluateTransaction('ReadAsset', 1);
//             console.log(`*** Result: ${prettyJSONString(result.toString())}`);

//         } finally {
//             // Disconnect from the gateway when the application is closing
//             // This will close all connections to the network
//             gateway.disconnect();
//         }
//     } catch (error) {
//         console.error(`******** FAILED to run the application: ${error}`);
//         process.exit(1);
//     }
// }


// main();

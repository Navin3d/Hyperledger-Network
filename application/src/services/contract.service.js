const logger = require('slf3d');
const { Gateway } = require('fabric-network');

const getWallet = require('../utils/config/wallet');
const { CHANNELNAME, CHAINCODENAME } = require('../utils/config');

const gateway = new Gateway();


const prettyJSONString = (inputString) => {
    return JSON.stringify(JSON.parse(inputString), null, 2);
}


const saveAsset = async (ccp, userId, documentId, documentString) => {
    let result = false;
    try {
        const wallet = await getWallet();

        await gateway.connect(ccp, {
            wallet,
            identity: userId,
            discovery: { enabled: true, asLocalhost: true }
        });

        const network = await gateway.getNetwork(CHANNELNAME);
        const contract = network.getContract(CHAINCODENAME);

        logger.log(`Submit Transaction: CreateAssert ${documentId}, change the appraisedValue to 350`);
        result = await contract.submitTransaction('CreateAssert', userId, documentId, documentString);
        logger.log('Result: committed');
    } catch (e) {
        logger.error(e.message);
        throw e;
    } finally {
        gateway.disconnect();
    }

    return result;

}

const getAllAsset = async (ccp, userId) => {
    let asset = null;
    try {
        const wallet = await getWallet();

        await gateway.connect(ccp, {
            wallet,
            identity: userId,
            discovery: { enabled: true, asLocalhost: true }
        });

        const network = await gateway.getNetwork(CHANNELNAME);
        const contract = network.getContract(CHAINCODENAME);

        logger.log(`Evaluate Transaction: ReadAllAsset, function returns all assets.`);
        asset = await contract.evaluateTransaction('ReadAllAsset');
        logger.log(`Successfuly fetched the assets`);
    } catch (e) {
        logger.error(e.message);
        throw e;
    } finally {
        gateway.disconnect();
    }

    return prettyJSONString(asset.toString());

}

const getAssetByAssetId = async (ccp, userId, assetId) => {
    let asset = null;
    try {
        const wallet = await getWallet();

        await gateway.connect(ccp, {
            wallet,
            identity: userId,
            discovery: { enabled: true, asLocalhost: true }
        });

        const network = await gateway.getNetwork(CHANNELNAME);
        const contract = network.getContract(CHAINCODENAME);

        logger.log(`Evaluate Transaction: ReadAsset, function returns ${assetId} attributes`);
        asset = await contract.evaluateTransaction('ReadAsset', assetId);
        logger.log(`Successfuly fetched the assets`);
    } catch (e) {
        logger.error(e.message);
        throw e;
    } finally {
        gateway.disconnect();
    }

    return JSON.parse(prettyJSONString(asset.toString()));

}

const getAssetByUserId = async (ccp, userId) => {
    const assetsString = await getAllAsset(ccp, userId);
    const assets = JSON.parse(assetsString);
    let filteredAssets = assets.filter(assset => assset["UserId"] == userId);
    return filteredAssets;
}

module.exports = {
    getAssetByAssetId,
    getAssetByUserId,
    saveAsset,
};

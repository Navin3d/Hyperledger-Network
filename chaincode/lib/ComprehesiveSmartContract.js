const stringify = require("json-stringify-deterministic");
const sortKeysRecursive = require("sort-keys-recursive");
const { Contract } = require("fabric-contract-api");

class ComprehensiveSmartContract extends Contract {

    async CreateAssert(ctx, userId, documentId, documentString) {
        let document = {
            UserId: userId,
            DocumentId: documentId,
            DocumentData: documentString,
        }
        await ctx.stub.putState(documentId, Buffer.from(stringify(sortKeysRecursive(document))));
    }

    async ReadAsset(ctx, documentId) {
        const assetJSON = await ctx.stub.getState(documentId);
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    async ReadAllAsset(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return allResults;
    }

}

module.exports = ComprehensiveSmartContract;

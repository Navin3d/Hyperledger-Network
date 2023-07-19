const logger                              = require("slf3d");

const contarctService                     = require("../../services/contract.service");
const { getCCORG2 }                       = require("../../utils/config/ca-client");

const ccp                                 = getCCORG2();


const saveAssetORG2 = async (req, res) => {
    const { userId, documentId, documentString } = req.body;

    if(!(userId && documentId))
        return res.status(400).json({
            message : "Failed to create asset...",
            status  : 0,
            error   : "userId and documentId is mandatory in request-body...",
        });

    try {
        const result = await contarctService.saveAsset(ccp, userId, documentId, documentString);
        return res.status(201).json({
            message : "Created asset successfully...",
            status  : 1,
            data    : result,
        });
    } catch(err) {
        logger.error(err);

        return res.status(500).json({
            message : "Failed to create asset...",
            status  : 0,
            error   : err.message,
        });
    }

}

const getAssetByAssetIdORG2 = async (req, res) => {
    const { userId, documentId } = req.params;

    if(!(userId && documentId))
        return res.status(400).json({
            message : "Failed to fetch asset...",
            status  : 0,
            error   : "userId and documentId is mandatory in request-body...",
        });

    try {
        const result = await contarctService.getAssetByAssetId(ccp, userId, documentId);
        return res.status(200).json({
            message : "Fetched asset successfully...",
            status  : 1,
            data    : result,
        });
    } catch(err) {
        logger.error(err);

        return res.status(500).json({
            message : "Failed to fetch asset...",
            status  : 0,
            error   : err.message,
        });
    }

}

const getAssetByUserIdORG2 = async (req, res) => {
    const { userId } = req.params;

    if(!userId)
        return res.status(400).json({
            message : "Failed to fetch asset...",
            status  : 0,
            error   : "userId is mandatory in request-body...",
        });

    try {
        const result = await contarctService.getAssetByUserId(ccp, userId);
        return res.status(200).json({
            message : "Fetched asset successfully...",
            status  : 1,
            data    : result,
        });
    } catch(err) {
        logger.error(err);

        return res.status(500).json({
            message : "Failed to fetch asset...",
            status  : 0,
            error   : err.message,
        });
    }
}

module.exports = {
    saveAssetORG2,
    getAssetByAssetIdORG2,
    getAssetByUserIdORG2,
}

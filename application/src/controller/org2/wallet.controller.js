const logger                              = require("slf3d");

const walletService                       = require("../../services/wallet.service");
const { getCAClientOrg2 }                 = require("../../utils/config/ca-client");

const caClient                            = getCAClientOrg2();


const createWalletAdmin = async (req, res) => {
    const { orgMspId, walletAdminUserId, walletAdminUserPassword } = req.body;

    if(!(orgMspId && walletAdminUserId && walletAdminUserPassword))
        return res.status(400).json({
            message : "Failed to create Admin...",
            status  : 0,
            error   : "Required Parameters: { orgMspId, walletAdminUserId, walletAdminUserPassword }",
        });

    try {
        await walletService.createWalletAdmin(caClient, orgMspId, walletAdminUserId, walletAdminUserPassword);

        return res.status(201).json({
            message : "Created wallet Admin successfully...",
            status  : 1,
        });
    } catch(err) {
        logger.error(err);
        return res.status(500).json({
            message : "Failed to create Admin...",
            status  : 0,
            error   : err.message,
        });
    }

}

const createWalletUser = async (req, res) => {
    const { orgMspId, walletAdminUserId, userId, affiliation } = req.body;

    if(!(orgMspId && walletAdminUserId && userId && affiliation))
        return res.status(400).json({
            message : "Failed to create User...",
            status  : 0,
            error   : "Required Parameters: { orgMspId, walletAdminUserId, userId, affiliation }",
        });

    try {
        await walletService.createWalletUser(caClient, orgMspId, walletAdminUserId, userId, affiliation);

        return res.status(201).json({
            message : "Created wallet User successfully...",
            status  : 1,
        });
    } catch(err) {
        logger.error(err);
        return res.status(500).json({
            message : "Failed to create User...",
            status  : 0,
            error   : err.message,
        });
    }

}

module.exports = {
    createWalletAdmin,
    createWalletUser
}

const logger = require("slf3d");
const getWallet = require("../utils/config/wallet")


const createWalletAdmin = async (caClient, orgMspId, walletAdminUserId, walletAdminUserPassword) => {
    const wallet = await getWallet();
    try {
		const identity = await wallet.get(walletAdminUserId);
		if (identity) {
			logger.info('An identity for the admin user already exists in the wallet');
			return;
		}

		const enrollment = await caClient.enroll({ enrollmentID: walletAdminUserId, enrollmentSecret: walletAdminUserPassword });
		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: orgMspId,
			type: 'X.509',
		};
		await wallet.put(walletAdminUserId, x509Identity);
		logger.info('Successfully enrolled admin user and imported it into the wallet');
	} catch (error) {
		logger.error(`Failed to enroll admin user : ${error.message}`);
		console.log(error);
		throw error;
	}
};

const createWalletUser = async (caClient, orgMspId, walletAdminUserId, userId, affiliation) => {
    const wallet = await getWallet();

    try {
		const userIdentity = await wallet.get(userId);
		if (userIdentity) {
			logger.warn(`An identity for the user ${userId} already exists in the wallet`);
			return;
		}

		const adminIdentity = await wallet.get(walletAdminUserId);
		if (!adminIdentity) {
			logger.warn('An identity for the admin user does not exist in the wallet');
			logger.warn('Enroll the admin user before retrying');
			return;
		}

		const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
		const adminUser = await provider.getUserContext(adminIdentity, walletAdminUserId);

		const secret = await caClient.register({
			affiliation: affiliation,
			enrollmentID: userId,
			role: 'client'
		}, adminUser);
		const enrollment = await caClient.enroll({
			enrollmentID: userId,
			enrollmentSecret: secret
		});
		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: orgMspId,
			type: 'X.509',
		};
		await wallet.put(userId, x509Identity);
		logger.info(`Successfully registered and enrolled user ${userId} and imported it into the wallet`);
	} catch (error) {
		logger.error(`Failed to register user : ${error.message}`);
		console.log(error);
		throw error;
	}
};

module.exports = {
    createWalletAdmin,
    createWalletUser,
}

const path = require("path");
const logger = require("@navin3d/log");
const { Wallets } = require('fabric-network');
const walletPath = path.join(__dirname, '../wallet');

const getWallet = async () => {
    let wallet;
	if (walletPath) {
		wallet = await Wallets.newFileSystemWallet(walletPath);
		logger.info(`Built a file system wallet at ${walletPath}`);
	} else {
		wallet = await Wallets.newInMemoryWallet();
		logger.info('Built an in memory wallet');
	}

	return wallet;
};

module.exports = getWallet;

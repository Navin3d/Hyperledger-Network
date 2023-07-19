const express              = require("express");
const contractController   = require("./contract.controller");
const walletController     = require("./wallet.controller");
const org2Router           = express.Router();

org2Router.get  ("/contract/get/:userId"                ,  contractController.getAssetByUserIdORG2);
org2Router.get  ("/contract/get/:userId/:documentId"    ,  contractController.getAssetByAssetIdORG2);
org2Router.post ("/contract"                            ,  contractController.saveAssetORG2);

org2Router.post ("/wallet/admin"                        ,  walletController.createWalletAdmin);
org2Router.post ("/wallet/user"                         ,  walletController.createWalletUser);


module.exports = org2Router;

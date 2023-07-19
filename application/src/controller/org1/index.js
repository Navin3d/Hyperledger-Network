const express              = require("express");
const contractController   = require("./contract.controller");
const walletController     = require("./wallet.controller");
const org1Router           = express.Router();

org1Router.get  ("/contract/get/:userId"                ,  contractController.getAssetByUserIdORG1);
org1Router.get  ("/contract/get/:userId/:documentId"    ,  contractController.getAssetByAssetIdORG1);
org1Router.post ("/contract"                            ,  contractController.saveAssetORG1);

org1Router.post ("/wallet/admin"                        ,  walletController.createWalletAdmin);
org1Router.post ("/wallet/user"                         ,  walletController.createWalletUser);


module.exports = org1Router;

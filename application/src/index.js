const path            = require("path");
const cors            = require("cors");
const YAML            = require('yamljs');
const express         = require("express");
const bodyParser      = require("body-parser");
const logger          = require("slf3d");
const swaggerUi       = require('swagger-ui-express');

const { PORT }        = require("./utils/config");
const org1Controller  = require("./controller/org1");
const org2Controller  = require("./controller/org2");
const swaggerYamlPath = path.resolve(__dirname, "./utils/config/swagger.yaml");
const swaggerConfig   = YAML.load(swaggerYamlPath);


const comprehensiveApp = express();
comprehensiveApp.use(cors());
comprehensiveApp.use(bodyParser.json());
comprehensiveApp.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

comprehensiveApp.use("/org1", org1Controller);
comprehensiveApp.use("/org2", org2Controller);

comprehensiveApp.listen(PORT, () => {
  logger.info(`The comprehensive smartcontract API is started successfully and running in PORT: ${PORT}`);
});

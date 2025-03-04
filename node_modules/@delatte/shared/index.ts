const utils = require("./utils/index");
const interfaces = require("./interfaces/index");
const services = require("./services/index");

module.exports = {
  ...utils,
  ...interfaces,
  ...services
};

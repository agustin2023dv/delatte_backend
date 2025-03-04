"use strict";
const utils = require("./utils/index");
const interfaces = require("./interfaces/index");
const services = require("./services/index");
module.exports = Object.assign(Object.assign(Object.assign({}, utils), interfaces), services);

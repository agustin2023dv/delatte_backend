"use strict";
const utils = require("./utils/index");
const interfaces = require("./interfaces/index");
const services = require("./services/index");
const dtos = require("./dtos/index");
const validators = require("./validators/index");
module.exports = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, utils), interfaces), services), dtos), validators);

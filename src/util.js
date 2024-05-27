"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueString = exports.getValueInt = exports.truthTable = exports.rl = void 0;
var readline = require("readline");
exports.rl = readline.createInterface(process.stdin, process.stdout);
//Question 1 Truth Table for Offer Codes
var truthTable = function (packageInfo) {
    switch (packageInfo.offer_code) {
        case "OFR001":
            if (packageInfo.distance_in_km < 200 &&
                packageInfo.pck_weight_in_kg <= 200 &&
                packageInfo.pck_weight_in_kg >= 70) {
                return 0.1;
            }
            else {
                return 0;
            }
            break;
        case "OFR002":
            if (packageInfo.distance_in_km <= 150 &&
                packageInfo.distance_in_km >= 50 &&
                packageInfo.pck_weight_in_kg <= 250 &&
                packageInfo.pck_weight_in_kg >= 100) {
                return 0.07;
            }
            else {
                return 0;
            }
            break;
        case "OFR003":
            if (packageInfo.distance_in_km <= 250 &&
                packageInfo.distance_in_km >= 50 &&
                packageInfo.pck_weight_in_kg <= 150 &&
                packageInfo.pck_weight_in_kg >= 10) {
                return 0.05;
            }
            else {
                return 0;
            }
            break;
        default:
            return 0;
    }
};
exports.truthTable = truthTable;
var getValueInt = function (questionString) {
    return new Promise(function (resolve) {
        exports.rl.question(questionString, function (option) {
            var regaxTest = /^[0-9]+$/;
            if (regaxTest.test(option)) {
                var amount = parseInt(option);
                resolve(amount);
            }
            else {
                console.log("Please enter a valid numeric value: \n");
                (0, exports.getValueInt)(questionString).then(resolve);
            }
        });
    });
};
exports.getValueInt = getValueInt;
var getValueString = function (questionString) {
    return new Promise(function (resolve) {
        exports.rl.question(questionString, function (option) {
            var regaxTest = /^[a-zA-Z0-9]+$/;
            if (regaxTest.test(option)) {
                resolve(option);
            }
            else {
                console.log("Please enter a valid value: \n");
                (0, exports.getValueString)(questionString).then(resolve);
            }
        });
    });
};
exports.getValueString = getValueString;

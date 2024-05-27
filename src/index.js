"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
//Dialouge Tree for intro and error
var dialouge = {
    opening: "\n\n\n\n\n\n\n\n\nWelcome to Kiki's Delivery Service!\n\nPlease select from the following options:\n1) Problem 1 (Total delivery cost of each package) \n2) Problem 2 (Delivery time estimation)",
    invalid_choice: "You selected an invalid choice...\n\nPlease select from the following options:\n1) Problem 1 (Total delivery cost of each package) \n2) Problem 2 (Delivery time estimation)",
};
//Dictionary for questions to ask the client
var questionDictionary = {
    no_of_packages: "How many packages will you be delivering? ",
    base_delivery_cost: "What is the base cost of the packages? ",
    pkg_id: "Package Id (Leave blank for autogenerated)? ",
    pkg_weight_in_kg: "What is the package weight in kg? ",
    pkg_distance_in_km: "Package delivery distance in km? ",
    offer_code: "Input offer Code: ",
    no_of_vehicles: "How many vehicles will transport the delivery? ",
    max_speed: "What is the maximum speed of the vehicles? ",
    max_carriable_weight: "What is the maximum carriable weight of the vehicles? ",
};
//Question 1 and 2
var getOutput = function (deliveryInfo, deliverySpeed, deliveryTax) {
    //Standard for loop printing out each object info
    deliveryInfo.packages.forEach(function (packageInfo) {
        console.log("Id: ".concat(packageInfo.pkg_id));
        var sum = deliveryInfo.base_delivery_cost +
            packageInfo.pck_weight_in_kg * 10 +
            packageInfo.distance_in_km * 5;
        var discount = sum * (0, util_1.truthTable)(packageInfo);
        console.log("Discount: ".concat(discount.toFixed(0)));
        console.log("Total Cost: ".concat((sum - discount).toFixed(0)));
        //if speed is included within the function call print out the time it will take
        if (typeof deliverySpeed === "number") {
            console.log("Delivery Time in hours: ".concat((Math.floor((packageInfo.distance_in_km / deliverySpeed) * 100) / 100 +
                (deliveryTax || 0)).toFixed(2)));
        }
    });
};
//Question 2
var getDeliveryTimeOutput = function (deliveryTimeInfo, vehicleData, currentVehicleIndex) {
    if (currentVehicleIndex === void 0) { currentVehicleIndex = 0; }
    if (deliveryTimeInfo.delivery_information.packages.length == 0) {
        console.log("All packages have been delivered");
        return;
    }
    var packageShipment = [];
    if (deliveryTimeInfo.delivery_information.packages.length == 1) {
        packageShipment = deliveryTimeInfo.delivery_information.packages;
    }
    else {
        var pointer2 = 1;
        var pointer1 = 0;
        var totalWeight = 0;
        var tempTotalWeight = 0;
        var totalDistance = 0;
        var tempTotalDistance = 0;
        var firstShipPlaced = false;
        var tempPackageShipment = [];
        while (pointer1 <
            deliveryTimeInfo.delivery_information.packages.length - 1) {
            //Gets the pointer 1 value and goes through the list finding packages that can be added from that pointer to the end of the list
            if (!firstShipPlaced) {
                var packageInfo1 = deliveryTimeInfo.delivery_information.packages[pointer1];
                if (packageInfo1.pck_weight_in_kg > deliveryTimeInfo.max_carriable_weight) {
                    console.error("Impossible to Deliver Packages: A singular package is greater than the maximum load");
                    return;
                }
                else {
                    tempPackageShipment.push(packageInfo1);
                    tempTotalDistance = packageInfo1.distance_in_km;
                    tempTotalWeight = packageInfo1.pck_weight_in_kg;
                    firstShipPlaced = true;
                }
            }
            //Grabs package 2 and check if it can be added to the shipment
            var packageInfo2 = deliveryTimeInfo.delivery_information.packages[pointer2];
            //check to see if our additional package is greater than our limit
            if (packageInfo2.pck_weight_in_kg + tempTotalWeight >
                deliveryTimeInfo.max_carriable_weight) {
                //Increment if it bigger
                pointer2++;
            }
            else {
                //add the package to the shipment if not
                tempPackageShipment.push(packageInfo2);
                tempTotalWeight += packageInfo2.pck_weight_in_kg;
                tempTotalDistance += packageInfo2.distance_in_km;
                pointer2++;
            }
            // check to see if at end
            if (pointer2 >=
                deliveryTimeInfo.delivery_information.packages.length - 1) {
                // if the shipment is greater than our shipment make that the primary shipment we'll deliver.
                if (tempTotalWeight > totalWeight) {
                    totalWeight = tempTotalWeight;
                    totalDistance = tempTotalDistance;
                    packageShipment = tempPackageShipment;
                }
                if (tempTotalWeight == totalWeight) {
                    if (tempTotalDistance > totalDistance) {
                        totalWeight = tempTotalWeight;
                        totalDistance = tempTotalDistance;
                        packageShipment = tempPackageShipment;
                    }
                }
                // reset loop increment pointer 1
                firstShipPlaced = false;
                tempPackageShipment = [];
                pointer1++;
                pointer2 = pointer1 + 1;
            }
        }
    }
    var tempDeliveryInfo = {
        base_delivery_cost: deliveryTimeInfo.delivery_information.base_delivery_cost,
        no_of_packages: packageShipment.length,
        packages: packageShipment,
    };
    console.log("======Shipment Info========");
    getOutput(tempDeliveryInfo, deliveryTimeInfo.max_speed, vehicleData[currentVehicleIndex] * 2);
    var shippedPackageIds = new Set();
    var max = 0;
    //Set distance tax for each truck and add id of packages for later loop
    packageShipment.forEach(function (shipment) {
        if (shipment.distance_in_km > max) {
            max = shipment.distance_in_km;
        }
        shippedPackageIds.add(shipment.pkg_id);
    });
    vehicleData[currentVehicleIndex] +=
        Math.floor((max / deliveryTimeInfo.max_speed) * 100) / 100;
    // Remove any delivery that is in the shipment so later loops are smaller.
    deliveryTimeInfo.delivery_information.packages = deliveryTimeInfo.delivery_information.packages.filter(function (packageInfo) { return !shippedPackageIds.has(packageInfo.pkg_id); });
    if (deliveryTimeInfo.delivery_information.packages.length > 0) {
        var min = Infinity;
        var minIndex = 0;
        //Choose the next truck with the smallest amount of time as it will be the next truck available for delivery.
        for (var i = 0; i < vehicleData.length; i++) {
            if (vehicleData[i] < min) {
                min = vehicleData[i];
                minIndex = i;
            }
        }
        //Repeat until empty
        getDeliveryTimeOutput(deliveryTimeInfo, vehicleData, minIndex);
    }
};
var getPackageDetails = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pkg_id, pck_weight_in_kg, distance_in_km, offer_code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, util_1.getValueString)(questionDictionary["pkg_id"])];
            case 1:
                pkg_id = _a.sent();
                return [4 /*yield*/, (0, util_1.getValueInt)(questionDictionary["pkg_weight_in_kg"])];
            case 2:
                pck_weight_in_kg = _a.sent();
                return [4 /*yield*/, (0, util_1.getValueInt)(questionDictionary["pkg_distance_in_km"])];
            case 3:
                distance_in_km = _a.sent();
                return [4 /*yield*/, (0, util_1.getValueString)(questionDictionary["offer_code"])];
            case 4:
                offer_code = _a.sent();
                return [2 /*return*/, { pkg_id: pkg_id, pck_weight_in_kg: pck_weight_in_kg, distance_in_km: distance_in_km, offer_code: offer_code }];
        }
    });
}); };
var getDeliveryInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {};
                return [4 /*yield*/, (0, util_1.getValueInt)(questionDictionary["base_delivery_cost"])];
            case 1:
                _a.base_delivery_cost = _b.sent();
                return [4 /*yield*/, (0, util_1.getValueInt)(questionDictionary["no_of_packages"])];
            case 2: return [2 /*return*/, (_a.no_of_packages = _b.sent(),
                    _a.packages = [],
                    _a)];
        }
    });
}); };
var questionSet = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        util_1.rl.question("", function (option) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, deliveryInfoData, i, packageDetails, deliveryInfo, i, packageDetails, deliveryTimeInfo, vehicleData;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = option;
                        switch (_a) {
                            case "1": return [3 /*break*/, 1];
                            case "2": return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 16];
                    case 1:
                        console.log("Let's get some delivery information...");
                        return [4 /*yield*/, getDeliveryInfo()];
                    case 2:
                        deliveryInfoData = _c.sent();
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < deliveryInfoData.no_of_packages)) return [3 /*break*/, 6];
                        console.log("Enter details for package ".concat(i + 1, " \n"));
                        return [4 /*yield*/, getPackageDetails()];
                    case 4:
                        packageDetails = _c.sent();
                        deliveryInfoData.packages.push(packageDetails);
                        _c.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        getOutput(deliveryInfoData);
                        return [3 /*break*/, 17];
                    case 7:
                        console.log("Let's get some delivery information... ");
                        return [4 /*yield*/, getDeliveryInfo()];
                    case 8:
                        deliveryInfo = _c.sent();
                        i = 0;
                        _c.label = 9;
                    case 9:
                        if (!(i < deliveryInfo.no_of_packages)) return [3 /*break*/, 12];
                        console.log("Enter details for package ".concat(i + 1, " \n"));
                        return [4 /*yield*/, getPackageDetails()];
                    case 10:
                        packageDetails = _c.sent();
                        deliveryInfo.packages.push(packageDetails);
                        _c.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 9];
                    case 12:
                        _b = {
                            delivery_information: deliveryInfo
                        };
                        return [4 /*yield*/, (0, util_1.getValueInt)(questionDictionary["no_of_vehicles"])];
                    case 13:
                        _b.no_of_vehicles = _c.sent();
                        return [4 /*yield*/, (0, util_1.getValueInt)(questionDictionary["max_speed"])];
                    case 14:
                        _b.max_speed = _c.sent();
                        return [4 /*yield*/, (0, util_1.getValueInt)(questionDictionary["max_carriable_weight"])];
                    case 15:
                        deliveryTimeInfo = (_b.max_carriable_weight = _c.sent(),
                            _b);
                        deliveryTimeInfo.delivery_information.packages.sort(function (a, b) { return b.pck_weight_in_kg - a.pck_weight_in_kg; });
                        vehicleData = new Array(deliveryTimeInfo.no_of_vehicles).fill(0);
                        getDeliveryTimeOutput(deliveryTimeInfo, vehicleData, 0);
                        return [3 /*break*/, 17];
                    case 16:
                        console.log(dialouge["invalid_choice"]);
                        return [3 /*break*/, 17];
                    case 17:
                        finishFunction();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
var finishFunction = function () {
    console.log("\n Task is finished\n Please select from the following options:\n1) Problem 1 (Total delivery cost of each package) \n2) Problem 2 (Delivery time estimation)");
    questionSet();
};
console.log(dialouge["opening"]);
questionSet();

import { PackageInformation } from "./types";
const readline = require("readline");
export const rl = readline.createInterface(process.stdin, process.stdout);


//Question 1 Truth Table for Offer Codes
export const truthTable = (packageInfo: PackageInformation): number => {
    switch (packageInfo.offer_code) {
      case "OFR001":
        if (
          packageInfo.distance_in_km < 200 &&
          packageInfo.pck_weight_in_kg <= 200 &&
          packageInfo.pck_weight_in_kg >= 70
        ) {
          return 0.1;
        } else {
          return 0;
        }
        break;
      case "OFR002":
        if (
          packageInfo.distance_in_km <= 150 &&
          packageInfo.distance_in_km >= 50 &&
          packageInfo.pck_weight_in_kg <= 250 &&
          packageInfo.pck_weight_in_kg >= 100
        ) {
          return 0.07;
        } else {
          return 0;
        }
        break;
      case "OFR003":
        if (
          packageInfo.distance_in_km <= 250 &&
          packageInfo.distance_in_km >= 50 &&
          packageInfo.pck_weight_in_kg <= 150 &&
          packageInfo.pck_weight_in_kg >= 10
        ) {
          return 0.05;
        } else {
          return 0;
        }
        break;
      default:
        return 0;
    }
  };
  export  const getValueInt = (questionString: string): Promise<number> => {
    return new Promise((resolve) => {
      rl.question(questionString, (option:string) => {
        const regaxTest = /^[0-9]+$/;
        if (regaxTest.test(option)) {
          const amount = parseInt(option);
          resolve(amount);
        } else {
          console.log("Please enter a valid numeric value: \n");
          getValueInt(questionString).then(resolve);
        }
      });
    });
  };
  
export const getValueString = (questionString:string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(questionString, (option:string) => {
        const regaxTest = /^[a-zA-Z0-9]+$/;
        if (regaxTest.test(option)) {
          resolve(option);
        } else {
          console.log("Please enter a valid value: \n");
          getValueString(questionString).then(resolve);
        }
      });
    });
  };
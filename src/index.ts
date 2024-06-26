import {
  DeliveryInformation,
  PackageInformation,
  DeliveryTimeInformation,
} from "./types";
import { rl, truthTable, getValueInt, getValueString } from "./util";
//Dialouge Tree for intro and error
const dialouge: { [key: string]: string } = {
  opening:
    "\n\n\n\n\n\n\n\n\nWelcome to Kiki's Delivery Service!\n\nPlease select from the following options:\n1) Problem 1 (Total delivery cost of each package) \n2) Problem 2 (Delivery time estimation)",
  invalid_choice:
    "You selected an invalid choice...\n\nPlease select from the following options:\n1) Problem 1 (Total delivery cost of each package) \n2) Problem 2 (Delivery time estimation)",
};
//Dictionary for questions to ask the client
const questionDictionary: { [key: string]: string } = {
  no_of_packages: "How many packages will you be delivering? ",
  base_delivery_cost: "What is the base cost of the packages? ",
  pkg_id: "Package Id? ",
  pkg_weight_in_kg: "What is the package weight in kg? ",
  pkg_distance_in_km: "Package delivery distance in km? ",
  offer_code: "Input offer Code: ",
  no_of_vehicles: "How many vehicles will transport the delivery? ",
  max_speed: "What is the maximum speed of the vehicles? ",
  max_carriable_weight:
    "What is the maximum carriable weight of the vehicles? ",
};

//Question 1 and 2
const getOutput = (
  deliveryInfo: DeliveryInformation,
  deliverySpeed?: number,
  deliveryTax?: number
) => {
  //Standard for loop printing out each object info
  deliveryInfo.packages.forEach((packageInfo) => {
    console.log(`Id: ${packageInfo.pkg_id}`);
    const sum =
      deliveryInfo.base_delivery_cost +
      packageInfo.pck_weight_in_kg * 10 +
      packageInfo.distance_in_km * 5;
    const discount = sum * truthTable(packageInfo);
    console.log(`Discount: ${discount.toFixed(0)}`);
    console.log(`Total Cost: ${(sum - discount).toFixed(0)}`);
    //if speed is included within the function call print out the time it will take
    if (typeof deliverySpeed === "number") {
      console.log(
        `Delivery Time in hours: ${(
          Math.floor((packageInfo.distance_in_km / deliverySpeed) * 100) / 100 +
          (deliveryTax || 0)
        ).toFixed(2)}`
      );
    }
  });
};

//Question 2
const getDeliveryTimeOutput = (
  deliveryTimeInfo: DeliveryTimeInformation,
  vehicleData: number[],
  currentVehicleIndex = 0
) => {
  if (deliveryTimeInfo.delivery_information.packages.length == 0) {
    console.log("All packages have been delivered");
    return;
  }
  let packageShipment: PackageInformation[] = [];
  if (deliveryTimeInfo.delivery_information.packages.length == 1) {
    packageShipment = deliveryTimeInfo.delivery_information.packages;
  } else {
    let pointer2 = 1;
    let pointer1 = 0;
    let totalWeight = 0;
    let tempTotalWeight = 0;
    let totalDistance = 0;
    let tempTotalDistance = 0;
    let firstShipPlaced = false;
    let tempPackageShipment: PackageInformation[] = [];
    while (
      pointer1 <
      deliveryTimeInfo.delivery_information.packages.length - 1
    ) {
      //Gets the pointer 1 value and goes through the list finding packages that can be added from that pointer to the end of the list
      if (!firstShipPlaced) {
        const packageInfo1 =
          deliveryTimeInfo.delivery_information.packages[pointer1];
        if (
          packageInfo1.pck_weight_in_kg > deliveryTimeInfo.max_carriable_weight
        ) {
          console.error(
            "Impossible to Deliver Packages: A singular package is greater than the maximum load"
          );
          return;
        } else {
          tempPackageShipment.push(packageInfo1);
          tempTotalDistance = packageInfo1.distance_in_km;
          tempTotalWeight = packageInfo1.pck_weight_in_kg;
          firstShipPlaced = true;
        }
      }
      //Grabs package 2 and check if it can be added to the shipment
      const packageInfo2 =
        deliveryTimeInfo.delivery_information.packages[pointer2];
      //check to see if our additional package is greater than our limit
      if (
        packageInfo2.pck_weight_in_kg + tempTotalWeight >
        deliveryTimeInfo.max_carriable_weight
      ) {
        //Increment if it bigger
        pointer2++;
      } else {
        //add the package to the shipment if not
        tempPackageShipment.push(packageInfo2);
        tempTotalWeight += packageInfo2.pck_weight_in_kg;
        tempTotalDistance += packageInfo2.distance_in_km;
        pointer2++;
      }
      // check to see if at end
      if (
        pointer2 >=
        deliveryTimeInfo.delivery_information.packages.length - 1
      ) {
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

  const tempDeliveryInfo: DeliveryInformation = {
    base_delivery_cost:
      deliveryTimeInfo.delivery_information.base_delivery_cost,
    no_of_packages: packageShipment.length,
    packages: packageShipment,
  };
  console.log("======Shipment Info========");
  getOutput(
    tempDeliveryInfo,
    deliveryTimeInfo.max_speed,
    vehicleData[currentVehicleIndex] * 2
  );
  const shippedPackageIds = new Set();
  let max = 0;
  //Set distance tax for each truck and add id of packages for later loop
  packageShipment.forEach((shipment) => {
    if (shipment.distance_in_km > max) {
      max = shipment.distance_in_km;
    }
    shippedPackageIds.add(shipment.pkg_id);
  });
  vehicleData[currentVehicleIndex] +=
    Math.floor((max / deliveryTimeInfo.max_speed) * 100) / 100;
  // Remove any delivery that is in the shipment so later loops are smaller.
  deliveryTimeInfo.delivery_information.packages = deliveryTimeInfo.delivery_information.packages.filter(
    (packageInfo) => !shippedPackageIds.has(packageInfo.pkg_id)
  );
  if (deliveryTimeInfo.delivery_information.packages.length > 0) {
    let min = Infinity;
    let minIndex = 0;
    //Choose the next truck with the smallest amount of time as it will be the next truck available for delivery.
    for (let i = 0; i < vehicleData.length; i++) {
      if (vehicleData[i] < min) {
        min = vehicleData[i];
        minIndex = i;
      }
    }
    //Repeat until empty
    getDeliveryTimeOutput(deliveryTimeInfo, vehicleData, minIndex);
  }
};

const getPackageDetails = async (): Promise<PackageInformation> => {
  const pkg_id = await getValueString(questionDictionary["pkg_id"]);
  const pck_weight_in_kg = await getValueInt(
    questionDictionary["pkg_weight_in_kg"]
  );
  const distance_in_km = await getValueInt(
    questionDictionary["pkg_distance_in_km"]
  );
  const offer_code = await getValueString(questionDictionary["offer_code"]);
  return { pkg_id, pck_weight_in_kg, distance_in_km, offer_code };
};

const getDeliveryInfo = async (): Promise<DeliveryInformation> => {
  return {
    base_delivery_cost: await getValueInt(
      questionDictionary["base_delivery_cost"]
    ),
    no_of_packages: await getValueInt(questionDictionary["no_of_packages"]),
    packages: [],
  };
};

const questionSet = async () => {
  rl.question("", async (option: string) => {
    switch (option) {
      case "1":
        console.log("Let's get some delivery information...");
        const deliveryInfoData: DeliveryInformation = await getDeliveryInfo();
        for (let i = 0; i < deliveryInfoData.no_of_packages; i++) {
          console.log(`Enter details for package ${i + 1} \n`);
          const packageDetails: PackageInformation = await getPackageDetails();
          deliveryInfoData.packages.push(packageDetails);
        }
        getOutput(deliveryInfoData);
        break;
      case "2":
        console.log("Let's get some delivery information... ");
        const deliveryInfo: DeliveryInformation = await getDeliveryInfo();
        for (let i = 0; i < deliveryInfo.no_of_packages; i++) {
          console.log(`Enter details for package ${i + 1} \n`);
          const packageDetails: PackageInformation = await getPackageDetails();
          deliveryInfo.packages.push(packageDetails);
        }
        const deliveryTimeInfo: DeliveryTimeInformation = {
          delivery_information: deliveryInfo,
          no_of_vehicles: await getValueInt(
            questionDictionary["no_of_vehicles"]
          ),
          max_speed: await getValueInt(questionDictionary["max_speed"]),
          max_carriable_weight: await getValueInt(
            questionDictionary["max_carriable_weight"]
          ),
        };
        deliveryTimeInfo.delivery_information.packages.sort(
          (a, b) => b.pck_weight_in_kg - a.pck_weight_in_kg
        );
        let vehicleData: number[] = new Array(
          deliveryTimeInfo.no_of_vehicles
        ).fill(0);
        getDeliveryTimeOutput(deliveryTimeInfo, vehicleData, 0);
        break;
      default:
        console.log(dialouge["invalid_choice"]);
        break;
    }
    finishFunction();
  });
};
const finishFunction = () => {
  console.log(
    "\n Task is finished\n Please select from the following options:\n1) Problem 1 (Total delivery cost of each package) \n2) Problem 2 (Delivery time estimation)"
  );
  questionSet();
};
console.log(dialouge["opening"]);
questionSet();

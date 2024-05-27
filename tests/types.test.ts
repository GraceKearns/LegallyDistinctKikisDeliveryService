import {
  PackageInformation,
  DeliveryInformation,
  DeliveryTimeInformation,
} from "../src/types";
import { describe, test, expect } from "@jest/globals";

describe("Is type correct", () => {
  test("Package Information", () => {
    const packetInfo: PackageInformation = {
      pkg_id: "PGK1",
      pck_weight_in_kg: 5,
      distance_in_km: 5,
      offer_code: "OFR001",
    };
    const packetInfoTypeName: string = Object.prototype.toString
      .call(packetInfo)
      .slice(8, -1);
    console.log(packetInfoTypeName);
    expect(packetInfoTypeName).toEqual("Object");
    expect(typeof packetInfo.distance_in_km).toEqual("number");
    expect(typeof packetInfo.pck_weight_in_kg).toEqual("number");
    expect(typeof packetInfo.offer_code).toEqual("string");
    expect(typeof packetInfo.pkg_id).toEqual("string");
  });
  test("Delivery Information", () => {
    const packetInfo: PackageInformation = {
      pkg_id: "PGK1",
      pck_weight_in_kg: 5,
      distance_in_km: 5,
      offer_code: "OFR001",
    };
    const deliveryInfo: DeliveryInformation = {
        base_delivery_cost:1,
        no_of_packages:1,
        packages: [packetInfo],
    }
    const packetInfoTypeName: string = Object.prototype.toString
      .call(packetInfo)
      .slice(8, -1);
    console.log(packetInfoTypeName);
    expect(packetInfoTypeName).toEqual("Object");
    expect(typeof packetInfo.distance_in_km).toEqual("number");
    expect(typeof packetInfo.pck_weight_in_kg).toEqual("number");
    expect(typeof packetInfo.offer_code).toEqual("string");
    expect(typeof packetInfo.pkg_id).toEqual("string");
    expect(typeof deliveryInfo.base_delivery_cost).toEqual("number");
    expect(typeof deliveryInfo.no_of_packages).toEqual("number");
    expect(typeof deliveryInfo.packages).toEqual("object");
  });
  test("Delivery Time Information", () => {
    const packetInfo: PackageInformation = {
      pkg_id: "PGK1",
      pck_weight_in_kg: 5,
      distance_in_km: 5,
      offer_code: "OFR001",
    };
    const deliveryInfo: DeliveryInformation = {
        base_delivery_cost:1,
        no_of_packages:1,
        packages: [packetInfo],
    }
    const deliveryTimeInfo: DeliveryTimeInformation = {
        delivery_information: deliveryInfo,
        no_of_vehicles:1,
        max_speed:1,
        max_carriable_weight:1,
    }
    const packetInfoTypeName: string = Object.prototype.toString
      .call(packetInfo)
      .slice(8, -1);
    console.log(packetInfoTypeName);
    expect(packetInfoTypeName).toEqual("Object");
    expect(typeof packetInfo.distance_in_km).toEqual("number");
    expect(typeof packetInfo.pck_weight_in_kg).toEqual("number");
    expect(typeof packetInfo.offer_code).toEqual("string");
    expect(typeof packetInfo.pkg_id).toEqual("string");
    expect(typeof deliveryInfo.base_delivery_cost).toEqual("number");
    expect(typeof deliveryInfo.no_of_packages).toEqual("number");
    expect(typeof deliveryInfo.packages).toEqual("object");
    expect(typeof deliveryTimeInfo.no_of_vehicles).toEqual("number");
    expect(typeof deliveryTimeInfo.max_speed).toEqual("number");
    expect(typeof deliveryTimeInfo.max_carriable_weight).toEqual("number");
    expect(typeof deliveryTimeInfo.delivery_information).toEqual("object");
  });
});

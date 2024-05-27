import {
  PackageInformation,
  DeliveryInformation,
  DeliveryTimeInformation,
} from "../src/types";
import { describe, test, expect } from "@jest/globals";
import { truthTable } from "../src/util";
describe("Truth Table Check (Problem 1)", () => {
  test("Package Information discount", () => {
    const packetInfo: PackageInformation = {
      pkg_id: "PGK1",
      pck_weight_in_kg: 80,
      distance_in_km: 100,
      offer_code: "OFR001",
    };
    expect(truthTable(packetInfo)).toBe(0.1);
  });
  test("Package Information no discount", () => {
    const packetInfo: PackageInformation = {
      pkg_id: "PGK1",
      pck_weight_in_kg: 5,
      distance_in_km: 5,
      offer_code: "OFR001",
    };
    expect(truthTable(packetInfo)).toBe(0);
  });

  test("Package Information discount", () => {
    const packetInfo: PackageInformation = {
      pkg_id: "PGK2",
      pck_weight_in_kg: 100,
      distance_in_km: 100,
      offer_code: "OFR002",
    };
    expect(truthTable(packetInfo)).toBe(0.07);
  });
  test("Package Information no discount", () => {
    const packetInfo: PackageInformation = {
      pkg_id: "PGK2",
      pck_weight_in_kg: 160,
      distance_in_km: 160,
      offer_code: "OFR002",
    };
    expect(truthTable(packetInfo)).toBe(0);
  });
});



export interface DeliveryInformation {
  base_delivery_cost: number;
  no_of_packages: number;
  packages: PackageInformation[];
}
export interface DeliveryTimeInformation {
  delivery_information: DeliveryInformation;
  no_of_vehicles:number;
  max_speed:number;
  max_carriable_weight:number;
}
export interface PackageInformation {
  pkg_id: string;
  pck_weight_in_kg: number;
  distance_in_km: number;
  offer_code: string;
}

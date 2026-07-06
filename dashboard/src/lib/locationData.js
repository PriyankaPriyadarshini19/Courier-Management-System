export const INDIA_CITIES = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Kolkata",
  "Chennai",
  "Bhubaneswar",
  "Cuttack",
  "Rourkela",
  "Ranchi",
  "Nashik",
  "Hyderabad",
  "Lucknow",
  "Indore",
  "Bhopal",
  "Agra",
];

const toOption = (value) => ({ value, label: value });

export const INDIA_CITY_OPTIONS = INDIA_CITIES.map(toOption);

export const INTERNATIONAL_COUNTRIES_WITH_CAPITALS = [
  { country: "Afghanistan", capital: "Kabul" },
  { country: "Bahrain", capital: "Manama" },
  { country: "Bangladesh", capital: "Dhaka" },
  { country: "China", capital: "Beijing" },
  { country: "Germany", capital: "Berlin" },
  { country: "Iran", capital: "Tehran" },
  { country: "Iraq", capital: "Baghdad" },
  { country: "Japan", capital: "Tokyo" },
  { country: "Kuwait", capital: "Kuwait City" },
  { country: "Malaysia", capital: "Kuala Lumpur" },
  { country: "Oman", capital: "Muscat" },
  { country: "Qatar", capital: "Doha" },
  { country: "Russia", capital: "Moscow" },
  { country: "Saudi Arabia", capital: "Riyadh" },
  { country: "Singapore", capital: "Singapore" },
  { country: "South Korea", capital: "Seoul" },
  { country: "Turkey", capital: "Ankara" },
  { country: "United Arab Emirates", capital: "Abu Dhabi" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States", capital: "Washington, D.C." },
];

export const INTERNATIONAL_DESTINATION_OPTIONS =
  INTERNATIONAL_COUNTRIES_WITH_CAPITALS.map(({ country, capital }) =>
    toOption(`${country}, ${capital}`)
  );

export const getDestinationOptionsForShipmentType = (shipmentType) =>
  shipmentType === "international"
    ? INTERNATIONAL_DESTINATION_OPTIONS
    : INDIA_CITY_OPTIONS;

export const isValidDestinationForShipmentType = (shipmentType, destination) =>
  !destination ||
  getDestinationOptionsForShipmentType(shipmentType).some(
    (o) => o.value === destination
  );


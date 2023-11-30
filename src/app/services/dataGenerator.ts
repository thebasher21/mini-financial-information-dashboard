import { faker } from "@faker-js/faker";
import { CompanyInformation } from "../types";

export function createNewCompany(): CompanyInformation {
  let companyName: string = faker.company.name();
  return {
    _id: faker.string.uuid(),
    companyName: companyName,
    address: faker.location.streetAddress(),
    registrationDate: faker.date.past(),
    numberOfEmployees: faker.number.int({ min: 50, max: 100_000 }),
    raisedCapital: faker.number.int({ min: 1_000_000, max: 100_000_000 }),
    turnover: faker.number.int({ min: 500_000, max: 99_000_000 }),
    netProfit: faker.number.int({ min: -10_000_000, max: 10_000_000 }),
    contactNumber: faker.phone.number(),
    contactEmail: faker.internet.email({
      provider: `${companyName.split(" ").join("").replaceAll(",", "")}.com`,
    }),
    companyWebsite: `${companyName
      .split(" ")
      .join("")
      .replaceAll(",", "")}.com`,
    loanAmount: faker.number.int({ min: 0, max: 15_000_000 }),
    loanInterestPercentage: faker.number.int({ min: 5, max: 18 }),
    accountStatus:
      faker.number.int({ min: 0, max: 10 }) < 5 ? "ACTIVE" : "CLOSED",
  };
}

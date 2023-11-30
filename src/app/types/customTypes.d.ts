export type CompanyInformation = {
  _id: string;
  companyName: string;
  address: string;
  registrationDate: Date;
  numberOfEmployees: number;
  raisedCapital: number;
  turnover: number;
  netProfit: number;
  contactNumber: string;
  contactEmail: string;
  companyWebsite: string;
  loanAmount: number;
  loanInterestPercentage: number;
  accountStatus: string;
};

export type FilterDetails = {
  minimumLoan: number;
  maximumLoan: number;
  accountStatus: string[];
  dateStart: Date;
  dateEnd: Date;
};

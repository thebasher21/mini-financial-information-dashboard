"use client";

import { CompanyInformation } from "@/app/types";
import styles from "./card.module.css";

type CompanyInformationCardProps = {
  company: CompanyInformation;
};

export default function CompanyInformationCard(
  props: CompanyInformationCardProps
) {
  return (
    <div
      className={`card text-bg-dark ${
        props.company.netProfit > 0 ? "border-success" : "border-danger"
      } mb-3`}
    >
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="true"
        data-bs-keyboard="true"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content text-bg-dark">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Company Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>About</h5>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Company Name : ${props.company.companyName}`}</span>
              </div>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Account Status : ${props.company.accountStatus}`}</span>
              </div>
              <br />
              <h5>Financial Information</h5>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Net Profit : ${props.company.netProfit.toLocaleString(
                  "en-in",
                  { style: "currency", currency: "INR" }
                )}`}</span>
              </div>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Turnover : ${props.company.turnover.toLocaleString(
                  "en-in",
                  { style: "currency", currency: "INR" }
                )}`}</span>
              </div>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Raised Capital : ${props.company.raisedCapital.toLocaleString(
                  "en-in",
                  { style: "currency", currency: "INR" }
                )}`}</span>
              </div>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Loan Amount : ${props.company.loanAmount.toLocaleString(
                  "en-in",
                  { style: "currency", currency: "INR" }
                )}`}</span>
              </div>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Loan Interest : ${props.company.loanInterestPercentage}%`}</span>
              </div>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Employee Count : ${props.company.numberOfEmployees.toLocaleString(
                  "en-in",
                  { style: "currency", currency: "INR" }
                )}`}</span>
              </div>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Registration Date : ${props.company.registrationDate.toDateString()}`}</span>
              </div>
              <br />
              <h5>Contact Information</h5>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Company Website : ${props.company.companyWebsite}`}</span>
              </div>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Contact Email : ${props.company.contactEmail}`}</span>
              </div>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Contact Number : ${props.company.contactNumber}`}</span>
              </div>
              <div className={styles.companyFinancials}>
                <span className="card-text">{`Company Address : ${props.company.address}`}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-header">{`Account - ${props.company.accountStatus}`}</div>
      <div className="card-body">
        <h5 className="card-title">{props.company.companyName}</h5>
        <br />
        <div className={styles.companyFinancials}>
          <span className="card-text">{`Net Profit: ${props.company.netProfit.toLocaleString(
            "en-in",
            { style: "currency", currency: "INR", maximumFractionDigits: 0 }
          )}`}</span>
        </div>
        <div className={styles.companyFinancials}>
          <span className="card-text">{`Turnover: ${props.company.turnover.toLocaleString(
            "en-in",
            { style: "currency", currency: "INR", maximumFractionDigits: 0 }
          )}`}</span>
        </div>
        <div className={styles.companyFinancials}>
          <span className="card-text">{`Raised Capital: ${props.company.raisedCapital.toLocaleString(
            "en-in",
            { style: "currency", currency: "INR", maximumFractionDigits: 0 }
          )}`}</span>
        </div>
        <div className={styles.companyFinancials}>
          <span className="card-text">{`Loan Amount: ${props.company.loanAmount.toLocaleString(
            "en-in",
            { style: "currency", currency: "INR", maximumFractionDigits: 0 }
          )}`}</span>
        </div>
        <div className={styles.companyFinancials}>
          <span className="card-text">{`Loan Interest: ${props.company.loanInterestPercentage}%`}</span>
        </div>
      </div>
      <div className="card-footer">
        <div className={styles.viewDetailsButtonContainer}>
          <button
            type="button"
            className="btn btn-outline-info"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

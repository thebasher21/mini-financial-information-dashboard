"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./dashboard.module.css";
import { useCallback, useEffect, useState } from "react";
import CompanyInformationCard from "../card/index";
import Pagination, { PaginationDetails } from "../pagination";
import { createNewCompany } from "@/app/services/dataGenerator";
import { CompanyInformation, FilterDetails } from "@/app/types";
import Filters from "../filters";
import Header from "../header";
import Graphs from "../graphs";

export default function Home() {
  const [allCompaniesInformation, setAllCompaniesInformation] = useState<
    CompanyInformation[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationDetails>({
    currentPage: 1,
    totalPages: allCompaniesInformation.length / 12,
    itemsPerPage: 12,
  });
  const [filters, setFilters] = useState<FilterDetails>({
    minimumLoan: 0,
    maximumLoan: 15_000_000,
    accountStatus: ["ACTIVE", "CLOSED"],
    dateStart: new Date(0),
    dateEnd: new Date(),
  });
  var numCompanies: number = process.env.NEXT_PUBLIC_NUMBER_OF_COMPANIES
    ? parseInt(process.env.NEXT_PUBLIC_NUMBER_OF_COMPANIES)
    : 50;
  const applyFilters = useCallback(
    (company: CompanyInformation) => {
      if (!filters.accountStatus.includes(company.accountStatus)) {
        return false;
      }
      if (filters.dateStart > company.registrationDate) {
        return false;
      } else if (
        filters.dateEnd &&
        filters.dateEnd < company.registrationDate
      ) {
        return false;
      }
      if (filters.minimumLoan && filters.minimumLoan > company.loanAmount) {
        return false;
      } else if (
        filters.maximumLoan &&
        filters.maximumLoan < company.loanAmount
      ) {
        return false;
      }
      return true;
    },
    [
      filters.accountStatus,
      filters.dateEnd,
      filters.dateStart,
      filters.maximumLoan,
      filters.minimumLoan,
    ]
  );
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (allCompaniesInformation.length === 0) {
        let mockData: CompanyInformation[] = [];
        setIsLoading(true);
        setTimeout(() => {
          for (let index = 0; index < numCompanies; index++) {
            let newCompany: CompanyInformation = createNewCompany();
            mockData.push(newCompany);
          }
          setAllCompaniesInformation((prev) => {
            return mockData;
          });
          setPagination((prev) => {
            return {
              ...prev,
              totalPages: Math.ceil(
                mockData.filter((company) => {
                  return applyFilters(company);
                }).length / prev.itemsPerPage
              ),
            };
          });
        }, 1000);
      } else {
        setPagination((prev) => {
          let totalPages: number = Math.ceil(
            allCompaniesInformation.filter((company) => {
              return applyFilters(company);
            }).length / prev.itemsPerPage
          );
          return {
            ...prev,
            currentPage: 1,
            totalPages: totalPages,
          };
        });
      }
    }
    return () => {
      setIsLoading(false);
      isMounted = false;
    };
  }, [allCompaniesInformation, numCompanies, applyFilters]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(pagination.itemsPerPage);
  const paginate = useCallback(() => {
    const newStart = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const newEnd = newStart + pagination.itemsPerPage;
    return { newStart, newEnd };
  }, [pagination.currentPage, pagination.itemsPerPage]);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let { newStart, newEnd } = paginate();
      setStartIndex(newStart);
      setEndIndex(newEnd);
    }
    return () => {
      isMounted = false;
    };
  }, [
    paginate,
    pagination.currentPage,
    pagination.itemsPerPage,
    pagination.totalPages,
  ]);
  return (
    <main className={styles.main}>
      <Header></Header>
      {allCompaniesInformation.length > 0 ? (
        <Graphs companies={allCompaniesInformation}></Graphs>
      ) : (
        <div className={styles.graphGridLoadingContainer}>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className={styles.mainContentContainer}>
        <Filters filters={filters} setFilters={setFilters}></Filters>
        {isLoading === true ? (
          <div className={styles.creditInfoLoadingContainer}>
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : allCompaniesInformation.filter((company) => {
            return applyFilters(company);
          }).length > 0 ? (
          <div className={styles.creditInfoContainer}>
            <div className={styles.creditInfoGrid}>
              {allCompaniesInformation
                .filter((company) => {
                  return applyFilters(company);
                })
                .slice(startIndex, endIndex)
                .map((company) => {
                  return (
                    <CompanyInformationCard
                      key={company._id}
                      company={company}
                    ></CompanyInformationCard>
                  );
                })}
            </div>
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
            ></Pagination>
          </div>
        ) : (
          <div className={styles.creditInfoContainer}>
            <h2 className={styles.noRecordsTextContainer}>No Records</h2>
          </div>
        )}
      </div>
    </main>
  );
}

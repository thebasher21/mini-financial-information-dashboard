"use client";

import { Bar, Pie } from "react-chartjs-2";
import styles from "./graphs.module.css";
import { CompanyInformation } from "@/app/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  BarElement,
  ArcElement,
  Legend,
} from "chart.js";
import { ChartData } from "chart.js/auto";
// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ArcElement);
type GraphsComponentProps = {
  companies: CompanyInformation[];
};

export default function Graphs(props: GraphsComponentProps) {
  let profitable: number = props.companies.reduce((prev, curr) => {
    if (curr.netProfit > 0) {
      prev += 1;
    }
    return prev;
  }, 0);
  let lossMaking: number = props.companies.length - profitable;
  let bestCompany: CompanyInformation = props.companies.reduce((prev, curr) => {
    if (prev === null) {
      return curr;
    } else if (curr.netProfit > prev.netProfit) {
      return curr;
    } else {
      return prev;
    }
  });
  let worstCompany: CompanyInformation = props.companies.reduce(
    (prev, curr) => {
      if (prev === null) {
        return curr;
      } else if (curr.netProfit < prev.netProfit) {
        return curr;
      } else {
        return prev;
      }
    }
  );
  const pieData: ChartData<"pie", number[], string> = {
    labels: ["Profitable", "Loss Making"],
    datasets: [
      {
        data: [profitable, lossMaking],
        backgroundColor: ["green", "red"],
      },
    ],
  };
  const pieOptions = {
    responsive: false,
    elements: {
      arc: {
        borderColor: "transparent",
      },
    },
  };
  const barOptions1 = {
    responsive: false,
  };
  const barOptions2 = {
    responsive: false,
  };
  const bestPerformingData = {
    labels: ["Turnover", "Net Profit", "Raised Capital", "Loan"],
    datasets: [
      {
        data: [
          bestCompany.turnover,
          bestCompany.netProfit,
          bestCompany.raisedCapital,
          bestCompany.loanAmount,
        ],
        backgroundColor: ["yellow", "green", "blue", "orange"],
      },
    ],
  };
  const worstPerformingData = {
    labels: ["Turnover", "Net Loss", "Raised Capital", "Loan"],
    datasets: [
      {
        data: [
          worstCompany.turnover,
          worstCompany.netProfit,
          worstCompany.raisedCapital,
          worstCompany.loanAmount,
        ],
        backgroundColor: ["yellow", "red", "blue", "orange"],
      },
    ],
  };
  return (
    <div className={styles.graphGridContainer}>
      <div className={styles.graphGrid}>
        <div className={styles.barChartContainer}>
          <div className={styles.graphTitle}>
            <h5 className="text-light">Best Performing Company</h5>
            <br />
            <span className="text-light">{bestCompany.companyName}</span>
          </div>
          <Bar
            data={bestPerformingData}
            options={barOptions1}
            width={"300"}
            height={"250"}
          />
        </div>
        <div className={styles.pieChartContainer}>
          <div className={styles.graphTitle}>
            <h5 className="text-light">Profitable vs Loss-making</h5>
          </div>
          <Pie
            data={pieData}
            options={pieOptions}
            width={"300"}
            height={"250"}
          />
        </div>
        <div className={styles.barChartContainer}>
          <div className={styles.graphTitle}>
            <h5 className="text-light">Worst Performing Company</h5>
            <br />
            <span className="text-light">{worstCompany.companyName}</span>
          </div>
          <Bar
            data={worstPerformingData}
            options={barOptions2}
            height={"250"}
            width={"300"}
          />
        </div>
      </div>
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";
import DataContext from "../context/DataContext";
import Spinner from "../components/spinner";
import { POPULATION_URI } from "../constant/apiurl";

const BarChart = () => {
  const { theme } = useContext(DataContext);
  const colors = tokens(theme.palette.mode);
  const [isLoading, setIsLoading] = useState(false);
  const [population, setPopulation] = useState([]);
  const [nation, setNation] = useState([]);

  // get population details
  const getPopulationApi = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(POPULATION_URI);
      if (response.status >= 200 && response.status <= 299) {
        setPopulation(response.data.data);
        setNation(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPopulationApi();
  }, []);
  const options = {
    scales: {
      x: {
        ticks: {
          color: colors.gray[100],
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Year",
          font: {
            size: 18, // Adjust font size
          },
          color: "#03c3ff",
        },
      },
      y: {
        ticks: {
          color: colors.gray[100],
        },
        grid: {
          display: false,
        },
        beginAtZero: true,
        title: {
          display: true,
          text: "Population",
          font: {
            size: 18, // Adjust font size
          },
          color: "#03c3ff",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: colors.gray[100],
        },
      },
    },
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Bar
          data={{
            labels: population?.map((data) => data.Year),
            datasets: [
              {
                label: "Population",
                data: population?.map((data) => data.Population),
                backgroundColor: ["#2ab42a", "#9fff9d", "#1b9a59"],
                borderWidth: 0,
              },
            ],
          }}
          options={options}
        />
      )}
    </>
  );
};

export default BarChart;

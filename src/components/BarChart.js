import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";
import DataContext from "../context/DataContext";
import Spinner from "../components/spinner";
import { POPULATION_URI } from "../constant/apiurl";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const BarChart = () => {
  const { theme } = useContext(DataContext);
  const colors = tokens(theme.palette.mode);
  const [isLoading, setIsLoading] = useState(false);
  const [population, setPopulation] = useState([]);
  const [nation, setNation] = useState("");

  // get population details
  const getPopulationApi = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(POPULATION_URI);
      if (response.status >= 200 && response.status <= 299) {
        setPopulation(response.data.data);
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

  // handel on select value
  const handleChange = (event) => {
    setNation(event.target.value);
  };

  // filter nation based on dropdown select
  const filterBynation = population?.filter((item) =>
    item.Nation.includes(nation)
  );

  // remove duplicate entries of nation
  const mapNation = population?.map((item) => item.Nation);
  const uniqueNation = [...new Set(mapNation)];

  const options = {
    scales: {
      x: {
        ticks: {
          color: colors.greenAccent[100],
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Year",
          font: {
            size: 14,
          },
          color: colors.greenAccent[400],
        },
      },
      y: {
        ticks: {
          color: colors.gray[100],
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
        beginAtZero: false,
        title: {
          display: true,
          text: "Population",
          font: {
            size: 14,
          },
          color: colors.greenAccent[400],
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
        <>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              className="shadow-sm"
              backgroundColor={colors.primary[400]}
              overflow="auto"
              sx={{
                border:
                  theme.palette.mode === "dark"
                    ? `1px solid ${colors.primary[900]}`
                    : "",
                borderRadius: "5px",
                position: "relative",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`1px solid ${colors.primary[900]}`}
                colors={colors.gray[100]}
                p="15px"
              >
                <Typography
                  color={colors.gray[100]}
                  variant="h5"
                  fontWeight="600"
                  className="text-truncate w-50"
                >
                  Population Overview
                </Typography>
                {/* select input */}
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  size="small"
                  className="bar-chart-dropdown"
                >
                  <InputLabel id="demo-select-small-label">
                    Select Nation
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={nation}
                    label="Select Nation"
                    onChange={handleChange}
                  >
                    {uniqueNation.map((list, index) => (
                      <MenuItem key={index} value={list}>
                        {list}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box p="10px" maxHeight="310px">
                <Bar
                  data={{
                    labels: filterBynation?.map((data) => data.Year),
                    datasets: [
                      {
                        label: "Population",
                        data: filterBynation?.map((data) => data.Population),
                        backgroundColor: ["#2ab42a", "#9fff9d", "#1b9a59"],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={options}
                />
              </Box>
            </Box>
          </Grid>
        </>
      )}
    </>
  );
};

export default BarChart;

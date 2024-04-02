import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import DataContext from "../context/DataContext";
import Spinner from "./spinner";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Grid, Typography } from "@mui/material";

const CustomBarChart = () => {
  const { theme } = useContext(DataContext);
  const colors = tokens(theme.palette.mode);
  const [isLoading, setIsLoading] = useState(false);
  const [nation, setNation] = useState("");

  const handleChange = (event) => {
    setNation(event.target.value);
  };
  const dummyData = [
    {
      Nation: "India",
      Population: 143242325,
      Year: 2020,
    },
    {
      Nation: "India",
      Population: 243242325,
      Year: 2021,
    },
    {
      Nation: "India",
      Population: 345542325,
      Year: 2022,
    },
    {
      Nation: "India",
      Population: 443242325,
      Year: 2023,
    },
    {
      Nation: "US",
      Population: 14324232,
      Year: 2020,
    },
    {
      Nation: "US",
      Population: 24324232,
      Year: 2021,
    },
    {
      Nation: "US",
      Population: 34554232,
      Year: 2022,
    },
  ];

  const filterBynation = dummyData?.filter((item) =>
    item.Nation.includes(nation)
  );

  const options = {
    scales: {
      x: {
        ticks: {
          color: colors.greenAccent[100],
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
                position: 'relative'
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
                >
                  Select by country Population Overview
                </Typography>
                {/* select input */}
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="bar-chart-dropdown">
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
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="US">US</MenuItem>
                    <MenuItem value="India">India</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box p="10px" maxHeight="310px">
                {/* bar chart */}
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

export default CustomBarChart;
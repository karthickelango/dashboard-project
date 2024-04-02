import React from "react";
import Header from "../components/Header";
import { Box, Grid } from "@mui/material";
import BarChart from "../components/BarChart";
import CustomBarChart from "../components/CustomBarChart";

const chartView = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Bar chart"  m="20px"/>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ margin: "0px !important", width: "98% !important" }}
      >
        <BarChart />
        <CustomBarChart />
      </Grid>
    </Box>
  );
};

export default chartView;

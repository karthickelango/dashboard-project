import React, { useContext, useState } from "react";
import {
  Box,
  Grid,
  Typography} from "@mui/material";
import { tokens } from "../../theme";
import BarChart from "../../components/BarChart";
import DataContext from "../../context/DataContext";
import Coin from "../../components/BitCoin";
import DummyData from "../../components/DummyData";
import RecipeReviewCard from "../../components/NewsComponent";
import MetaMask from "../../components/MetaMask";

const Dashboard = () => {
  const { userDetail, theme } = useContext(DataContext);
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {/* welcome grid */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ margin: "0px !important", width: "98% !important" }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <Box mb="30px">
            <Typography
              variant="h2"
              color={colors.gray[100]}
              fontWeight="bold"
              sx={{ mb: "5px" }}
            >
              Hello,{" "}
              <span style={{ color: "#a9e66b" }}>{userDetail.username}</span>
            </Typography>
            <Typography variant="h5" color={colors.gray[100]}>
              Welcome to{" "}
              <span style={{ color: "#2ab22a" }}>Spot trading !</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* bitcoin grid */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ margin: "0px !important", width: "98% !important" }}
      >
        <Coin />
      </Grid>
      {/* data grid */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ margin: "0px !important", width: "98% !important" }}
      >
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
                Population Overview
              </Typography>
            </Box>
            <Box p="10px" maxHeight='310px'>
              <BarChart />
            </Box>
          </Box>
        </Grid>
        <MetaMask />
        <RecipeReviewCard />
      </Grid>
      {/* dummy grid */}

      <Typography
        color={colors.gray[100]}
        variant="h5"
        fontWeight="600"
        sx={{ margin: "25px" }}
      >
        Dummy data
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ margin: "0px !important", width: "98% !important" }}
      >
        <DummyData />
      </Grid>
    </>
  );
};

export default Dashboard;

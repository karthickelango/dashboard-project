import React, { useContext, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { tokens } from "../../theme";
import BarChart from "../../components/BarChart";
import DataContext from "../../context/DataContext";
import Coin from "../../components/BitCoin";
import DummyData from "../../components/DummyData";
import RecipeReviewCard from "../../components/NewsComponent";
import MetaMask from "../../components/MetaMask";
import CustomBarChart from "../../components/CustomBarChart";

const Dashboard = () => {
  const { userDetail, theme } = useContext(DataContext);
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {/* welcome grid */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
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
        <Grid item xs={12} sm={12} md={12} lg={9}>
          <Grid container spacing={2}>
            <Coin />
            <BarChart />
            <CustomBarChart />
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                color={colors.gray[100]}
                variant="h5"
                fontWeight="600"
                sx={{ margin: "0px" }}
              >
                Dummy data
              </Typography>
            </Grid>
            <DummyData />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <Grid container spacing={2}>
            <MetaMask />
            <RecipeReviewCard />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;

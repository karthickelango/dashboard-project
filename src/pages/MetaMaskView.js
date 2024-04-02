import React from "react";
import Header from "../components/Header";
import { Box, Grid } from "@mui/material";
import MetaMask from "../components/MetaMask";

const MetaMaskView = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="MetaMask" />
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ margin: "0px !important", width: "98% !important" }}
      >
        <MetaMask />
      </Grid>
    </Box>
  );
};

export default MetaMaskView;

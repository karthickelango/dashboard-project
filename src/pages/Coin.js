import React from "react";
import Header from "../components/Header";
import { Box, Grid } from "@mui/material";
import Coin from "../components/BitCoin";

const CoinPage = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Bit Coins" />
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ margin: "0px !important", width: "98% !important" }}
      >
        <Coin />
      </Grid>
    </Box>
  );
};

export default CoinPage;

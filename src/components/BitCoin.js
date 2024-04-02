import React, { useContext } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import DataContext from "../context/DataContext";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import bitCoinImg from "../assets/images/bitcoin.svg";
import litecoin from "../assets/images/litecoin.svg";
import etherium from "../assets/images/etherium.svg";
import graph1 from "../assets/images/graph-r.svg";
import graph2 from "../assets/images/graph-b.svg";
import graph3 from "../assets/images/graph-o.svg";
const Coin = () => {
  const { CryptoCurrencyPrice, theme } = useContext(DataContext);
  const colors = tokens(theme.palette.mode);

  // get random bg color based on index because the data is not static
  const getRandomBgColor = (index) => {
    if (index == 0) {
      return "#2ab42a";
    } else if (index == 1) {
      return "#03c3ff";
    } else {
      return "#1b9a59";
    }
  };

  // get random graph based on index because the data is not static
  const randomGraph = (index) => {
    if (index == 0) {
      return graph3;
    } else if (index == 1) {
      return graph2;
    } else {
      return graph1;
    }
  };

  // get random color based on index because the data is not static
  const getRandomColor = (index) => {
    if (index == 0) {
      return "#2ab42a";
    } else if (index == 1) {
      return "#03c3ff";
    } else {
      return "red";
    }
  };

  // get random bit coin based on index because the data is not static
  const getRandomBitCoinImg = (index) => {
    if (index == 0) {
      return bitCoinImg;
    } else if (index == 1) {
      return etherium;
    } else {
      return litecoin;
    }
  };
  return (
    <>
      {Object.entries(CryptoCurrencyPrice).map(([key, value], index) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
          <Box
            className="crypto-box shadow-sm"
            backgroundColor={colors.primary[400]}
            p="30px"
            sx={{
              borderRadius: "5px",
              position: "relative",
              border:
                theme.palette.mode === "dark"
                  ? `1px solid ${colors.primary[900]}`
                  : "",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              style={{ display: "flex", alignItems: "center",  fontSize: "20px", }}
            >
              <Avatar sx={{ bgcolor: getRandomBgColor(index) }}>
                <span
                  style={{ colors: colors.gray[100] }}
                  dangerouslySetInnerHTML={{ __html: value.symbol }}
                ></span>
              </Avatar>
              <Avatar
                alt="Remy Sharp"
                src={getRandomBitCoinImg(index)}
                className="coin-img"
                style={{ width: "60px", height: "60px" }}
              />
              <span style={{marginTop: '10px'}}>{value.rate} <span style={{fontSize: '12px'}}>{value.code}</span></span>
            </Typography>
            <Typography
              className="coin-percent"
              sx={{ color: getRandomColor(index) }}
            >
              +5.90%
            </Typography>
            <Box>
              <img
                src={randomGraph(index)}
                style={{
                  paddingTop: "10px",
                }}
              />
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default Coin;

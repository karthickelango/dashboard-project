import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import { tokens } from "../theme";
import metaMask from "../assets/images/metamask.svg";
import AlertDialog from '../components/AlertDialogs'

const MetaMask = () => {
  const { theme } = useContext(DataContext);
  const colors = tokens(theme.palette.mode);
  const [metaMaskWalletAddress, setMetaMaskWalletAddress] = useState("");
  const [open, setOpen] = useState(false);

  // handle MetaMask wallet connection
  const handelWalletConnection = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setMetaMaskWalletAddress(accounts);
      } catch (error) {
        console.log(error);
      }
    } else {
        setOpen(true)
    }
  };

  // get MetaMask wallet connection
  const getCurrentWalletConneected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setMetaMaskWalletAddress(accounts);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // add MetaMask wallet listener
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setMetaMaskWalletAddress(accounts);
      });
    } else {
      setMetaMaskWalletAddress("");
    }
  };

  useEffect(() => {
    getCurrentWalletConneected();
    addWalletListener();
  }, []);

  return (
    <Grid item xs={12} sm={12} md={6} lg={12}>
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
          <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
            MetaMask
          </Typography>
        </Box>
        <div style={{ padding: "20px", textAlign: "center", minHeight: "310px" }}>
          <img
            src={metaMask}
            style={{
              filter:
                metaMaskWalletAddress.length > 0
                  ? "grayscale(0%)"
                  : "grayscale(100%)",
            }}
            className="metamask-img"
          />
          {metaMaskWalletAddress.length > 0 ? (
            <Typography color={colors.gray[100]} variant="h5" fontWeight="600" fontSize='14px'>
              <span  style={{color: colors.greenAccent[400]}}>Successfully connected to <b>MetaMask Wallet</b></span>. If you want to switch
              accounts or disconnect, you can do so through the <b  style={{color: colors.greenAccent[400]}}>MetaMask wallet</b> interface.
            </Typography>
          ) : (
            <button
              className="custom-btn"
              style={{ backgroundColor: colors.greenAccent[400], marginTop: '55px' }}
              onClick={() => handelWalletConnection()}
            >Connect Wallet</button>
          )}
        </div>
      </Box>
      <AlertDialog open={open} setOpen={setOpen}/>
    </Grid>
  );
};

export default MetaMask;

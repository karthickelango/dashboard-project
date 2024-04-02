import React, { useContext } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { Box, Grid, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import StatBox from "./StateBox";
import DataContext from "../context/DataContext";

const DummyData = () => {
  const { theme } = useContext(DataContext);
  const colors = tokens(theme.palette.mode);

  // dummy items
  const dummyItems = [
    {
      id: "1",
      title: "Data 1",
      subtitle: "Total number of data",
      progress: "0.75",
      increase: "+14%",
      icon: (
        <EmailIcon sx={{ color: colors.greenAccent[400], fontSize: "26px" }} />
      ),
    },
    {
      id: "2",
      title: "Data 2",
      subtitle: "Total number of data",
      progress: "0.25",
      increase: "+14%",
      icon: (
        <EmailIcon sx={{ color: colors.greenAccent[400], fontSize: "26px" }} />
      ),
    },
    {
      id: "3",
      title: "Data 3",
      subtitle: "Total number of data",
      progress: "0.15",
      increase: "+14%",
      icon: (
        <EmailIcon sx={{ color: colors.greenAccent[400], fontSize: "26px" }} />
      ),
    },
    {
      id: "4",
      title: "Data 4",
      subtitle: "Total number of data",
      progress: "0.50",
      increase: "+14%",
      icon: (
        <EmailIcon sx={{ color: colors.greenAccent[400], fontSize: "26px" }} />
      ),
    },
  ];

  return (
    <>
      {dummyItems.map((item, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={index}
          sx={{ paddingBottom: "10px",  }}
        >
          <Box
            className="shadow-sm"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              border:
                theme.palette.mode === "dark"
                  ? `1px solid ${colors.primary[900]}`
                  : "",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <StatBox
              title={item.title}
              subtitle={item.subtitle}
              progress={item.progress}
              increase={item.increase}
              icon={
                <EmailIcon
                  sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default DummyData;

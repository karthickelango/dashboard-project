import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DataContext from "../../context/DataContext";
import UserMenu from "./UserMenu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { NotificationAddOutlined, Settings, SupportOutlined } from "@mui/icons-material";

const Sidebar = () => {
  const { theme } = useContext(DataContext);
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // side bar items
  const sidebarItems = [
    {
      id: "home",
      label: "Home",
      route: "/",
      icon: <HomeOutlinedIcon />,
    },
    {
      id: "coin",
      label: "BitCoin",
      route: "/bitcoin",
      icon: <PeopleOutlinedIcon />,
    },
    {
      id: "metemask",
      label: "MetaMask",
      route: "/metamask",
      icon: <BarChartOutlinedIcon />,
    },
    {
      id: "chartview",
      label: "Chart View",
      route: "/chartview",
      icon: <BarChartOutlinedIcon />,
    },
  ];

  // side bar items
  const sidebarBottom = [
    {
      id: "notification",
      label: "Notification",
      icon: <NotificationAddOutlined />,
    },
    {
      id: "support",
      label: "Support",
      icon: <SupportOutlined />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings />,
    },
  ];

  return (
    <Box
      className={
        "side-bar collapsed-mobile " + (isCollapsed ? "collapsed" : "")
      }
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 0px 5px 0px !important",
          margin: "5px 0px",
          maxHeight: "66px",
        },
        ".pro-sidebar .pro-menu .pro-menu-item": {
          height: "auto",
        },
        borderRight: `1px solid ${colors.primary[900]}`,
      }}
    >
      <Menu>
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={
            isCollapsed ? (
              <>
                <Typography variant="h3" color={colors.gray[100]}>
                  <span className="brand-logo"></span>
                </Typography>
                <ArrowCircleRightRoundedIcon />
              </>
            ) : undefined
          }
          style={{
            margin: isCollapsed ? "10px 0px 0px 0px" : "10px 0px 0px 0px",
            color: colors.gray[100],
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              className="logo-icon-wrapper"
            >
              <Typography variant="h3" color={colors.gray[100]}>
                <span className="brand-logo"></span>
              </Typography>
              <MenuOutlinedIcon />
            </Box>
          )}
        </MenuItem>
      </Menu>
      <div
        style={{
          borderBottom: `1px solid ${colors.primary[900]}`,
          padding: "15px 15px",
        }}
      >
        <div>
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="5px"
            sx={{ border: `1px solid ${colors.primary[900]}` }}
          >
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          </Box>
        </div>
      </div>
      <ProSidebar collapsed={isCollapsed} className="collapsed-mobile">
        <Menu iconShape="square">
          {/* Menu items */}
          <Box>
            {sidebarItems.map((item, index) => (
              <NavLink
                key={index}
                exact="true"
                to={item.route}
                activeclassname="active"
                className={
                  theme.palette.mode === "dark" ? "dark-mode" : "light-mode"
                }
              >
                {item.icon}
                <Typography
                  className="mobile-view"
                  style={{ display: isCollapsed ? "none" : "block" }}
                >
                  {item.label}
                </Typography>
              </NavLink>
            ))}
          </Box>
          <Box sx={{position: 'absolute', bottom: 0, width: '100%'}}>
            {sidebarBottom.map((item, index) => (
              <Link
                key={index}
                exact="true"
                activeclassname="active"
                className={
                  theme.palette.mode === "dark" ? "dark-mode" : "light-mode"
                }
              >
                {item.icon}
                <Typography
                  className="mobile-view"
                  style={{ display: isCollapsed ? "none" : "block" }}
                >
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Box>
        </Menu>
      </ProSidebar>
      <UserMenu collapsed={isCollapsed} />
    </Box>
  );
};

export default Sidebar;

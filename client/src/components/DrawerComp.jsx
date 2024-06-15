import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

// const PAGES = ["Tournament", "League", "Login", "Logout", "Subscribe"];

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate(); 

  const handleLeagueNav = () => {
    setOpenDrawer(false);
    setTimeout(() => {
      navigate("/CreateLeague");
    }, 200);
  };
  
  const handleTournamentNav = () => {
    setOpenDrawer(false);
    setTimeout(() => {
      navigate("/Tournament");
    }, 200);
  };

  const handleLoginNav = () => {
    setOpenDrawer(false);
    setTimeout(() => {
      navigate("/Login");
    }, 200);
  };

  const handleLogoutNav = () => {
    setOpenDrawer(false);
    setTimeout(() => {
      navigate("/Logout");
    }, 200);
  };
  
  const handleSubscribeNav = () => {
    setOpenDrawer(false);
    setTimeout(() => {
      navigate("/Subscribe");
    }, 200);
  };

  return (
    <React.Fragment>
      <Drawer
        anchor="right" // Set anchor to right
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItemButton onClick={handleTournamentNav}>
            <ListItemText primary="Tournament" />
          </ListItemButton>

          <ListItemButton onClick={handleLeagueNav}>
            <ListItemText primary="League" />
          </ListItemButton>

          <ListItemButton onClick={handleLoginNav}>
            <ListItemText primary="Login" />
          </ListItemButton>

          <ListItemButton onClick={handleLogoutNav}>
            <ListItemText primary="Logout" />
          </ListItemButton>

          <ListItemButton onClick={handleSubscribeNav}>
            <ListItemText primary="Subscribe" />
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton 
        sx={{ color: "white", marginLeft: "auto" }} 
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;

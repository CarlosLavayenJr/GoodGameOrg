import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import DrawerComp from "./DrawerComp";
import {Link} from "react-router-dom"
const PAGES = ["Tournament", "League"];

const Navbar = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GOODGAMEORG
          </Typography>

          {isMatch ? (
            <DrawerComp />
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Tabs 
                  value={value} 
                  onChange={(e, newValue) => setValue(newValue)} 
                  textColor="inherit" 
                  indicatorColor="secondary"
                >
                  {PAGES.map((page, index) => (
                    <Tab key={index} label={page} />
                  ))}
                </Tabs>
              </Box>
              <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <Button sx={{ marginRight: "10px" }} variant="contained" color="secondary">
                  Login
                </Button>
                <Button sx={{ marginRight: "10px" }} variant="contained" color="secondary">
                  Sign Up
                </Button>
                <a href="https://buy.stripe.com/test_3cs5m1fAX7hF8P6144" style={{ textDecoration: 'none' }}> <Button sx={{ marginRight: "10px" }} variant="contained" color="secondary"> Subscribe
                </Button> </a>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;

import React, { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import DrawerComp from "./DrawerComp";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GOODGAMEORG
            </Typography>
          </Link>
          {isMatch ? (
            <DrawerComp />
          ) : (
            <>
              <Box
                sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
              >
                <Button
                  sx={{ marginRight: "10px" }}
                  variant="contained"
                  color="secondary"
                >
                  <Link to="/Tournament">Tournaments</Link>{" "}
                </Button>
                <Button
                  sx={{ marginRight: "10px" }}
                  variant="contained"
                  color="secondary"
                >
                  <Link to="/CreateLeague">Leagues</Link>{" "}
                </Button>
              </Box>
              <Box
                sx={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  sx={{ marginRight: "10px" }}
                  variant="contained"
                  color="secondary"
                >
                  <Link to=""> Login</Link>{" "}
                </Button>
                <Button
                  sx={{ marginRight: "10px" }}
                  variant="contained"
                  color="secondary"
                >
                  <Link to=""> Register</Link>{" "}
                </Button>
                <Button
                  sx={{ marginRight: "10px" }}
                  variant="contained"
                  color="secondary"
                >
                  {" "}
                  <a
                    href="https://buy.stripe.com/test_3cs5m1fAX7hF8P6144"
                    style={{ textDecoration: "none" }}
                  >
                    Subscribe{" "}
                  </a>
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;

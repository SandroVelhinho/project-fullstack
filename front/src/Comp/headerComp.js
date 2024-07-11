import { AppBar, Button, Stack, IconButton, Badge } from "@mui/material";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { Login } from "./Login";
import { useEffect, useState } from "react";

export function Header({
  firebaseName,
  firebaseLname,
  setFirebaseName,
  cartIds,
}) {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    console.log(firebaseName);
  }, [firebaseName, firebaseLname]);
  useEffect(() => {
    setAmount(0);
    for (let i in cartIds) {
      setAmount((a) => a + 1);
    }
  }, [cartIds]);

  return (
    <div style={{ display: "block" }}>
      <AppBar position="static">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <Stack direction={"row"} spacing={3}>
            <h3>Marketplace</h3>
            <Button
              variant="text"
              style={{ color: "white" }}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </Stack>

          {firebaseName ? (
            <Stack direction={"row"} alignItems="center">
              <Stack direction="row" spacing={2}>
                <Badge badgeContent={amount}>
                  <IconButton onClick={() => navigate("/cart")}>
                    <ShoppingCartOutlinedIcon
                      style={{ color: "white" }}
                      fontSize="medium"
                    />
                  </IconButton>
                </Badge>
                <Button
                  variant="text"
                  style={{ color: "white" }}
                  onClick={() => navigate("/update-user-details")}
                >
                  User-Details
                </Button>
                <span
                  className="satisfy-regular"
                  style={{ fontSize: "large", marginTop: "2%" }}
                >
                  Hello {firebaseName} {firebaseLname}
                </span>
              </Stack>
              <div style={{ position: "relative" }}>
                <IconButton
                  onClick={() => {
                    setFirebaseName("");
                  }}
                >
                  <LogoutIcon style={{ color: "white" }} />
                </IconButton>
              </div>
            </Stack>
          ) : (
            <Button
              variant="text"
              style={{ color: "white" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Stack>
      </AppBar>
    </div>
  );
}

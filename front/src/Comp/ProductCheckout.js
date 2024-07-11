import { useParams } from "react-router-dom";
import { products } from "../products";
import {
  Grid,
  Box,
  Container,
  Divider,
  Chip,
  Paper,
  Stack,
  Button,
  IconButton,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CardComp } from "./CardComp";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";

export function ProductCheckout() {
  const { id } = useParams();
  const product = products.find((prod) => prod.id === id);
  const [validationError, setValidationError] = useState(false);
  const [counter, setCounter] = useState(1);
  const [total, setTotal] = useState(product.preço);

  if (validationError === true) {
    setTimeout(() => {
      setValidationError(false);
    }, 3000);
  }

  return (
    <div>
      <h2 style={{ marginTop: "5%", textAlign: "center" }}>
        {" "}
        {product.nome} Checkout.{" "}
      </h2>
      <Divider />
      <Container maxWidth="md">
        <Paper elevation={5} style={{ height: "30%", padding: "1%" }}>
          <Stack direction={"row"} spacing={45}>
            <div>
              <Stack direction={"row"}>
              <Chip
                label={<b style={{ fontSize: "150%" }}> {product.nome}</b>}
                variant="outlined"
                sx={{
                  width: "100%",
                  height: "30px",
                  fontSize: "16px",
                  borderRadius: "20px",
                }}
              />
              <Chip
                label={<b style={{ fontSize: "120%" }}> {product.preço} $</b>}
              /></Stack>
            </div>
            <div>
              <Stack
                direction={"row"}
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
                
              >
                <IconButton
                  onClick={() => {
                    setCounter((a) => a + 1);
                    setTotal((a) => a + product.preço);
                  }}
                >
                  <>+</>
                </IconButton>
                <Chip
                  label={
                    <p>
                      Amount: <b style={{ fontSize: "120%" }}> {counter} </b>
                    </p>
                  }
                ></Chip>
                <IconButton
                  onClick={() => {
                    setCounter((a) => a - 1);
                    setTotal((a) => a - product.preço);
                  }}
                >
                  <>-</>
                </IconButton>
              </Stack>
            </div>
          </Stack>

          <Divider />
          <Stack
            direction={"row"}
            spacing={4}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <p
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              Total:
            </p>
            <Chip
              label={
                <b style={{ fontSize: "120%" }}>
                  {" "}
                  {parseFloat(total).toFixed(2)} $
                </b>
              }
            ></Chip>
          </Stack>
        </Paper>
        <CardComp setValidationError={setValidationError} />
      </Container>

      {validationError && (
        <Alert
          severity="error"
          onClose={() => {}}
          style={{ width: "30%", bottom: "2%", position: "absolute" }}
          icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
        >
          Be sure if any camp is empy
        </Alert>
      )}
    </div>
  );
}

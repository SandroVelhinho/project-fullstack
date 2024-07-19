import { useParams } from "react-router-dom";

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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CardComp } from "./CardComp";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";

export function ProductCheckout() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [validationError, setValidationError] = useState(false);
  const [counter, setCounter] = useState(1);
  const [total, setTotal] = useState("");
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/product/getaproduct",
          { id: id }
        );
        console.log(response.data);
        setProduct(response.data);
        setTotal(response.data.price);
        setTrigger(true);
      } catch (e) {
        return <div style={{ marginTop: "15%" }}>Product not found.</div>;
      }
    };
    getProduct();
  }, []);

  if (validationError === true) {
    setTimeout(() => {
      setValidationError(false);
    }, 3000);
  }

  return (
    <div>
      {trigger ? (
        <>
          <h2 style={{ marginTop: "5%", textAlign: "center" }}>
            {product.name} Checkout.
          </h2>
          <Divider />
          <Container maxWidth="md">
            <Paper elevation={5} style={{ height: "30%", padding: "1%" }}>
              <Stack direction={"row"} spacing={45}>
                <div>
                  <Stack direction={"row"}>
                    <Chip
                      label={
                        <b style={{ fontSize: "150%" }}> {product.name}</b>
                      }
                      variant="outlined"
                      sx={{
                        width: "100%",
                        height: "30px",
                        fontSize: "16px",
                        borderRadius: "20px",
                      }}
                    />
                    <Chip
                      label={
                        <b style={{ fontSize: "120%" }}> {product.price} $</b>
                      }
                    />
                  </Stack>
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
                        setTotal((a) => a + product.price);
                      }}
                    >
                      <>+</>
                    </IconButton>
                    <Chip
                      label={
                        <p>
                          Amount:{" "}
                          <b style={{ fontSize: "120%" }}> {counter} </b>
                        </p>
                      }
                    />
                    <IconButton
                      onClick={() => {
                        setCounter((a) => a - 1);
                        setTotal((a) => a - product.price);
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
                      {parseFloat(total).toFixed(2)} $
                    </b>
                  }
                />
              </Stack>
            </Paper>
            <CardComp
              product={product}
              setValidationError={setValidationError}
            />
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
        </>
      ) : (
        <Backdrop open={true}>
          <CircularProgress
            color="inherit"
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          />
        </Backdrop>
      )}
    </div>
  );
}

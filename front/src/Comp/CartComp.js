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

export function CartComp({ cartIds }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    cartIds.forEach((cartId) => {
      const prodFound = products.find((prod) => prod.id === cartId);
      if (prodFound) {
        totalPrice += prodFound.preço;
      }
    });
    setTotal(totalPrice);
  }, [cartIds]);

  return (
    <>
      <h2 style={{ marginTop: "5%", textAlign: "center" }}>Cart-page</h2>
      <Container maxWidth="md">
        <Stack spacing={4}>
          {cartIds.length > 0 ? (
            cartIds.map((cartId) => {
              const prod = products.find((prod) => prod.id === cartId);
              if (!prod) return null;
              return (
                <Paper
                  key={prod.id}
                  elevation={10}
                  style={{ height: "100%", position: "relative" }}
                >
                  <Stack direction={"row"} alignItems="center" spacing={2}>
                    <span>{prod.nome}</span>
                    <img
                      src={require(`${prod.img}`)}
                      alt="Imagem não encontrada"
                      style={{
                        border: "solid 2px black",
                        height: "auto",
                        maxWidth: "20%",
                        maxHeight: "20%",
                      }}
                    />
                    <Divider orientation="vertical" flexItem />
                    <Button
                      onClick={() => {
                        setTotal((a) => a - prod.preço);
                      }}
                    >
                      -
                    </Button>
                    <span>Quantity</span>
                    <Button
                      onClick={() => {
                        setTotal((a) => a + prod.preço);
                      }}
                    >
                      +
                    </Button>
                  </Stack>
                </Paper>
              );
            })
          ) : (
            <Alert severity="info">No products found</Alert>
          )}
          <span>Total: {total}</span>
        </Stack>
      </Container>
    </>
  );
}

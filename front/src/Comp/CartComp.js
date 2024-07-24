import { Container, Divider, Paper, Stack, Button, Alert } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";

export function CartComp({ cartIds }) {
  const [total, setTotal] = useState(0);
  const [cartProduct, setCartProduct] = useState([]);
  const [amount, setAmount] = useState({});

  useEffect(() => {
    const getProductsApi = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/product/getbasedarray",
          { array: cartIds }
        );
        console.log(response);

        if (Array.isArray(response.data)) {
          let amountArray = response.data.map((obj) => ({ ...obj, amount: 1 }));
          setAmount(amountArray);
          setCartProduct(response.data);
        } else {
          console.log("response.data is not an array: ", response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getProductsApi();
  }, []);

  return (
    <>
      <h2 style={{ marginTop: "5%", textAlign: "center" }}>Cart-page</h2>
      <Container maxWidth="md">
        <Stack spacing={4}>
          {cartProduct.length > 0 ? (
            cartProduct.map((prod) => {
              return (
                <Paper
                  key={prod._id}
                  elevation={10}
                  style={{ height: "100%", position: "relative" }}
                >
                  <Stack direction={"row"} alignItems="center" spacing={2}>
                    <span style={{ marginLeft: "2%" }}>{prod.name}</span>
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
                        setTotal((a) => a - prod.price);
                      }}
                    >
                      -
                    </Button>
                    <span>Quantity</span>
                    <Button
                      onClick={() => {
                        setTotal((a) => a + prod.price);
                      }}
                    >
                      +
                    </Button>
                    <Divider orientation="vertical" flexItem />
         
                    <span style={{ marginLeft: "2%" }}></span>
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

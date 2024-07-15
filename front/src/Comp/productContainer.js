import { Grid, Paper, Divider, Stack, Box, Chip, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { products } from "../products";
import axios from "axios";

export function ProductContainer({ filtro, setCartIds, cartIds }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(async () => {
    try {
      const response = await axios.post("http://localhost:3001/product/get", {
        category: filtro,
      });
      //FIXME - products.filter is not a function
      setProducts(response);
    } catch (e) {
      console.log(e);
    }
  }, [filtro]);

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <h2 style={{ marginTop: "5%", textAlign: "center" }}>Home</h2>
      <Divider />
      <Grid container spacing={3}>
        {products &&
          products
            .filter((prod) => prod.category.includes(filtro))
            .map((prod) => {
              return (
                <Grid item xs={6} key={prod._id}>
                  <Paper
                    elevation={15}
                    style={{ height: "100%", position: "relative" }}
                  >
                    <Box
                      style={{
                        margin: "5px",
                        textAlign: "center",
                        paddingBottom: "50px",
                      }}
                    >
                      <h3>{prod.name}</h3>
                      <img
                        src={require(`${prod.img}`)}
                        alt="Imagem não encontrada"
                        style={{
                          border: "solid 2px  black",
                          height: "auto",
                          maxWidth: "70%",
                          maxHeight: "50%",
                        }}
                      ></img>
                      <p style={{ width: "80%", margin: "auto" }}>
                        {" "}
                        {prod.description}{" "}
                      </p>
                      <a
                        onClick={() => navigate(`/products/${prod._id}`)}
                        href="#"
                      >
                        see details
                      </a>
                    </Box>
                    <Box
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Stack
                          direction={"row"}
                          spacing={2}
                          divider={<Divider orientation="vertical" flexItem />}
                        >
                          <span>
                            {" "}
                            <b> {prod.price}$</b>
                          </span>{" "}
                          <span>{prod.category} </span>{" "}
                          <Button
                            onClick={() => {
                              setCartIds([...cartIds, prod._id]);
                              console.log(cartIds);
                            }}
                            size="small"
                            variant="contained"
                          >
                            Add-cart
                          </Button>
                        </Stack>
                      </div>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
      </Grid>
    </div>
  );
}

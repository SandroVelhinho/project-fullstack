import {
  Grid,
  Paper,
  Divider,
  Stack,
  Box,
  Chip,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export function ProductContainer({ filtro, setCartIds, cartIds }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productsTrigger, setProductsTrigger] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const isAdmin = async () => {
      try {
        const localStorageToken = localStorage.getItem("token");
        //NOTE - continuar a fazer a parte de admin
        const response = await axios.post(
          "http://localhost:3001/user/isadmin",
          { token: localStorageToken }
        );
      } catch (e) {
        console.log("front end cathed : ", e);
      }
    };
    isAdmin();
  }, []);

  useEffect(() => {
    console.log("filtro changed : ", filtro);
    const getProductsApi = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/product/get",
          {}
        );

        if (Array.isArray(response.data)) {
          setProducts(response.data);
          console.log(products);
        } else {
          console.log("response.data is not an array: ", response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getProductsApi();
  }, [filtro]);

  useEffect(() => {
    if (products.length > 0) {
      setProductsTrigger(true);
    } else {
      setProductsTrigger(false);
    }
  }, [products]);

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <h2 style={{ marginTop: "5%", textAlign: "center" }}>Home</h2>
      <Divider />
      <Grid container spacing={3}>
        {products.length > 0 ? (
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
                        src={require(`${
                          prod.img ? prod.img : "./productimage/notfound.jpg"
                        }`)}
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
            })
        ) : (
          <Backdrop>
            <CircularProgress
              color="inherit"
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            />
          </Backdrop>
        )}
      </Grid>
    </div>
  );
}

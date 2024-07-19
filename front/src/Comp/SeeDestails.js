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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SeeDetails({ firebaseName, setLoginFirstAlert }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
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
        setTrigger(true);
      } catch (e) {
        return <div style={{ marginTop: "15%" }}>Product not found.</div>;
      }
    };
    getProduct();
  }, []);

  const loginVerify = () => {
    if (firebaseName) {
      navigate(`/checkout/${product._id}`);
    } else {
      setLoginFirstAlert(true);
      navigate("/login");
    }
  };

  return (
    <>
      {" "}
      {trigger ? (
        <Container maxWidth="md">
          <div>
            <h2 style={{ marginTop: "5%", textAlign: "center" }}>
              {" "}
              Details-Page{" "}
            </h2>
            <Divider />
            <Container maxWidth="md" style={{ marginTop: "2%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper elevation={20}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <h2>{product.name}</h2>
                      </div>
                      <Divider />
                      <Grid container spacing={2}>
                        <Grid item xs={9}>
                          <img
                            src={require(`${
                              product.img
                                ? product.img
                                : "./productimage/notfound.jpg"
                            }`)}
                            alt="Imagem não encontrada"
                            style={{
                              border: "solid 2px black",
                              maxWidth: "40%",
                              height: "auto",
                            }}
                          ></img>
                        </Grid>
                        <Grid item xs={3}>
                          <div>
                            <h5 style={{ fontSize: "large" }}>
                              {product.description}
                            </h5>
                            <Divider />
                            <Chip
                              label={<b> {product.category}</b>}
                              sx={{
                                width: "150px",
                                height: "30px",
                                fontSize: "16px",
                                borderRadius: "20px",
                              }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Paper>
                    <Paper
                      elevation={20}
                      style={{
                        padding: "1px",
                        marginTop: "5%",
                        marginBottom: "5%",
                      }}
                    >
                      <p style={{ textIndent: "3%" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. <br />{" "}
                        <p>
                          {" "}
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est
                          laborum.
                        </p>
                      </p>
                    </Paper>
                    <Paper elevation={20}>
                      <Stack
                        direction={"row"}
                        spacing={2}
                        divider={<Divider orientation="vertical" flexItem />}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                          }}
                        >
                          {" "}
                          <b>{product.price}$ </b>{" "}
                        </div>
                        <Button onClick={loginVerify}>Buy</Button>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </div>
        </Container>
      ) : (
        <Backdrop open={true}>
          <CircularProgress
            color="inherit"
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          />
        </Backdrop>
      )}
    </>
  );
}

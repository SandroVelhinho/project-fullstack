import { useParams } from "react-router-dom";

import {
  Container,
  Divider,
  Paper,
  LinearProgress,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";

export function FinalComp() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
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

  setInterval(() => {
    setProgress((a) => a + 20);
  }, 2000);

  if (progress > 100) {
    navigate("/");
  }

  return (
    <div>
      {trigger ? (
        <div>
          <h2 style={{ marginTop: "5%", textAlign: "center" }}> Thank you. </h2>
          <h2 style={{ textAlign: "center" }}>
            ____________________________________________________________________________________
          </h2>
          <LinearProgress variant="determinate" value={progress} />
          <Container maxWidth="md">
            <Paper style={{ height: "50%", width: "50%" }}>
              <p>
                <b>Product:</b> {product.name}
              </p>
              <Divider />
              <p>
                <i>We bet you will love your {product.name}</i>
              </p>
            </Paper>
          </Container>
        </div>
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

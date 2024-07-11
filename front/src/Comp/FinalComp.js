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
  LinearProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CardComp } from "./CardComp";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";

export function FinalComp() {
    const { id } = useParams();
  const product = products.find((prod) => prod.id === id);
  const [progress, setProgress] = useState(0)
const navigate = useNavigate()
  setInterval(() => {
setProgress(a => a + 20)
  },2000)

  if(progress > 100) {
    navigate("/")
  }

  return (
    <div>
      <h2 style={{ marginTop: "5%", textAlign: "center" }}>
        {" "}
        Thank you.{" "}
      </h2>
      <h2 style={{ textAlign: "center" }}>
        ____________________________________________________________________________________
      </h2>
      <LinearProgress variant="determinate" value={progress} />
      <Container maxWidth="md" >
        <Paper style={{height:"50%", width:"50%"}}>
            <p> <b>Product:</b>{product.nome} </p>
            <Divider/>
            <p> <i>We bet you will love your {product.nome} </i> </p>
            
        </Paper>
      </Container>
    </div>
  );
}

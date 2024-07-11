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
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function CardComp({ setValidationError }) {
  const { id } = useParams();
  const product = products.find((prod) => prod.id === id);
  const navigate = useNavigate();
  const [cardFrom, setCardForm] = useState({
    form1: "",
    form2: "",
    form3: "",
    form4: "",
  });

  const onSubmit = () => {
    if (cardFrom.form1 && cardFrom.form2 && cardFrom.form3 && cardFrom.form4) {
      navigate(`/final/${product.id}`);
    } else {
      setValidationError(true);
    }
  };

  return (
    <Container>
      <h3 style={{ marginTop: "5%", textAlign: "center" }}>Card Info</h3>
      <Divider />
      <form>
        <Paper elevation={10} style={{ marginLeft: "10%", marginRight: "10%" }}>
          <div>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <TextField
                id="filled-basic"
                label="Card Number"
                variant="filled"
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginLeft: "4%",
                  width: "50%",
                }}
                type="number"
                onChange={(e) =>
                  setCardForm({ ...cardFrom, form1: e.target.value })
                }
              />
              <TextField
                id="filled-basic"
              
                variant="filled"
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginRight: "4%",
                  width: "50%",
                }}
                type="date"
                onChange={(e) =>
                  setCardForm({ ...cardFrom, form2: e.target.value })
                }
              />
            </Stack>
          </div>
          <Divider />
          <div>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <TextField
                id="filled-basic"
                label="Verification Code"
                variant="filled"
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginLeft: "4%",
                  width: "50%",
                }}
                type="number"
                onChange={(e) =>
                  setCardForm({ ...cardFrom, form3: e.target.value })
                }
              />
              <TextField
                id="filled-basic"
                label="Card Name"
                variant="filled"
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginRight: "4%",
                  width: "50%",
                }}
                onChange={(e) =>
                  setCardForm({ ...cardFrom, form4: e.target.value })
                }
              />
            </Stack>
          </div>

          <Divider />

          <Button
            variant="contained"
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              width: "50%",
              display: "flex",
              justifyContent: "center",
              marginLeft: "25%", 
            }}
            onClick={onSubmit}
          >
            Pay
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

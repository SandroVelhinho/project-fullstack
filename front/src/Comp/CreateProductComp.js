import { useState } from "react";
import {
  Paper,
  Divider,
  TextField,
  Button,
  Stack,
  Alert,
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import axios from "axios";

export function CreateProduct() {
  const [newProduct, setNewProduuct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [alert, setAlert] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);
  if (alert || sucess) {
    setTimeout(() => {
      setAlert(false);
      setSucess(false);
    }, 5000);
  }

  const onSubmit = () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.category
    ) {
      return setAlert(
        "Something wrong... Make sure you don't leave any blank spaces."
      );
    }

    const addProductApi = async () => {
      try {
        const token = localStorage.getItem("token423412345763456765");
        setLoading(true);
        const response = await axios.post("http://localhost:3001/product/add", {
          token: token,
          newproduct: newProduct,
        });
        if (response.data === true) {
          setSucess(true);
          setLoading(false);
        }
      } catch (e) {
        console.log("add new product catched:", e);
        setLoading(false);
        setAlert("not an admin");
      }
    };

    addProductApi();
  };

  return (
    <>
      <h2 style={{ marginTop: "5%", textAlign: "center" }}>
        Add new product to marketplace
      </h2>
      <Divider />
      <form style={{ marginTop: "1%" }}>
        <Paper elevation={10} style={{ marginLeft: "10%", marginRight: "10%" }}>
          <div>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <TextField
                id="filled-basic"
                label="name"
                variant="filled"
                onChange={(e) =>
                  setNewProduuct({ ...newProduct, name: e.target.value })
                }
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginLeft: "4%",
                  width: "50%",
                }}
                type="email"
              />
              <TextField
                id="filled-basic"
                label="Price"
                variant="filled"
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginRight: "4%",
                  width: "50%",
                }}
                onChange={(e) =>
                  setNewProduuct({ ...newProduct, price: e.target.value })
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
                label="description"
                variant="filled"
                onChange={(e) =>
                  setNewProduuct({ ...newProduct, description: e.target.value })
                }
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginLeft: "4%",
                  width: "50%",
                }}
              />
              <FormControl
                variant="filled"
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginLeft: "4%",
                  width: "50%",
                }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => {
                    setNewProduuct({ ...newProduct, category: e.target.value });
                  }}
                  label="Category"
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Leisure">Leisure</MenuItem>
                  <MenuItem value="Footwear">Footwear</MenuItem>
                  <MenuItem value="Apparel">Apparel</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </div>
          <Divider />

          <Button
            variant="contained"
            onClick={onSubmit}
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              marginLeft: "4%",
              width: "50%",
            }}
          >
            Add product
          </Button>
        </Paper>
      </form>
      {alert && (
        <Alert
          severity="error"
          onClose={() => {}}
          style={{ width: "30%", bottom: "2%", position: "absolute" }}
          icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
        >
          {alert}
        </Alert>
      )}
      {sucess && (
        <Alert
          severity="success"
          onClose={() => {}}
          style={{ width: "30%", bottom: "2%", position: "absolute" }}
          icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
        >
          New product added!
        </Alert>
      )}
      <Backdrop open={loading}>
        <CircularProgress
          color="inherit"
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        />
      </Backdrop>
    </>
  );
}

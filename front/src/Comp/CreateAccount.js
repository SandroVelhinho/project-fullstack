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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import axios from "axios";

export function CreateAccount({ setSucessSingin }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
    lastname: "",
    age: "",
  });
  const [error, setError] = useState(false);
  const [errorStringArray, setErrorStringArray] = useState([]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //TODO - substituir todos estes tratamentos de error por apenas um ou dois, e la em baixo tbm
  if (errorStringArray.length > 0) {
    setTimeout(() => {
      setError(true);
    }, 500);
  }
  if (error) {
    setTimeout(() => {
      setError(false);
      setErrorStringArray([]);
    }, 5000);
  }

  const createUserBack = async () => {
    setErrorStringArray([]);
    setLoading(true);
    const body = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: String(user.password),
      confirmpassword: String(user.confirmpassword),
      age: user.age,
    };

    try {
      const res = await axios.post("http://localhost:3001/user/signin", body);
      console.log("res.data : ", res.data);

      if (res.data === true) {
        setLoading(false);
        navigate("/login");
        setSucessSingin(true);
      }
    } catch (e) {
      setLoading(false);
      setErrorStringArray(e.response.data);

      console.log("catched", e.response.data);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserBack();
  };

  return (
    <div>
      <h2 style={{ marginTop: "5%", textAlign: "center" }}>Create Account</h2>
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
                label="Email"
                variant="filled"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                label="First Name"
                variant="filled"
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginRight: "4%",
                  width: "50%",
                }}
                onChange={(e) =>
                  setUser({ ...user, name: e.target.value, verify: true })
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
                label="Passowrd"
                variant="filled"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginLeft: "4%",
                  width: "50%",
                }}
                type="password"
              />
              <TextField
                id="filled-basic"
                label="Last Name"
                variant="filled"
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginRight: "4%",
                  width: "50%",
                }}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
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
                label="Confirm Password"
                variant="filled"
                onChange={(e) =>
                  setUser({ ...user, confirmpassword: e.target.value })
                }
                type="password"
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginLeft: "4%",
                  width: "50%",
                }}
              />
              <TextField
                id="filled-basic"
                label="Age"
                placeholder="At least 18 years old"
                variant="filled"
                style={{
                  marginBottom: "1%",
                  marginTop: "1%",
                  marginRight: "4%",
                  width: "50%",
                }}
                type="number"
                inputProps={{ min: 18, max: 120 }}
                onChange={(e) => setUser({ ...user, age: e.target.value })}
              />
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
            Create account
          </Button>
        </Paper>
      </form>
      <Stack spacing={2}>
        {error &&
          errorStringArray.map((a) => (
            <Alert
              key={a}
              severity="error"
              onClose={() => {}}
              style={{ width: "30%", bottom: "3%", position: "relative" }}
              icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
            >
              {a}
            </Alert>
          ))}
      </Stack>
      <Backdrop open={loading}>
        <CircularProgress
          color="inherit"
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        />
      </Backdrop>
    </div>
  );
}

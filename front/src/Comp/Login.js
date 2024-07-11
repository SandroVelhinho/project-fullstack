import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
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
import CheckIcon from "@mui/icons-material/Check";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export function Login({
  setFirebaseName,
  setFirebaseLname,
  loginFirstAlert,
  sucessSingin,
  setSucessSingin,
}) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (success === true) {
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }
  if (error === true) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }
  if (sucessSingin === true) {
    setTimeout(() => {
      setSucessSingin(false);
    }, 3000);
  }

  const findUserByEmail = async (email) => {
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setFirebaseName(userData.name);
        setFirebaseLname(userData.lname);
      } else {
        setFirebaseName("");
        setFirebaseLname("");
        console.log("Usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao procurar usuário:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        setSuccess(true);
        setLoading(false);
        findUserByEmail(email);
        navigate(-1);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div style={{ marginTop: "4%" }}>
      <h2 style={{ marginTop: "5%", textAlign: "center" }}>Login-page</h2>
      <Divider />
      {loginFirstAlert && (
        <Alert
          severity="error"
          onClose={() => {}}
          style={{ width: "30%", bottom: "2%", position: "absolute" }}
          icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
        >
          Please login first.
        </Alert>
      )}
      <form style={{ marginTop: "1%" }}>
        <Paper elevation={10} style={{ marginLeft: "10%", marginRight: "10%" }}>
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              marginLeft: "4%",
              width: "50%",
            }}
            type="email"
          />
          <Divider />
          <TextField
            id="filled-basic"
            label="Passowrd"
            variant="filled"
            onChange={(e) => setPass(e.target.value)}
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              marginLeft: "4%",
              width: "50%",
            }}
            type="password"
          />
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
            Login
          </Button>

          <Divider />
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Stack>
              <span>
                If you dont have an account click{" "}
                <Button
                  variant="outlined"
                  onClick={() => navigate("/create-account")}
                >
                  here
                </Button>
              </span>
            </Stack>
          </div>
        </Paper>
      </form>

      <Backdrop open={loading}>
        <CircularProgress
          color="inherit"
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        />
      </Backdrop>

      {success && (
        <Alert
          severity="success"
          onClose={() => {}}
          style={{ width: "30%", bottom: "2%", position: "absolute" }}
          icon={<CheckIcon fontSize="inherit" />}
        >
          You are logged in c:
        </Alert>
      )}
      {sucessSingin && (
        <Alert
          severity="success"
          onClose={() => {}}
          style={{ width: "30%", bottom: "2%", position: "absolute" }}
          icon={<CheckIcon fontSize="inherit" />}
        >
          Account created! Please log-in.
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          onClose={() => {}}
          style={{ width: "30%", bottom: "2%", position: "absolute" }}
          icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
        >
          Login failed :c
        </Alert>
      )}
    </div>
  );
}

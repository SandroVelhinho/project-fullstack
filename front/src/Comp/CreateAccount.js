import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
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
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import CheckIcon from "@mui/icons-material/Check";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import axios from "axios";
import isEmail from "validator/lib/isEmail";
export function CreateAccount({ setSucessSingin }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [name, setName] = useState({ name: "", verify: false });
  const [lname, setLname] = useState({ lname: "", verify: false });
  const [age, setAge] = useState({ age: "", verify: false });
  const [passAlert, setPassAlert] = useState(false);
  const [nameAlert, setNameAlert] = useState(false);
  const [ageAlert, setAgeAlert] = useState(false);
  const [passRegex, setPassRegex] = useState(false);
  const navigate = useNavigate();
  const usersRef = collection(db, "users");
  const [loading, setLoading] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [duplicatedEmail, setDuplaicatedEmail] = useState(false);
 //TODO - substituir todos estes tratamentos de error por apenas um ou dois, e la em baixo tbm
  if (passAlert === true) {
    setTimeout(() => {
      setPassAlert(false);
    }, 3000);
  }
  if (passRegex === true) {
    setTimeout(() => {
      setPassRegex(false);
    }, 3000);
  }
  if (nameAlert === true) {
    setTimeout(() => {
      setNameAlert(false);
    }, 3000);
  }
  if (ageAlert === true) {
    setTimeout(() => {
      setAgeAlert(false);
    }, 3000);
  }
  const createUserBack = async () => {
    console.log("ativou");
    const newUser = {
      name: name.name,
      lastname: lname.lname,
      email: user.email,
      password: user.password,
      age: age.age,
    };
    try {
      const res = await axios.post(
        "http://localhost:3001/user/signin",
        newUser
      );
      console.log("res.data : ", res.data);

      if (res.data === true) {
        navigate("/login");
        setSucessSingin(true);
      }
    } catch (e) {
      if (e.response.data.error === "Duplicated email") {
        setDuplaicatedEmail(true);
      }
      console.log("catched", e.response.data);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;

    if (
      isEmail(user.email) &&
      user.password === user.confirmpassword &&
      name.name !== "" &&
      lname.lname !== "" &&
      age.age !== "" &&
      passwordRegex.test(user.password)
    ) {
      await createUserBack();

      /*await addDoc(usersRef, {
        name: name.name,
        lname: lname.lname,
        email: user.email,
      })
        .then((resp) => console.log(resp))
        .catch(console.error);

      await createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(() => {
          navigate("/login");
          setSucessSingin(true);
        })
        .catch(() => console.log("Something wrong")); */
    } else {
      if (user.password !== user.confirmpassword) {
        setPassAlert(true);
      } else if (name.name === "" || lname.lname === "") {
        setNameAlert(true);
      } else if (age.age === "") {
        setAgeAlert(true);
      } else if (!passwordRegex.test(user.password)) {
        setPassRegex(true);
      } else if (!isEmail(user.email)) {
        setEmailAlert(true);
      }
    }
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
                  setName({ name: e.target.value, verify: true })
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
                onChange={(e) =>
                  setLname({ lname: e.target.value, verify: true })
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
                onChange={(e) => setAge({ age: e.target.value, verify: true })}
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
        {emailAlert && (
          <Alert
            severity="error"
            onClose={() => {}}
            style={{ width: "30%", bottom: "2%", position: "absolute" }}
            icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
          >
            You need to write a valid email.
          </Alert>
        )}
        {duplicatedEmail && (
          <Alert
            severity="error"
            onClose={() => {}}
            style={{ width: "30%", bottom: "2%", position: "absolute" }}
            icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
          >
            This email is already in use.
          </Alert>
        )}
        {nameAlert && (
          <Alert
            severity="error"
            onClose={() => {}}
            style={{ width: "30%", bottom: "2%", position: "absolute" }}
            icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
          >
            You need to write your full name.
          </Alert>
        )}
        {ageAlert && (
          <Alert
            severity="error"
            onClose={() => {}}
            style={{ width: "30%", bottom: "2%", position: "absolute" }}
            icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
          >
            You need to write your age.
          </Alert>
        )}
        {passAlert && (
          <Alert
            severity="error"
            onClose={() => {}}
            style={{ width: "30%", bottom: "2%", position: "absolute" }}
            icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
          >
            You need to confirm your password.
          </Alert>
        )}
        {passRegex && (
          <Alert
            severity="error"
            onClose={() => {}}
            style={{ width: "30%", bottom: "2%", position: "absolute" }}
            icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
          >
            Your password need to have "Numbers, Letters and Characters"
          </Alert>
        )}
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

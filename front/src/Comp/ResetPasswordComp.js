import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import axios from "axios";

export function ResetPasswordComp() {
  const [feedback, setFeedback] = useState(false);
  const [password, setPassword] = useState({
    newpassword: "",
    newconfirmpassword: "",
    oldpassword: "",
    token: "",
  });
  const [checkMail, setCheckMail] = useState(true);

  useEffect(() => {
    setCheckMail(true);
    setTimeout(() => {
      setCheckMail(false);
    }, 5000);
  }, []);

  if (feedback) {
    setTimeout(() => {
      setFeedback(false);
    }, 3000);
  }

  const onSubmit = async () => {
    try {
      const localStorageToken = localStorage.getItem("token423412345763456765");

      const token = await axios.post("http://localhost:3001/user/isadmin", {
        token: localStorageToken,
      });
      if (!password.token) {
        return setFeedback("Missing Code");
      }
      if (password.newpassword !== password.newconfirmpassword) {
        return setFeedback("please confirm your new password");
      }
      const email = token.data.decodedtoken.userEmail;
      console.log("email", email);

      const response = await axios.post(
        "http://localhost:3001/user/resetpassword",
        {
          email: email,
          token: password.token,
          oldpassword: password.oldpassword,
          newpassword: password.newpassword,
        }
      );

      console.log(response.data);
      setFeedback(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h2 style={{ marginTop: "5%", textAlign: "center" }}>Reset-Password</h2>
      <form style={{ marginTop: "1%" }}>
        <Paper elevation={10} style={{ marginLeft: "10%", marginRight: "10%" }}>
          <TextField
            id="filled-basic"
            label="Old Password"
            variant="filled"
            onChange={(e) =>
              setPassword({ ...password, oldpassword: e.target.value })
            }
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              marginLeft: "4%",
              width: "50%",
            }}
            type="password"
          />
          <Divider />
          <TextField
            id="filled-basic"
            label="New password"
            variant="filled"
            onChange={(e) =>
              setPassword({ ...password, newpassword: e.target.value })
            }
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              marginLeft: "4%",
              width: "50%",
            }}
            type="password"
          />
          <Divider />
          <TextField
            id="filled-basic"
            label="Confirm new password"
            variant="filled"
            onChange={(e) =>
              setPassword({ ...password, newconfirmpassword: e.target.value })
            }
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              marginLeft: "4%",
              width: "50%",
            }}
            type="password"
          />
          <Divider />
          <TextField
            id="filled-basic"
            label="Email code"
            variant="filled"
            onChange={(e) =>
              setPassword({ ...password, token: e.target.value })
            }
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              marginLeft: "4%",
              width: "50%",
            }}
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
            Submit{" "}
          </Button>
        </Paper>
      </form>
      {checkMail && (
        <Alert
          severity="info"
          onClose={() => {}}
          style={{ width: "30%", bottom: "2%", position: "absolute" }}
          icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
        >
          Please check your email.
        </Alert>
      )}
      {feedback && (
        <Alert
          severity="info"
          onClose={() => {}}
          style={{ width: "30%", bottom: "2%", position: "absolute" }}
          icon={<GppMaybeOutlinedIcon fontSize="inherit" />}
        >
          {feedback}
        </Alert>
      )}
    </>
  );
}

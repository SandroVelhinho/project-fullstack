import {
  Divider,
  Paper,
  Stack,
  Button,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

export function UpdateUserDetails({
  firebaseName,
  firebaseLname,
  setFirebaseName,
  setFirebaseLname,
}) {
  const [name, setName] = useState(firebaseName);
  const [lname, setLname] = useState(firebaseLname);
  const [userDetails, setUserDetails] = useState(false);
  const navigate = useNavigate();
  const [newInfo, setNewInfo] = useState({});
  const [bollean, setBollean] = useState(false);

  const getUserInfo = async (a) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/getuserinfo",
        a
      );

      if (response) {
        console.log("response.data:", response.data);
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const isAdmin = async () => {
      try {
        const localStorageToken = localStorage.getItem(
          "token423412345763456765"
        );

        const response = await axios.post(
          "http://localhost:3001/user/isadmin",
          { token: localStorageToken }
        );

        if (response) {
          console.log(response.data);
          const userInfo = await getUserInfo(response.data);
          setUserDetails(userInfo);
          console.log("userdetails", userDetails);
          setBollean(true);
        }
      } catch (e) {
        console.log("front end cathed : ", e);
      }
    };
    isAdmin();
  }, []);

  const onSubmit = async () => {
    try {
      setBollean(false);
      const response = await axios.post("http://localhost:3001/user/update", {
        currentUser: userDetails,
        newUser: newInfo,
      });
      console.log(response.data);
      setUserDetails(response.data);
      setFirebaseName(response.data.name);
      setFirebaseLname(response.data.lastname);
      setBollean(true);
    } catch (e) {
      setBollean(true);
      console.log(e);
    }
  };

  return (
    <>
      {bollean ? (
        <div style={{ marginTop: "4%" }}>
          <h2 style={{ marginTop: "5%", textAlign: "center" }}>User-Details</h2>
          <Divider />
          <form style={{ marginTop: "1%" }}>
            <Paper
              elevation={10}
              style={{ marginLeft: "10%", marginRight: "10%" }}
            >
              <div>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                >
                  <TextField
                    id="filled-basic"
                    label={userDetails.name}
                    variant="filled"
                    onChange={(e) =>
                      setNewInfo({ ...newInfo, name: e.target.value })
                    }
                    style={{
                      marginBottom: "1%",
                      marginTop: "1%",
                      marginLeft: "4%",
                      width: "50%",
                    }}
                  />
                  <TextField
                    id="filled-basic"
                    label={userDetails.lastname}
                    variant="filled"
                    style={{
                      marginBottom: "1%",
                      marginTop: "1%",
                      marginRight: "4%",
                      width: "50%",
                    }}
                    onChange={(e) =>
                      setNewInfo({ ...newInfo, lastname: e.target.value })
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
                    label={userDetails.age}
                    variant="filled"
                    onChange={(e) =>
                      setNewInfo({
                        ...newInfo,
                        age: e.target.value,
                      })
                    }
                    style={{
                      marginBottom: "1%",
                      marginTop: "1%",
                      marginLeft: "4%",
                      width: "50%",
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={onSubmit}
                    style={{
                      marginBottom: "1%",
                      marginTop: "1%",
                      marginRight: "4%",
                      width: "50%",
                    }}
                  >
                    Update-User
                  </Button>
                </Stack>
              </div>
              <Divider />
            </Paper>
          </form>
        </div>
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

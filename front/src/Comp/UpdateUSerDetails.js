import { db } from "../firebase";
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
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export function UpdateUserDetails({
  firebaseName,
  firebaseLname,
  setFirebaseName,
  setFirebaseLname,
}) {
  const [name, setName] = useState(firebaseName);
  const [lname, setLname] = useState(firebaseLname);
  const navigate = useNavigate();

  const findUserByName = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("lname", "==", firebaseLname)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          const reference = doc(db, "users", docSnapshot.id);
          await updateDoc(reference, {
            name: name,
            lname: lname,
          });
          console.log("User details updated successfully!");
          setFirebaseName(name);
          setFirebaseLname(lname);
          navigate(-1);
        });
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <div style={{ marginTop: "4%" }}>
      <h2 style={{ marginTop: "5%", textAlign: "center" }}>User-Details</h2>
      <Divider />
      <form style={{ marginTop: "1%" }}>
        <Paper elevation={10} style={{ marginLeft: "10%", marginRight: "10%" }}>
          <TextField
            id="filled-basic"
            label={firebaseName}
            variant="filled"
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              marginLeft: "4%",
              width: "50%",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Divider />
          <TextField
            id="filled-basic"
            label={firebaseLname}
            variant="filled"
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              marginLeft: "4%",
              width: "50%",
            }}
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <Divider />
          <Button
            variant="contained"
            onClick={findUserByName}
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              marginLeft: "4%",
              width: "50%",
            }}
          >
            Update Details
          </Button>
        </Paper>
      </form>
    </div>
  );
}

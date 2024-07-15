import { db, auth } from "./firebase";
import { CreateAccount } from "./Comp/CreateAccount";
import { Login } from "./Comp/Login";
import { Header } from "./Comp/headerComp";
import "./App.css";
import { CssBaseline, Container, Divider } from "@mui/material";
import { ProductContainer } from "./Comp/productContainer";
import { FilterList } from "./Comp/filterList";
import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";

export function HomeComp({ setCartIds, cartIds }) {
  const [filtro, setFiltro] = useState("");

  return (
    <div>
      <div style={{ float: "left", marginTop: "10%", position: "fixed" }}>
        <FilterList setState={setFiltro} />
      </div>

      <Container fixed style={{ marginTop: "2%" }}>
        <ProductContainer
          filtro={filtro}
          setCartIds={setCartIds}
          cartIds={cartIds}
        />
      </Container>
    </div>
  );
}

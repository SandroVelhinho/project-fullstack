import "./App.css";
import { Container } from "@mui/material";
import { ProductContainer } from "./Comp/productContainer";
import { FilterList } from "./Comp/filterList";
import { useState } from "react";

export function HomeComp({ setCartIds, cartIds }) {
  const [filtro, setFiltro] = useState("");
  const [refresh, setRefresh] = useState(1);

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
          setRefresh={setRefresh}
          key={refresh}
        />
      </Container>
    </div>
  );
}

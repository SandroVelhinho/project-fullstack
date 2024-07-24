import { CreateAccount } from "./Comp/CreateAccount";
import { Login } from "./Comp/Login";
import { Header } from "./Comp/headerComp";
import "./App.css";
import { CreateProduct } from "./Comp/CreateProductComp";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomeComp } from "./homeComp";
import { SeeDetails } from "./Comp/SeeDestails";
import { ProductCheckout } from "./Comp/ProductCheckout";
import { FinalComp } from "./Comp/FinalComp";
import { UpdateUserDetails } from "./Comp/UpdateUSerDetails";
import { CartComp } from "./Comp/CartComp";
import { ResetPasswordComp } from "./Comp/ResetPasswordComp";

function App() {
  const [firebaseName, setFirebaseName] = useState("");
  const [firebaseLname, setFirebaseLname] = useState("");
  const [state, setState] = useState("");
  const [loginFirstAlert, setLoginFirstAlert] = useState(false);
  const [sucessSingin, setSucessSingin] = useState(false);
  const [cartIds, setCartIds] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  if (loginFirstAlert === true) {
    setTimeout(() => {
      setLoginFirstAlert(false);
    }, 3000);
  }

  return (
    <div>
      <div>
        <Header
          firebaseName={firebaseName}
          firebaseLname={firebaseLname}
          setFirebaseName={setFirebaseName}
          cartIds={cartIds}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <HomeComp
              setCartIds={setCartIds}
              cartIds={cartIds}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
          }
        />

        <Route
          path="/create-account"
          element={<CreateAccount setSucessSingin={setSucessSingin} />}
        />
        <Route path="/cart" element={<CartComp cartIds={cartIds} />}></Route>
        <Route
          path="/login"
          element={
            <Login
              setFirebaseLname={setFirebaseLname}
              setFirebaseName={setFirebaseName}
              loginFirstAlert={loginFirstAlert}
              sucessSingin={sucessSingin}
              setSucessSingin={setSucessSingin}
            />
          }
        />
        <Route path="/resetpassword" element={<ResetPasswordComp />} />
        <Route path="/final/:id" element={<FinalComp />} />
        <Route
          path="/products/:id"
          element={
            <SeeDetails
              firebaseName={firebaseName}
              setLoginFirstAlert={setLoginFirstAlert}
            />
          }
        />
        <Route path="/checkout/:id" element={<ProductCheckout />} />
        <Route path="/addproduct" element={<CreateProduct />} />

        <Route
          path="/update-user-details"
          element={
            <UpdateUserDetails
              firebaseName={firebaseName}
              firebaseLname={firebaseLname}
              setFirebaseLname={setFirebaseLname}
              setFirebaseName={setFirebaseName}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

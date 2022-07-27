import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";

import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterAdminPage from "./pages/RegisterAdminPage";

import LaptopsList from './pages/LaptopsList';
import AccessoriesList from './pages/AccessoriesList';

import LaptopDetails from "./pages/LaptopDetails";
import AccessoryDetails from "./pages/AccessoryDetails";

import LaptopUpdate from "./pages/LaptopUpdate";
import AccessoryUpdate from "./pages/AccessoryUpdate";

import ProductRepair from "./pages/ProductRepair";

import ApproveRepair from "./pages/ApproveRepair";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Route component={HomePage} path="/" exact />

          <Route component={LoginPage} path="/login" />
          <Route component={RegisterPage} path="/register" />
          <PrivateRoute component={RegisterAdminPage} path="/register-admin" />

          <Route component={LaptopsList} path="/laptops-list" />
          <Route component={AccessoriesList} path="/accessories-list" />

          <PrivateRoute
            component={LaptopDetails}
            path="/laptop/details/:id/"
          />

          <PrivateRoute
            component={AccessoryDetails}
            path="/accessory/details/:id/"
          />

          <PrivateRoute component={LaptopUpdate} path="/laptop/update/:id" />
          <PrivateRoute component={AccessoryUpdate} path="/accessory/update/:id" />

          <PrivateRoute
            component={ProductRepair}
            path="/product/request/repair"
          />

          <PrivateRoute
            component={ApproveRepair}
            path="/product/approve/repair"
          />

        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

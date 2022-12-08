import { Route } from "wouter";
import { config } from "./config";

import { NavBar } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home/index";
import { Products } from "./components/Products";

export function App() {
  return (
    <>
      <NavBar />

      <div className="container my-4 center" style={{ minHeight: "90vh" }}>
        <Route path="/" component={Home} />
        <Route path={config.PRODUCTS_PAGE_PATH} component={Products} />
      </div>

      <Footer />
    </>
  );
}

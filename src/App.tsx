import { Route, Switch } from "wouter";
import { config } from "./config";

import { NavBar } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home/index";
import { Products } from "./components/Products";
import { SearchModal } from "./components/Search/SearchModal";
import { useState } from "react";
import { SingleProduct } from "./components/SingleProduct";

export function App() {
  const [isSearchModalShown, setIsSearchModalShown] = useState(false);

  return (
    <>
      <NavBar onSearchClick={() => setIsSearchModalShown(true)} />
      <SearchModal
        isShown={isSearchModalShown}
        setIsShown={setIsSearchModalShown}
      />

      <div className="container my-4 center" style={{ minHeight: "90vh" }}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/product" component={SingleProduct} />
          <Route path={config.PRODUCTS_PAGE_PATH} component={Products} />
          <Route>
            <h2>404 - Not Found</h2>
          </Route>
        </Switch>
      </div>

      <Footer />
    </>
  );
}

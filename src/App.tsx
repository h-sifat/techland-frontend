import { Footer } from "./components/Footer";
import { NavBar } from "./components/Nav";

export function App() {
  return (
    <>
      <NavBar />

      <div
        className="container my-4 center"
        style={{ minHeight: "90vh" }}
      ></div>

      <Footer />
    </>
  );
}

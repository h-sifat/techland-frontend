import { Link } from "wouter";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { GrTechnology } from "react-icons/gr";

export interface NavBar_Argument {
  onSearchClick?: () => void;
}

export function NavBar(arg: NavBar_Argument) {
  const { onSearchClick = () => console.log("clicked") } = arg;

  const [collapsed, setCollapsed] = useState(true);

  let collapsibleClassNames = "collapse navbar-collapse";
  if (!collapsed) collapsibleClassNames += " show";

  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" href="/">
          <GrTechnology size={"2rem"} /> Techland
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          onClick={() => setCollapsed(!collapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={collapsibleClassNames}>
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <Link href="/products">
                <a className="nav-link active" href="/">
                  Products
                </a>
              </Link>
            </li>
          </ul>

          <FakeSearch onClick={onSearchClick} />
        </div>
      </div>
    </nav>
  );
}

export function FakeSearch({ onClick = () => {} }) {
  return (
    <div className="d-flex" onClick={onClick}>
      <input
        type="search"
        className="form-control me-2"
        placeholder="Click here to search"
      />
      <button className="btn btn-outline-success">
        <BsSearch />
      </button>
    </div>
  );
}

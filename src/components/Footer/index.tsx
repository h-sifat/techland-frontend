import React from "react";
import { BsGithub } from "react-icons/bs";

export function Footer() {
  return (
    <footer className="container-fluid bg-dark p-2 text-center text-light">
      <p className="h3">MongodDB Hackathon 2022</p>
      <p>
        Made by: <span className="fw-bold me-2">h-sifat</span>
        <a
          target="_blank"
          href="https://github.com/h-sifat"
          className="text-decoration-none text-light"
        >
          <BsGithub />
        </a>
      </p>
    </footer>
  );
}

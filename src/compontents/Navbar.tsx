import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../css/navbar.css";

export function Navbar() {
  const [passInput, setPassInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const password = import.meta.env.VITE_PASSWORD;

  useEffect(() => {
    const storedPass = localStorage.getItem("pass");
    if (storedPass) {
      setPassInput(storedPass);
    }
  }, []);

  useEffect(() => {
    if (passInput) {
      localStorage.setItem("pass", passInput);
    }
  }, [passInput]);

  function closeNav() {
    setIsOpen((isOpen) => !isOpen);
  }
  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {passInput === password ? (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/home">
              Home
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleNavbar}
              aria-controls="navbarNav"
              aria-expanded={isOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/august" onClick={closeNav}>
                    August
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/elin" onClick={closeNav}>
                    Elin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ewa" onClick={closeNav}>
                    Ewa
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/jesper" onClick={closeNav}>
                    Jesper
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/kalle" onClick={closeNav}>
                    Kalle
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/liam" onClick={closeNav}>
                    Liam
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/lotten" onClick={closeNav}>
                    Lotten
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/niclas" onClick={closeNav}>
                    Niclas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/nina" onClick={closeNav}>
                    Nina
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container-div">
            <Outlet />
          </div>
        </>
      ) : (
        <div className="login-container">
          <div className="login-inner-container">
            <p>Skriv in lösenordet</p>
            <input
              type="text"
              className="input-pass"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
}

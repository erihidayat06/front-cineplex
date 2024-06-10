import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./NavbarIn.css";

const NavbarIn = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavItemClick = (item) => {
    setActiveItem(item);
  };

  const handleSearchClick = () => {
    setIsSearchClicked((prevState) => !prevState);
  };

  return (
    <div>
      <Navbar
        expand="lg"
        className={`navbar-custom fixed-top ${
          isScrolled ? "navbar-scrolled" : "bg-transparent"
        } mt-0`}
        style={{ paddingTop: "5px" }}>
        <Container>
          <Navbar.Brand href="#home" className="brand-custom">
            <span className="cine">Cine</span>
            <span className="plex">plex+</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end">
            <Nav className="mx-auto">
              <Nav.Link
                href="/#home"
                className={`nav-link-custom ${
                  activeItem === "home" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("home")}
                style={{ color: "white" }}>
                Home
              </Nav.Link>

              <Nav.Link
                href="/#movies"
                className={`nav-link-custom ${
                  activeItem === "movies" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("movies")}
                style={{ color: "white" }}>
                Movies
              </Nav.Link>

              <Nav.Link
                href="/#promotion"
                className={`nav-link-custom ${
                  activeItem === "promotion" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("promotion")}
                style={{ color: "white" }}>
                Promotion
              </Nav.Link>

              <Nav.Link
                href="/#contact"
                className={`nav-link-custom ${
                  activeItem === "contact" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("contact")}
                style={{ color: "white" }}>
                Contact
              </Nav.Link>

              <Nav.Link
                href="#search"
                className={`nav-link-custom ${
                  activeItem === "search" ? "active" : ""
                }`}
                onClick={() => {
                  handleNavItemClick("search");
                  handleSearchClick();
                }}
                style={{ color: "white" }}>
                <i
                  className={`bi bi-search ${
                    isSearchClicked ? "clicked" : ""
                  }`}></i>
              </Nav.Link>
            </Nav>
            <Nav className="align-items-center">
              <FormControl
                type="text"
                placeholder="Search"
                className={`mr-sm-2 search-input ${
                  isSearchClicked ? "expanded" : ""
                }`}
              />
              {isSearchClicked && (
                <Button variant="outline-success" className="search-button">
                  Search
                </Button>
              )}
              <Nav.Link
                className={`nav-link-custom ${
                  activeItem === "profile" ? "active" : ""
                }`}
                onClick={() => {
                  handleNavItemClick("profile");
                  navigate("/MyProfil");
                }}
                style={{ color: "white" }}>
                <i className="bi bi-person"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarIn;

import { useState } from "react";
import littleGuy from '../assets/littleGuy.png'

type NavbarProps = {
  view: "home" | "about" | "signup";
  setView: (view: "home" | "about" | "signup") => void;
};

export default function Navbar({ view, setView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  void view;

  return (
    <div className="w-full flex justify-between items-center px-4 py-2 fixed top-0 left-0 z-50">
      {/* Logo */}
<div className="group inline-flex items-center gap-1 cursor-pointer" onClick={() => setView("home") }>
        <a href="#" aria-label="Go to home" className="group inline-flex items-center gap-1 cursor-pointer logo footer-logo" onClick={(e) => { e.preventDefault(); setView("home") }}>
          <img
            src={littleGuy}
            alt="logo"
            className="w-10 h-10 mr-1 transition transform duration-200 group-hover:scale-105" // preserve size
          />
          <span
            className="font-bold text-4xl transition transform duration-200 ease-out group-hover:scale-105 group-hover:tracking-wider"
            style={{ color: "#8F002D" }}
          >
            Letter2You
          </span>
        </a>

      </div>


      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6 font-medium">
        <span
          onClick={() => setView("home")}
          style={{ color: "#8F002D", cursor: "pointer" }}
          className="hover:opacity-70 transition text-2xl"
        >
          Demo
        </span>
        <span
          onClick={() => setView("about")}
          style={{ color: "#8F002D", cursor: "pointer" }}
          className="hover:opacity-70 transition text-2xl"
        >
          About
        </span>
        <span
          onClick={() => setView("signup")}
          style={{
            backgroundColor: "#8F002D",
            color: "white",
            padding: "8px 12px",
            borderRadius: "4px",
            fontSize: "1.45rem",
            cursor: "pointer",
            lineHeight: "1",
          }}
          className= "hover:opacity-80 transition"
        >
          Login / Sign Up
        </span>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden font-bold"
        style={{ color: "#8F002D" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col space-y-2 font-medium absolute top-10 right-4 bg-transparent">
          <span
            onClick={() => { setView("home"); setIsOpen(false); }}
            style={{ color: "#8F002D", cursor: "pointer" }}
            className="hover:opacity-70 transition"
          >
            Home
          </span>
          <span
            onClick={() => { setView("about"); setIsOpen(false); }}
            style={{ color: "#8F002D", cursor: "pointer" }}
            className="hover:opacity-70 transition"
          >
            About
          </span>
          <span
            onClick={() => { setView("signup"); setIsOpen(false); }}
            style={{
              backgroundColor: "#8F002D",
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "0.875rem",
              cursor: "pointer",
              lineHeight: "1",
              textAlign: "center",
            }}
            className="hover:opacity-80 transition"
          >
            Login / Sign Up
          </span>
        </div>
      )}
    </div>
  );
}

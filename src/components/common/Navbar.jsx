import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as CDCLogo } from "../../asset/CDCLogo.svg"; // Correct import
import { RiMenu4Fill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { title: "Opportunities", to: "/opportunities" },
    { title: "Placement", to: "/success-story" }  ,
    { title: "Announcement", to: "/Announcement" },
    { title: "Events", to: "/events" },
    { title: "Team", to: "/team" },
    // { title: "Glance", to: "/glance" },
    { title: "About", to: "/about" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-4">
      <div className="flex items-center gap-4 md:gap-8">
        {/* Logo Container */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 md:flex-initial flex justify-center md:justify-start ml-0 md:ml-8"
        >
          <Link
            to="/"
            className="flex items-center justify-center h-[45px] w-[200px] md:w-auto px-6 rounded-full border-2 border-white/20 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg"
          >
            <CDCLogo className="h-6 w-auto text-white fill-white stroke-white" />
          </Link>
        </motion.div>

        {/* Desktop Navigation Container */}
        <div className="hidden md:block flex-grow">
          <div className="flex items-center h-[45px] rounded-full border-2 border-white/20 bg-white/5 w-full max-w-[900px] ml-auto shadow-lg">
            <div className="flex items-center justify-between w-full px-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    className="px-4 py-2 text-white/90 hover:text-white transition-all duration-300 text-sm font-medium relative rounded-full hover:bg-white/10 backdrop-blur-sm"
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex-shrink-0">
          <motion.button
            ref={buttonRef}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white h-[45px] w-[45px] flex items-center justify-center rounded-full border-2 border-white/20 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-300 mr-4 shadow-lg"
          >
            <RiMenu4Fill className="h-6 w-6" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", bounce: 0.25 }}
            className="fixed inset-y-0 right-0 w-64 backdrop-blur-2xl bg-white/5 border-l-2 border-white/20 md:hidden shadow-lg"
          >
            <div className="flex justify-end p-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2 rounded-full border-2 border-white/20 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg"
              >
                <RiMenu4Fill className="h-6 w-6" />
              </motion.button>
            </div>
            <div className="flex flex-col space-y-6 p-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/90 hover:text-white transition-all duration-300 text-lg font-medium block py-2 px-4 rounded-full hover:bg-white/10 backdrop-blur-sm"
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

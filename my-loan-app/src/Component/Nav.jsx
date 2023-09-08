import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import { AcmeLogo } from "./AcmeLogo.jsx";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation(); // Get the current location (route)
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Check if the user is an admin

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "View Loan", path: "/view-loans" },
    // Conditionally add the "Admin" menu item if the user is an admin
    ...(isAdmin ? [{ name: "Admin", path: "/admin" }] : []),
    { name: "Log out", path: "/logout" },
  ];

  // Define paths where menu items should be hidden
  const hiddenPaths = ['/login', '/signup'];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      {!hiddenPaths.includes(location.pathname) && (
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
          {menuItems.map((item, index) => (
            <NavbarItem
              key={index}
              className={location.pathname === item.path ? "text-primary" : ""}
            >
              <Link color="foreground" to={item.path}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              to={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

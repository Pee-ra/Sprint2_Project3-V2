import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link, Outlet } from "react-router-dom";

const Navber = () => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/pricing">Pricing</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/tracking">Tracking</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/bookService">Book Service</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/myOder">My Oder</Link>
          </NavigationMenuLink>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <NavigationMenuLink asChild>
                <Link to="/profile">Profile</Link>
              </NavigationMenuLink>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
              <NavigationMenuLink>Link</NavigationMenuLink>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="p-6 w-full max-w-6xl">
        <Outlet />
      </div>
    </div>
  );
};

export default Navber;

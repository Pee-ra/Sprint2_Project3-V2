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
    <div className="p-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <img
            src="/src/image/Whale wash1.png"
            alt=""
            className=" rounded-4xl max-w-10 max-h-10"
          />
          <h1>WhaleWash</h1>
        </div>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/home">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/home/pricing">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/home/tracking">Tracking</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/home/bookingService">Booking Service</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/home/payment">Payment</Link>
              </NavigationMenuLink>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <NavigationMenuLink asChild>
                    <Link to="/home/profile">Profile</Link>
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
        </div>
      </div>
      <div className="p-6 w-full flex justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Navber;

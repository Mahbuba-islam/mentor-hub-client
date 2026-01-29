"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import ModeToggle from "./mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Menu, X } from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
}

const mentorHubMenu: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Find Tutors", url: "/tutors" },
  { title: "Become a Tutor", url: "/become-tutor" },
  { title: "Blogs", url: "/blogs" },
  { title: "About", url: "/about" },
  { title: "Dashboard", url: "/dashboard" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="MentorHub Logo"
            className="h-8 w-8 dark:invert"
          />
          <span className="text-xl font-bold tracking-tight">MentorHub</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {mentorHubMenu.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    asChild
                    className="px-4 py-2 text-sm font-medium hover:text-primary"
                  >
                    <Link href={item.url}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          <ModeToggle />
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t bg-background">
          <div className="flex flex-col gap-4 px-6 py-4">
            {mentorHubMenu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-base font-medium"
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            <div className="flex items-center gap-3 pt-2">
              <ModeToggle />
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="w-full">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
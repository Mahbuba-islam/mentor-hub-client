"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import ModeToggle from "./mode-toggle";
import { Menu, X } from "lucide-react";
import { LogOutButton } from "./LogOutButton";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const [open, setOpen] = useState(false);
 
 const [session, setSession] = useState<{
  user: any;
  session: any;
} | null>(null)

useEffect(() => {
  authClient.getSession().then((res) => {
    setSession(res.data || null)
  })
}, [])




  const mentorHubMenu = [
    { title: "Home", url: "/" },
    { title: "Find Tutors", url: "/tutors" },
    { title: "Become a Tutor", url: "/become-tutor" },
    { title: "Blogs", url: "/blogs" },
    { title: "About", url: "/about" },
    { title: "Dashboard", url: "/dashboard" },
  ];

  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="MentorHub Logo" className="h-8 w-8 dark:invert" />
          <span className="text-xl font-bold tracking-tight">MentorHub</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {mentorHubMenu.map((item) => (
            <Link key={item.title} href={item.url} className="text-sm font-medium hover:text-primary">
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          <ModeToggle />

          {!session && (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}

          {session && <LogOutButton />}
        </div>

        {/* Mobile Hamburger */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
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

            <div className="flex flex-col gap-3 pt-2">
              <ModeToggle />

              {!session && (
                <>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}

              {session && <LogOutButton />}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
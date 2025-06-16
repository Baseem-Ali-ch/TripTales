"use client";

import * as React from "react";
import Link from "next/link";
import {
  Moon,
  Search,
  Sun,
  User,
  Menu,
  X,
  PenSquare,
  ChevronDown,
  Home,
  BookOpen,
  Contact,
  Router,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isAccountExpanded, setIsAccountExpanded] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const { theme, setTheme } = useTheme();
  const searchRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleWriteBlog = () => {
    router.push("/contact?tab=submit-blog");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background border-b",
        isScrolled ? "h-16 shadow-md" : "h-20"
      )}
    >
      <div className="container flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground"
          >
            <PenSquare className="w-5 h-5" />
          </motion.div>
          <span className="text-xl font-bold">BlogFolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/" isActive={pathname === "/"}>
            <Home className="w-4 h-4 mr-2" />
            Home
          </NavLink>
          <NavLink href="/blogs" isActive={pathname.startsWith("/blogs")}>
            <BookOpen className="w-4 h-4 mr-2" />
            Blogs
          </NavLink>
          <NavLink href="/contact" isActive={pathname === "/contact"}>
            <Contact className="w-4 h-4 mr-2" />
            Contact
          </NavLink>
        </nav>

        {/* Right side elements - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search */}
          <div ref={searchRef} className="relative">
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="w-full pr-8"
                    autoFocus
                  />
                  <X
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => setIsSearchOpen(false)}
                  />
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-full hover:bg-accent dark:hover:bg-accent dark:hover:text-black transition-colors"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full hover:bg-accent dark:hover:bg-accent dark:hover:text-black transition-colors"
                aria-label="User profile"
              >
                <User className="w-5 h-5" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="/profile" className="flex w-full">
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/logout" className="flex w-full">
                  Log Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="p-2 rounded-full hover:bg-accent dark:hover:bg-accent dark:hover:text-black transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>

          {/* CTA Button */}
          <Button className="ml-2" onClick={handleWriteBlog}>
            <PenSquare className="w-4 h-4 mr-2" />
            Write Blog
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-primary/60 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t"
          >
            <div className="container py-4 flex flex-col space-y-4">
              <Link
                href="/"
                className={cn(
                  "py-2 rounded-md hover:bg-muted transition-colors font-medium flex items-center gap-2",
                  pathname === "/" && "text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                Home
              </Link>
              <Link
                href="/blogs"
                className={cn(
                  "py-2 rounded-md hover:bg-muted transition-colors font-medium flex items-center gap-2",
                  pathname.startsWith("/blogs") && "text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BookOpen className="w-5 h-5" />
                Blogs
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "py-2 rounded-md hover:bg-muted transition-colors font-medium flex items-center gap-2",
                  pathname === "/contact" && "text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Contact className="w-5 h-5" />
                Contact
              </Link>

              <div className="flex items-center justify-between pt-2 ">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>Account</span>
                </div>
                <motion.button
                  onClick={() => setIsAccountExpanded(!isAccountExpanded)}
                  animate={{ rotate: isAccountExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              </div>

              <AnimatePresence>
                {isAccountExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-7 space-y-2">
                      <Link
                        href="/profile"
                        className="block py-1 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/saved"
                        className="block py-1 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Saved Blogs
                      </Link>
                      <Link
                        href="/logout"
                        className="block py-1 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Log Out
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between pt-2 border-t">
                <span>Theme</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
              </div>

              <Button className="w-full mt-2">
                <PenSquare className="w-4 h-4 mr-2" />
                Write Blog
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

function NavLink({ href, children, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative py-2 font-medium hover:text-primary transition-colors flex items-center",
        isActive ? "text-primary" : "text-foreground"
      )}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="activeNavIndicator"
          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}

// Add custom scrollbar styles
const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: hsl(var(--primary) / 0.3);
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--primary) / 0.5);
  }
`;

// Add the styles to the document
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = scrollbarStyles;
  document.head.appendChild(style);
}

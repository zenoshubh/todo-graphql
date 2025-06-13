import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import AuthDialog from "../Auth/AuthDialog";

function Navbar() {
  const { user, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleAuthOpen = () => {
    if (!user) {
      setIsAuthOpen(true);
    }
  };

  return (
    <>
      <nav className="bg-card shadow-md px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-primary">
              TodoWit
            </span>
          </div>

          {/* User Profile and Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-card-foreground hidden md:block">
                  Hello, <span className="font-medium">{user.name}</span>
                </span>
                <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-primary-foreground font-medium cursor-pointer shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <Button 
                  onClick={logout}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleAuthOpen}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </nav>

      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </>
  );
}

export default Navbar;

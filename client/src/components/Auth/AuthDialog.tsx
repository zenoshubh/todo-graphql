import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface AuthDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerButton?: React.ReactNode;
}

function AuthDialog({ open, onOpenChange, triggerButton }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {triggerButton && <DialogTrigger asChild>{triggerButton}</DialogTrigger>}
      <DialogContent className="sm:max-w-md border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {isLogin ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isLogin
              ? "Enter your credentials to access your account."
              : "Create a new account to get started with TodoWit."}
          </DialogDescription>
        </DialogHeader>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:text-primary/80"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;

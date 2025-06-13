import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useMutation } from "@apollo/client";
import type { AuthResponse } from "../../types";
import { LOGIN } from "../../graphql/queries";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

function LoginForm() {
  // Initialize the form with the schema and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState("");

  const { login } = useAuth();

  const [loginMutation, { loading }] = useMutation<{ login: AuthResponse }>(
    LOGIN
  );

  // Handle form submission
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      const { data } = await loginMutation({
        variables: { input: formData },
      });

      if (data?.login.success && data.login.token && data.login.user) {
        login(data.login.token, data.login.user);
      } else {
        setError(data?.login.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  return (
    <>
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
    
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your email" 
                    className="border-border focus-visible:border-primary focus-visible:ring-primary/20"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password"
                    placeholder="Enter your password" 
                    className="border-border focus-visible:border-primary focus-visible:ring-primary/20"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"></div>
                Logging in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default LoginForm;

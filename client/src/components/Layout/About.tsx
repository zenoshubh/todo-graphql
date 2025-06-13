import { Button } from "../ui/button";
import AuthDialog from "../Auth/AuthDialog";
import { useState } from "react";

function About() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Organize Your Tasks with TodoWit
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A simple, intuitive todo app built with Apollo GraphQL to help you stay organized and productive.
          </p>
          <Button 
            onClick={() => setIsAuthOpen(true)}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white shadow-lg"
          >
            Get Started for Free
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Simple Task Management</h3>
            <p className="text-muted-foreground">Easily create, update, and complete tasks with an intuitive user interface.</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Fast & Responsive</h3>
            <p className="text-muted-foreground">Built with modern technologies for speed and real-time updates.</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">Your data is securely stored and only accessible to you.</p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-card rounded-xl p-8 shadow-md border border-border mb-16">
          <h2 className="text-2xl font-bold text-center text-card-foreground mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">1</div>
              <h3 className="font-medium text-card-foreground mb-2">Create an Account</h3>
              <p className="text-sm text-muted-foreground">Sign up for free to get started with TodoWit.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">2</div>
              <h3 className="font-medium text-card-foreground mb-2">Add Your Tasks</h3>
              <p className="text-sm text-muted-foreground">Create tasks with titles and optional descriptions.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">3</div>
              <h3 className="font-medium text-card-foreground mb-2">Stay Organized</h3>
              <p className="text-sm text-muted-foreground">Complete tasks, edit them, or delete as needed.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">Join thousands of users organizing their tasks with TodoWit.</p>
          <Button 
            onClick={() => setIsAuthOpen(true)}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white shadow-lg"
          >
            Sign Up Now
          </Button>
        </div>
      </div>

      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </div>
  );
}

export default About;
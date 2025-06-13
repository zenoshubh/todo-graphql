import AuthDialog from "./components/Auth/AuthDialog";
import RegisterForm from "./components/Auth/RegisterForm";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import TodoList from "./components/Todo/TodoList";
import { useAuth } from "./context/AuthContext";
import About from "./components/Layout/About";

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
        <TodoList />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1">
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default App;

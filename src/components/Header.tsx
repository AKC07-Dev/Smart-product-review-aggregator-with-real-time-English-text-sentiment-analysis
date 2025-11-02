import ThemeToggle from './ThemeToggle';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Home } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 shadow-soft backdrop-blur-lg bg-background/80">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="text-xl font-bold">Review Platform</span>
        </div>
        
        <div className="flex items-center gap-2">
          {!isHome && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-full transition-smooth hover:scale-110"
              aria-label="Go home"
            >
              <Home className="h-5 w-5" />
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

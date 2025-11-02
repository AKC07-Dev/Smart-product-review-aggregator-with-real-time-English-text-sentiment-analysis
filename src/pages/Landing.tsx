import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, BarChart3 } from 'lucide-react';
import Header from '@/components/Header';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="mb-8 inline-block">
            <div className="w-24 h-24 gradient-hero rounded-3xl flex items-center justify-center shadow-glow animate-morph mx-auto">
              <Star className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 p-3 bg-clip-text  gradient-hero">
            Welcome to Review Platform
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Share your thoughts, explore insights, and make your voice heard.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-8 py-6 h-auto min-w-[200px]"
              onClick={() => navigate('/review')}
            >
              <Star className="w-6 h-6" />
              Give Your Review
            </Button>
            
            <Button
              variant="accent"
              size="lg"
              className="text-lg px-8 py-6 h-auto min-w-[200px]"
              onClick={() => navigate('/statistics')}
            >
              <BarChart3 className="w-6 h-6" />
              Check Statistics
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-medium transition-smooth animate-fade-in">
              <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Submission</h3>
              <p className="text-muted-foreground">Submit your reviews quickly with our intuitive form</p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-medium transition-smooth animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rich Analytics</h3>
              <p className="text-muted-foreground">View detailed statistics and insights from reviews</p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-medium transition-smooth animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">✨</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Beautiful Design</h3>
              <p className="text-muted-foreground">Enjoy a modern, smooth user experience</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;

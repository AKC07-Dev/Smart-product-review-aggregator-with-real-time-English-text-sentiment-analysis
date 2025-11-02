import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '@/components/Header';

const ratingDistribution = [
  { name: '5 Stars', value: 45, percentage: 45 },
  { name: '4 Stars', value: 30, percentage: 30 },
  { name: '3 Stars', value: 15, percentage: 15 },
  { name: '2 Stars', value: 7, percentage: 7 },
  { name: '1 Star', value: 3, percentage: 3 },
];

const reviewsOverTime = [
  { month: 'Jan', reviews: 45 },
  { month: 'Feb', reviews: 52 },
  { month: 'Mar', reviews: 61 },
  { month: 'Apr', reviews: 58 },
  { month: 'May', reviews: 70 },
  { month: 'Jun', reviews: 85 },
];

const sentimentData = [
  { sentiment: 'Positive', percentage: 78 },
  { sentiment: 'Neutral', percentage: 15 },
  { sentiment: 'Negative', percentage: 7 },
];

const COLORS = ['hsl(250 80% 60%)', 'hsl(280 70% 60%)', 'hsl(330 80% 65%)', 'hsl(20 90% 60%)', 'hsl(200 80% 60%)'];

const Statistics = () => {
  return (
    <div className="min-h-screen gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Review Statistics</h1>
            <p className="text-xl text-muted-foreground">
              Insights and analytics from customer feedback
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="shadow-medium border-0 animate-fade-in">
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>Breakdown of all ratings received</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ratingDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={100}
                      fill="hsl(var(--primary))"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {ratingDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle>Reviews Over Time</CardTitle>
                <CardDescription>Monthly review submission trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={reviewsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="reviews" 
                      stroke="hsl(250 80% 60%)" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(250 80% 60%)', r: 6 }}
                      animationBegin={0}
                      animationDuration={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-medium border-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
              <CardDescription>Overall sentiment distribution of reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sentimentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="sentiment" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="percentage" 
                    fill="hsl(250 80% 60%)"
                    radius={[8, 8, 0, 0]}
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="shadow-soft border-0 gradient-primary text-white animate-scale-in">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-2">371</p>
                  <p className="text-white/90">Total Reviews</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-0 gradient-accent text-white animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-2">4.2</p>
                  <p className="text-white/90">Average Rating</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-0 gradient-hero text-white animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-2">78%</p>
                  <p className="text-white/90">Positive Sentiment</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistics;

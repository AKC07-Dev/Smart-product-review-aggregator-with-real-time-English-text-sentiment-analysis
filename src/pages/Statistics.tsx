import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Header from '@/components/Header';

const COLORS = [
  'hsl(250 80% 60%)', 'hsl(280 70% 60%)', 'hsl(330 80% 65%)',
  'hsl(20 90% 60%)', 'hsl(200 80% 60%)'
];

// Helper functions to create chart data from reviews
function getRatingDistribution(reviews) {
  const counts = [0, 0, 0, 0, 0]; // 1 to 5 stars
  reviews.forEach(r => {
    const idx = (r.rating ?? 1) - 1;
    if (idx >= 0 && idx < 5) counts[idx]++;
  });
  const total = reviews.length;
  return counts.map((count, i) => ({
    name: `${i + 1} Star${i === 0 ? '' : 's'}`,
    value: count,
    percentage: total ? Math.round((count / total) * 100) : 0
  }));
}
function getReviewsOverTime(reviews) {
  // Group by month
  const byMonth = {};
  reviews.forEach(r => {
    // Try to use a timestamp if present, else fake with id (if sequential)
    let dt;
    try {
      dt = new Date(r.timestamp || r.created_at || r.date || Date.now());
    } catch {
      dt = new Date(Date.now());
    }
    const key = dt.toLocaleString('default', { month: 'short', year: 'numeric' });
    byMonth[key] = (byMonth[key] || 0) + 1;
  });
  // Sort by time
  return Object.entries(byMonth).map(([month, reviews]) => ({ month, reviews })).sort((a, b) => {
    // Sort by month and year as strings
    return new Date(`1 ${a.month}`).getTime() - new Date(`1 ${b.month}`).getTime();

  });
}
function getSentimentStats(reviews) {
  // "good", "bad", "neutral"
  const totals = { good: 0, bad: 0, neutral: 0 };
  reviews.forEach(r => {
    totals[r.sentiment] = (totals[r.sentiment] || 0) + 1;
  });
  const total = reviews.length;
  return [
    { sentiment: 'Positive', percentage: total ? Math.round((totals.good / total) * 100) : 0 },
    { sentiment: 'Neutral', percentage: total ? Math.round((totals.neutral / total) * 100) : 0 },
    { sentiment: 'Negative', percentage: total ? Math.round((totals.bad / total) * 100) : 0 },
  ];
}

const Statistics = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Derived stats
  const ratingDistribution = getRatingDistribution(reviews);
  const reviewsOverTime = getReviewsOverTime(reviews);
  const sentimentData = getSentimentStats(reviews);

  // Overall numbers
  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? (reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / totalReviews).toFixed(2)
    : 0;
  const positivePercent =
    sentimentData.find((x) => x.sentiment === 'Positive')?.percentage || 0;

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://english-text-sentiment-analysis-stage-2-1.onrender.com/get-reviews'
        );
        setReviews(Array.isArray(response.data) ? response.data : []);
      } catch (e) {
        setReviews([]);
      }
      setLoading(false);
    }
    fetchReviews();
  }, []);

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
          {loading ? (
            <div className="text-center text-lg py-20">Loading review data...</div>
          ) : (
            <>
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
                      <p className="text-4xl font-bold mb-2">{totalReviews}</p>
                      <p className="text-white/90">Total Reviews</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-soft border-0 gradient-accent text-white animate-scale-in" style={{ animationDelay: '0.1s' }}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold mb-2">{averageRating}</p>
                      <p className="text-white/90">Average Rating</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-soft border-0 gradient-hero text-white animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold mb-2">{positivePercent}%</p>
                      <p className="text-white/90">Positive Sentiment</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Statistics;

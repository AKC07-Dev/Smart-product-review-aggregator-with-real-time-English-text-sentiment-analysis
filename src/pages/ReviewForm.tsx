import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';

const reviewSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  productName: z.string().min(2, 'Product name must be at least 2 characters'),
  rating: z.number().min(1, 'Please select a rating').max(5),
  reviewText: z.string().min(10, 'Review must be at least 10 characters'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const ReviewForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ReviewFormData | null>(null);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = (data: ReviewFormData) => {
    setSubmittedData(data);
    setSubmitted(true);
    setTimeout(() => {
      reset();
      setSelectedRating(0);
    }, 5000);
  };

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    setValue('rating', rating);
  };

  return (
    <div className="min-h-screen gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Share Your Review</h1>
            <p className="text-xl text-muted-foreground">
              Your feedback helps us improve and helps others make better decisions
            </p>
          </div>

          <Card className="shadow-medium border-0">
            <CardHeader>
              <CardTitle>Review Form</CardTitle>
              <CardDescription>Please fill out all fields to submit your review</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register('name')}
                    className="transition-smooth"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register('email')}
                    className="transition-smooth"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    placeholder="Product XYZ"
                    {...register('productName')}
                    className="transition-smooth"
                  />
                  {errors.productName && (
                    <p className="text-sm text-destructive">{errors.productName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="transition-bounce hover:scale-125"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= (hoveredStar || selectedRating)
                              ? 'fill-accent text-accent'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-sm text-destructive">{errors.rating.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviewText">Your Review</Label>
                  <Textarea
                    id="reviewText"
                    placeholder="Tell us about your experience..."
                    rows={5}
                    {...register('reviewText')}
                    className="transition-smooth resize-none"
                  />
                  {errors.reviewText && (
                    <p className="text-sm text-destructive">{errors.reviewText.message}</p>
                  )}
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>

          {submitted && submittedData && (
            <Card className="mt-8 shadow-medium border-2 border-primary animate-scale-in">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 animate-bounce">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Thank you, {submittedData.name}!</h3>
                    <p className="text-muted-foreground mb-4">Your review has been submitted successfully.</p>
                    
                    <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                      <p className="text-sm"><strong>Product:</strong> {submittedData.productName}</p>
                      <p className="text-sm flex items-center gap-2">
                        <strong>Rating:</strong> 
                        <span className="flex">
                          {Array.from({ length: submittedData.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </span>
                      </p>
                      <p className="text-sm"><strong>Review:</strong> {submittedData.reviewText}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReviewForm;

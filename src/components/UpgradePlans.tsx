
import React from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  recommended?: boolean;
}

export const UpgradePlans = () => {
  const plans: Plan[] = [
    {
      name: "Free",
      price: "₹0",
      description: "Basic astrology insights for casual users",
      features: [
        { name: "Daily horoscope", included: true },
        { name: "Basic birth chart", included: true },
        { name: "Moon phase tracker", included: true },
        { name: "Personalized predictions", included: false },
        { name: "Detailed transit analysis", included: false },
        { name: "Relationship compatibility", included: false },
        { name: "Career guidance", included: false },
        { name: "Video consultations", included: false },
      ],
    },
    {
      name: "Essence",
      price: "₹199",
      description: "Enhanced insights for the curious seeker",
      features: [
        { name: "Daily horoscope", included: true },
        { name: "Basic birth chart", included: true },
        { name: "Moon phase tracker", included: true },
        { name: "Personalized predictions", included: true },
        { name: "Detailed transit analysis", included: true },
        { name: "Relationship compatibility", included: false },
        { name: "Career guidance", included: false },
        { name: "Video consultations", included: false },
      ],
    },
    {
      name: "Celestial",
      price: "₹499",
      description: "Comprehensive guidance for serious practitioners",
      features: [
        { name: "Daily horoscope", included: true },
        { name: "Basic birth chart", included: true },
        { name: "Moon phase tracker", included: true },
        { name: "Personalized predictions", included: true },
        { name: "Detailed transit analysis", included: true },
        { name: "Relationship compatibility", included: true },
        { name: "Career guidance", included: true },
        { name: "Video consultations", included: false },
      ],
      recommended: true,
    },
    {
      name: "Cosmic Master",
      price: "₹1299",
      description: "Complete cosmic wisdom with personal guidance",
      features: [
        { name: "Daily horoscope", included: true },
        { name: "Basic birth chart", included: true },
        { name: "Moon phase tracker", included: true },
        { name: "Personalized predictions", included: true },
        { name: "Detailed transit analysis", included: true },
        { name: "Relationship compatibility", included: true },
        { name: "Career guidance", included: true },
        { name: "Video consultations", included: true },
      ],
    },
  ];

  const handleSelectPlan = (planName: string) => {
    toast.success(`Selected the ${planName} plan!`);
    // In a real app, this would navigate to a payment page or subscription flow
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Upgrade Your Cosmic Experience</h2>
      <div className="text-muted-foreground mb-8">
        Choose the perfect plan to enhance your astrological journey and unlock deeper cosmic insights.
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`flex flex-col ${plan.recommended ? 'border-primary shadow-lg relative overflow-hidden' : ''}`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-primary-foreground text-xs py-1 px-3 rounded-bl-md">
                  Popular
                </div>
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {plan.name}
                {plan.price !== "₹0" && <Star className="h-4 w-4 text-yellow-400" />}
              </CardTitle>
              <div className="mt-2 text-2xl font-bold">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex-grow">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center">
                  <div className={`mr-2 h-5 w-5 rounded-full flex items-center justify-center ${feature.included ? 'text-primary bg-primary/10' : 'text-muted-foreground bg-muted'}`}>
                    {feature.included ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <span className="h-3.5 w-3.5 text-xs">-</span>
                    )}
                  </div>
                  <span className={feature.included ? '' : 'text-muted-foreground line-through opacity-70'}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-4">
              <Button 
                onClick={() => handleSelectPlan(plan.name)}
                className={`w-full ${plan.recommended ? 'bg-primary' : ''}`}
                variant={plan.price === "₹0" ? "outline" : "default"}
              >
                {plan.price === "₹0" ? "Current Plan" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          All plans include access to our mobile app. Subscription can be canceled anytime.
          For personalized consultations, please contact our support team.
        </p>
      </div>
    </div>
  );
};

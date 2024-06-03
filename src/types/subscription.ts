export interface Plan {
  name: string;
  price: number;
  perUserPerMonth: boolean;
  planId: string;
  features: { name: string }[];
  isPopular?: boolean;
}

export type FeaturePlan = {
  name: string;
  availableIn: boolean[];
};

export type SubscriptionsProps = {
  plans: Plan[];
};
export type PlansGridProps = {
  plans: Plan[];
};
export type Subscription = {
  userId: string;
  subscriptionId: string;
  planName: string;
  planId: string;
  subscriptionDate: string;
  expirationDate: string;
  isRecurring: boolean;
  status: "active" | "inactive" | "expired";
};

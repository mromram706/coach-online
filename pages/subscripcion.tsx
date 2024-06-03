import React from "react";
import Subscriptions from "../src/components/Subscriptions";
import { useStore } from "../src/store/store";

const SubscriptionsPage: React.FC = () => {
  const plans = useStore((state) => state.plans);

  return <Subscriptions plans={plans} />;
};

export default SubscriptionsPage;

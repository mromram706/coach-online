import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

export const logPageView = (page: string) => {
  if (analytics) {
    logEvent(analytics, "page_view", { page });
  }
};

export const logUserEvent = (category: string, action: string) => {
  if (analytics) {
    logEvent(analytics, "user_event", { category, action });
  }
};

"use client";
import React, { useContext } from "react";

type FeedbackData = {
  opinion?: string;
  price?: string;
  extra_info?: string;
};

type FeedbackContext = {
  feedbackData: FeedbackData;
  setFeedbackData: (data: FeedbackData) => void;
};

export const FeedbackContext = React.createContext<FeedbackContext | null>(
  null
);

const FeedbackProvider = ({ children }: { children: React.ReactNode }) => {
  const [feedbackData, setFeedbackData] = React.useState<FeedbackData>({});

  const value = React.useMemo(() => {
    return { feedbackData, setFeedbackData };
  }, [feedbackData]);

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "useFeedbackContext has to be used within <FeedbackContext.Provider>"
    );
  }
  return context;
};

export default FeedbackProvider;

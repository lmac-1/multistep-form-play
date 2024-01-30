import FeedbackProvider from "@/providers/FeedbackContext";

export default function FeedbackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FeedbackProvider>
      <div className="max-w-sm flex flex-col mx-auto my-10">{children}</div>
    </FeedbackProvider>
  );
}

"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFeedbackContext } from "@/providers/FeedbackContext";

const formSchema = z.object({
  why_not_interested: z.string().optional(),
});

export const FactorsForm = ({
  interested,
  nextUrl,
}: {
  interested?: string;
  nextUrl: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const { feedbackData, setFeedbackData } = useFeedbackContext();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newFeedbackData = { ...feedbackData, ...values };
    setFeedbackData(newFeedbackData);
    if (nextUrl === "success") {
      console.log("submit function");
      console.log({ ...newFeedbackData, interested });
      router.push("/feedback/success");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="why_not_interested"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Can you tell us why you weren&apos;t interested?
              </FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-3">Next</Button>
      </form>
    </Form>
  );
};

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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { useFeedbackContext } from "@/providers/FeedbackContext";

const formSchema = z.object({
  interested: z.enum(["yes", "no", "maybe"]),
});

export const InterestedForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const { setFeedbackData } = useFeedbackContext();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // first step.. so it should reset feedback data
    setFeedbackData({});
    router.push(`/feedback/survey?interested=${values.interested}`);
  }

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "maybe", label: "Maybe" },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="interested"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are you interested?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {options.map(({ value, label }) => (
                    <FormItem
                      key={value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel>{label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button className="mt-3">Next</Button>
      </form>
    </Form>
  );
};

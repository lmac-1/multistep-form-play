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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFeedbackContext } from "@/providers/FeedbackContext";

const formSchema = z.object({
  opinion: z.string().optional(),
  price: z.string().optional(),
  extra_info: z.string().optional(),
});

export const SurveyForm = ({
  nextUrl,
  interested,
}: {
  nextUrl: string;
  interested: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const { feedbackData, setFeedbackData } = useFeedbackContext();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setFeedbackData({ ...feedbackData, ...values });

    if (nextUrl === "success") {
      // here we would submit the data, and also remember to include interested from props
      console.log("submit form");
      console.log({ ...feedbackData, ...values, interested });
      router.push("/feedback/success");
      return;
    } else {
      // we would need to keep interested in query parameter to use for submitting the form
      router.push(`/feedback/${nextUrl}?interested=${interested}`);
    }
  }

  const options = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="opinion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What did you think?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {options.map(({ value }) => (
                    <FormItem
                      key={value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel>{value}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What did you think of the price?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {options.map(({ value }) => (
                    <FormItem
                      key={value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel>{value}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        {interested === "no" && (
          <FormField
            control={form.control}
            name="extra_info"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Do you have anything else you would like to add?
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button className="mt-3">Next</Button>
      </form>
    </Form>
  );
};

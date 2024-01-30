import { SurveyForm } from "@/components/SurveyForm";
import { redirect } from "next/navigation";

export default function Survey({
  searchParams,
}: {
  searchParams: {
    interested: "yes" | "no" | "maybe";
  };
}) {
  const interested = searchParams["interested"] || "";

  if (!interested || !["yes", "no", "maybe"].includes(interested)) {
    redirect("/feedback");
  }

  const nextUrl = {
    yes: "interested",
    no: "not-interested",
    maybe: "success",
  };

  return <SurveyForm nextUrl={nextUrl[interested]} interested={interested} />;
}

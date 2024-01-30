import { FactorsForm } from "@/components/FactorsForm";
import { redirect } from "next/navigation";

export default function NotInterestedPage({
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

  return <FactorsForm interested={interested} nextUrl="success" />;
}

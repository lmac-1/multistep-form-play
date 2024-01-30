import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link
        className="underline underline-offset-4 decoration-blue-600 hover:no-underline duration-300"
        href="/feedback"
      >
        Feedback
      </Link>
    </main>
  );
}

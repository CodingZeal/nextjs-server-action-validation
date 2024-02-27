import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-3">Home</h1>
      <p>
        Hey there mister deejay.{" "}
        <Link
          href="/contact"
          className="text-green-700 underline font-semibold hover:no-underline"
        >
          Put a record on.
        </Link>
      </p>
    </>
  );
}

import Head from "next/head";
import PackageTracker from "@/components/PackageTracker";

export default function Home() {
  return (
    <>
      <Head>
        <title>Planning Dashboard – Package Tracking</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{ minHeight: "100vh", background: "#f1f5f9", paddingTop: "3rem" }}>
        <PackageTracker defaultTrackingNumber="2939465244" />
      </main>
    </>
  );
}

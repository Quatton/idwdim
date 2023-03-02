import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "src/utils/api";
import { useState } from "react";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>IDWDIM</title>
        <meta name="description" content="I Don't Wanna Do It Myself" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <nav className="h-12 w-3/4 rounded-xl border border-gray-700 bg-gray-800 shadow-xl"></nav>
        <FormUI />
      </main>
    </>
  );
};

export default Home;

const FormUI: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // onSubmit
  function onSubmit() {
    setIsLoading(true);
  }

  return (
    <section className="flex h-3/4 w-3/4 flex-col items-center justify-center rounded-xl border border-gray-700 bg-gray-800 p-4 shadow-xl">
      <textarea
        className="w-full flex-1 resize-none rounded-md border border-gray-500 bg-gray-700 p-4 text-gray-200 outline-none"
        name="prompt"
        id="prompt"
        readOnly={isLoading}
      />
      <button
        className="my-4 rounded-md border border-sky-300 bg-sky-600 px-4 py-2 text-gray-200 hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-sky-800 disabled:text-gray-400"
        type="submit"
        disabled={isLoading}
        onClick={() => setIsLoading(true)}
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
      <textarea
        className="w-full flex-1 resize-none rounded-md border border-gray-500 bg-gray-700 p-4 text-gray-200 outline-none"
        name="output"
        id="output"
        readOnly
      />
    </section>
  );
};

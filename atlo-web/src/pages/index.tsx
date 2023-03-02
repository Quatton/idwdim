import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "src/utils/api";
import { useState } from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>IDWDIM</title>
        <meta name="description" content="I Don't Wanna Do It Myself" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <NavBar />
        <FormUI />
      </main>
    </>
  );
};

export default Home;

const NavBar: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="flex w-3/4">
      <button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
        className="ml-auto rounded-md border border-sky-300 bg-sky-500 px-4 py-2 text-gray-100 hover:bg-sky-400"
      >
        {sessionData?.user ? "Sign Out" : "Sign In"}
      </button>
    </nav>
  );
};

const FormUI: React.FC = () => {
  const { data: sessionData } = useSession();
  const [input, setInput] = useState<string>("Hello! What's your name?");

  const mutation = api.huggingface.flant5.useMutation({});

  return (
    <section className="flex h-3/4 w-3/4 flex-col items-center justify-center rounded-xl border border-gray-700 bg-gray-800 p-4 shadow-xl">
      <textarea
        className="w-full flex-1 resize-none rounded-md border border-gray-500 bg-gray-700 p-4 text-gray-200 outline-none"
        name="prompt"
        id="prompt"
        readOnly={mutation.isLoading}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          mutation.reset();
        }}
      />
      <button
        className="my-4 rounded-md border border-sky-300 bg-sky-600 px-4 py-2 text-gray-200 hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-sky-800 disabled:text-gray-400"
        type="submit"
        disabled={mutation.isLoading}
        onClick={async () => await mutation.mutateAsync({ text: input })}
      >
        {sessionData?.user != null
          ? mutation.isLoading
            ? "Loading..."
            : "Submit"
          : "Please sign in"}
      </button>
      <textarea
        className="w-full flex-1 resize-none rounded-md border border-gray-500 bg-gray-700 p-4 text-gray-400 outline-none"
        name="output"
        id="output"
        readOnly
        value={
          mutation.isLoading
            ? "Loading..."
            : mutation.data?.output.generated_text ?? ""
        }
      />
    </section>
  );
};

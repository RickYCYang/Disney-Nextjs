/* next */
import Head from "next/head";
/* next-auth */
import { getSession, useSession } from "next-auth/client";
/* components */
import Header from "../components/Header";
import Login from "../components/Login";
import Slider from "../components/Slider";
import Brands from "../components/Brands";

export default function Home() {
  const [session] = useSession();
  return (
    <div className="">
      <Head>
        <title>Disney+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session ? (
        <Login />
      ) : (
        <main>
          <Slider />
          <Brands />
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

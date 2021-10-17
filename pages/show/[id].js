import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Login from "../../components/Login";
import { PlusIcon } from "@heroicons/react/solid";
import TrailerModal from "../../components/TrailerModal";

function Show({ result }) {
  const [session] = useSession();
  const tmbdImageBaseUrl = process.env.NEXT_PUBLIC_TMBD_IMAGE_BASE_URL;
  const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  const index = result.videos.results.findIndex(
    (element) => element.type === "Trailer"
  );

  return (
    <Layout>
      <Head>
        <title>{result.title || result.original_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? (
        <Login />
      ) : (
        <section className="relative z-50">
          <div className="relative min-h-[calc(100vh-72px)]">
            <Image
              src={
                `${tmbdImageBaseUrl}${
                  result.backdrop_path || result.poster_path
                }` || `${tmbdImageBaseUrl}${result.poster_path}`
              }
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="absolute inset-y-12 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {result.title || result.original_name}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5">
              <button
                className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
                onClick={() => setShowPlayer(true)}
              >
                <img
                  src="/images/play-icon-black.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Play
                </span>
              </button>

              <button
                className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
                onClick={() => setShowPlayer(true)}
              >
                <img
                  src="/images/play-icon-white.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Trailer
                </span>
              </button>

              <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                <PlusIcon className="h-6" />
              </div>

              <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                <img src="/images/group-icon.svg" alt="" />
              </div>
            </div>

            <p className="text-xs md:text-sm">
              {result.release_date || result.first_air_date} •{" "}
              {result.number_of_seasons}{" "}
              {result.number_of_seasons === 1 ? "Season" : "Seasons"} •{" "}
              {result.genres.map((genre) => genre.name + " ")}{" "}
            </p>
            <h4 className="text-sm md:text-lg max-w-4xl">{result.overview}</h4>
          </div>

          {/* Bg Overlay */}
          <TrailerModal
            showPlayer={showPlayer}
            result={result}
            index={index}
            setShowPlayer={setShowPlayer}
          />
        </section>
      )}
    </Layout>
  );
}

export default Show;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.query;

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos`
  );
  const result = await response.json();

  return {
    props: {
      session,
      result: result,
    },
  };
}

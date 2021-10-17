/* next */
import Head from "next/head";
/* next-auth */
import { getSession, useSession } from "next-auth/client";
/* components */
import Layout from "../components/layout";
import Login from "../components/Login";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import Collection from "../components/Collection";

export default function Home({
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
}) {
  const [session] = useSession();
  return (
    <Layout>
      <Head>
        <title>Disney+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? (
        <Login />
      ) : (
        <>
          <Slider />
          <Brands />
          <Collection
            results={popularMovies}
            title="Popular Movies"
            type="movie"
          />
          <Collection
            results={popularShows}
            title="Popular Shows"
            type="show"
          />
          <Collection
            results={top_ratedMovies}
            title="Top Rated Movies"
            type="movie"
          />
          <Collection
            results={top_ratedShows}
            title="Top Rated Shows"
            type="show"
          />
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  /// Fetch TMBD data
  const [
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
  ]);

  const [popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
    ]);

  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
    },
  };
}

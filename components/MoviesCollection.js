import MovieThumbnail from "./MovieThumbnail";

const MoviesCollection = ({ results, title }) => {
  return (
    <div className="relative flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title}</h2>
      {results.map((result) => (
        <MovieThumbnail key={result.id} result={result} />
      ))}
    </div>
  );
};

export default MoviesCollection;

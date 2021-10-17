import Header from "./Header";

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main
        className="relative after:bg-home after:bg-center 
        after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1] "
      >
        {children}
      </main>
    </div>
  );
};

export default layout;

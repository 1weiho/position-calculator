import Calculator from "./Calculator";

function App() {
  return (
    // This is temporary for RWD, just to make the calculator appear in the middle of the screen
    <div className="w-screen lg:w-2/3 xl:w-1/2 mx-auto">
      <Calculator />
    </div>
  );
}

export default App;

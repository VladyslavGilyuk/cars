import SearchBar from "./components/SearchBar";
import { CarsProvider } from "./CarsContext";
function App() {
  return (
    <div className="App">
      <CarsProvider >
        <SearchBar />
      </CarsProvider>
    </div>
  );
}

export default App;

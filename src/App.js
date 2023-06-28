import Table from "./Table";
import SearchBar from "./components/SearchBar";
import { CarsProvider } from "./CarsContext";
function App() {
  return (
    <div className="App">
      <CarsProvider >
        <SearchBar />
        <Table />
      </CarsProvider>
    </div>
  );
}

export default App;

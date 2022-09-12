import logo from "./logo.svg";
import "./App.css";
import AddBook from "./components/book/AddBook";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <AddBook />
      </div>
    </div>
  );
}

export default App;

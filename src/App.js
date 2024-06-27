import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/home/Home';
import Restaurant from './components/restaurant/Restaurant';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/restaurant/:id" element={ <Restaurant /> } />
        </Routes>
      </header>
    </div>
  );
}

export default App;

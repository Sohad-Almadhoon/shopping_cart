import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CartPage from './components/CartPage';
import Header from './components/Header';
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

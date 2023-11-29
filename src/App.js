import './App.css';
import Halaman3 from './Halaman3';
import FormPage from './FormPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='container-content'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Halaman3 />} />
            <Route path="/mahasiswa" element={<Halaman3 />} />
            <Route path="/form" element={<FormPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

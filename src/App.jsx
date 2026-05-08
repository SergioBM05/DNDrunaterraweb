import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import RunaterraMap from './pages/Map';
import RaceSelector from './pages/RaceSelector';
import CharacterSheet from './pages/CharacterSheet';
import SelectCharacter from './pages/selectCharacter';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white font-sans">
        {/* Aquí podrías poner un Navbar global más adelante */}
        
        <Routes>
          {/* Ruta por defecto: si entras a la raíz, te manda al login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/registro" element={<Registro />} /> */}

          {/* Ruta para el Dashboard (la crearemos luego) */}
          <Route path="/dashboard" element={<RunaterraMap/>} />

          <Route path="/selector-raza" element={<RaceSelector />} />

          <Route path="/character/:id" element={<CharacterSheet />} />

          <Route path="/selectCharacter" element={<SelectCharacter />} />

          <Route path="/avisale-a-sergio" element ={<div className="p-10">Dile a sergio que te haga cuenta</div>} />
          
          {/* Ruta 404 - Por si se pierden en la mazmorra */}
          <Route path="*" element={<div className="flex h-screen items-center justify-center">404 - Te has perdido en la Infraoscuridad</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
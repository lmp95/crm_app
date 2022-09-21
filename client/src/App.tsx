import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Login from './pages/login';
import { ProtectedRoute } from './routes/route';
import Main from './pages/main';
import './styles/responsive.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path='*'
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <Login />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

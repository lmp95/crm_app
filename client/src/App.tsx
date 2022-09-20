import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Login from './pages/login';
import { ProtectedRoute } from './routes/route';
import { RootState } from './stores/store';
import Main from './pages/main';

function App() {
  const { username } = useSelector((state: RootState) => state.user);
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

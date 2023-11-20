// App.js
import React from 'react';
import './App.css';
import SearchPhotos from "../src/components/SearchPhotos"
import PhotoDetail from "../src/components/PhotoDetail"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    
    <Router>
       <div className="App">
      <div className="container">
        <h1 className="title">Image Gallery App</h1>
     

      <Routes>
        <Route
          exact
          path="/"
          element={<SearchPhotos />}
        />
        <Route
          path="/photos/:id"
          element={<PhotoDetail />}
        />
      </Routes>
      </div>
    </div>
    </Router>
  );
};

export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './views/Landing';
import Home from './views/Home';
import Create from './views/Create';
import Details from './views/Details';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing></Landing>} />
        <Route exact path='/home' element={<Home></Home>} />
        <Route exact path='/videogames/:videogameId/'
          element={<Details></Details>}
        />
        <Route exact path='/create' element={<Create></Create>} />
      </Routes>
    </div>
  );
}

export default App;

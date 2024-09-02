import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Movies from './pages/Movies.jsx'
import MovieInfo from './pages/MovieInfo.jsx';
import Landing from "./components/Landing.jsx";

function App() {

  return (
    <Router>
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search/:keyword" element={<Movies />} />
        <Route path='/:id' element={<MovieInfo />} />
      </Routes>
      <Footer />

    </div>
    </Router>
  );
}

export default App;
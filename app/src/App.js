import './reset.css'
import Box_card from './assets/components/Box_card';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './assets/css/style.scss'

function Home() {

  return (
    <>
      <nav className="lmao">
        
        
      </nav>
    </>
  )
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

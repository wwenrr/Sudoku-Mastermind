import './reset.css'
import Box_card from './assets/components/Box_card';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate  } from 'react-router-dom';
import './assets/css/style.scss'
import image3x3 from './assets/img/3.png'
import image6x6 from './assets/img/4.png'
import image9x9 from './assets/img/5.png'

import left from './assets/img/left-arrow.png'
import right from './assets/img/right-arrow.png'
import Number_card from './assets/components/Number_card';


function Home() {
  const [mode, setMode] = useState(0)

  const navigate = useNavigate();

  function Left() {
    setMode(mode => {
      if(mode===0) return 2;
      return mode-1
    })
  }

  function Right() {
    setMode(mode => {
      if(mode===2) return 0;
      return mode+1
    })
  }

  const handleClick = () => {
    navigate('/game:{mode*3}');
  };

  return (
    <>
      <nav className="nav">
        <div className="dif">
          {mode === 0 && <div className="item_1">3x3 <div href=""><img src={image3x3} alt="" /></div>
          <Link to={`/game/${(mode+1)*3}`} className="mode">
              EASY
              </Link>
          </div>}
          {mode === 1 && <div className="item_2">6x6 <div href=""><img src={image6x6}  alt="" />
          <Link to={`/game/${(mode+1)*3}`} className="mode">
              NORMAL
              </Link>
          </div>
          
          </div>}
          {mode === 2 && <div className="item_3">9x9 <div href=""><img src={image9x9}  alt="" />
            <Link to={`/game/${(mode+1)*3}`} className="mode">
              HARD
            </Link>
          </div>
          
          </div>}
        </div>
      </nav>

      <div className="navigate">
          <div className="left" onClick={Left}>
            <img src={left} alt="" />
          </div>
          <div className="right" onClick={Right}>
            <img src={right} alt="" />
          </div>
        </div>
    </>
  )
}

function App() {
  return (
    <>
      <Router basename="/Sudoku-Mastermind">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:mode" element={<Number_card />} />
        </Routes>
      </Router>

      {/* <Box_card num={9} /> */}
    </>
  );
}

export default App;

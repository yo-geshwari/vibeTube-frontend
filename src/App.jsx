import HeroSection from './components/hero';
import Register from './pages/register';
import LogIn from './pages/login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './pages/profile';
import UploadVid from './pages/uploadVid';
import Player from './pages/player';
import WatchHistory from './pages/history';
import All from './pages/all'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/upload" element={<UploadVid/>}/>
        <Route path="/player" element={<Player/>}/>
        <Route path="/history" element={<WatchHistory/>}/>
        <Route path="/all" element={<All/>}/>
      </Routes>
    </Router>
  );
}

export default App;

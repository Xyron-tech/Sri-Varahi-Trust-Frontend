import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import './App.css';
import Contact from './Components/Contact/Contact';
import ScrollToTop from './Components/Home/ScrollToTop';
import About from './Components/About/About';
import Events from './Components/Event/EventsPage';
import Gallery from './Components/Gallery/Gallery'
import Donate from './Components/Donate/Donate';
import Floating from './Components/Floating/FloatingDonateButton'

const App = () => {
  return (
    <div>
      <Header />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path='/contact' element={<Contact/>}/> 
        <Route path='/events' element={<Events/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/donate' element={<Donate/>}/>
      </Routes>

      <Footer />
      <Floating/>
    </div>
  );
};

export default App;
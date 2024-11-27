import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Routes/Home/Home.jsx';
import Regiter from './components/Routes/Register/Regiter.jsx';
import Login from './components/Login/Login.jsx';
import Profile from './components/Routes/Profile.jsx';
import BeProvider from './components/Routes/BeProvider.jsx';
import Services from './components/Routes/Services.jsx';
import Providers from './components/Routes/Providers.jsx';
import Chat from './components/Routes/Chat.jsx';
import EditProfile from './components/Routes/EditProfile.jsx';
import SingleService from './components/Routes/SingleService.jsx';
import EditService from './components/Routes/EditService.jsx';
import Dashboard from './components/Routes/Dashboard.jsx';
import About from './components/Routes/About.jsx';
import ContactUs from './components/Contact/ContactUs.jsx';
import EditImage from './components/Routes/EditImage.js';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Regiter />} />
        <Route path='/login' element={<Login />} />
        <Route path='/beProvider/:id' element={<BeProvider />} />
        <Route path='/editProfile' element={<EditProfile />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/services' element={<Services />} />
        <Route path='/providers' element={<Providers />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/singleService/:id' element={<SingleService />} />
        <Route path='/editService/:id' element={<EditService />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editImage' element={<EditImage />} />
      </Routes>
    </div>
  );
}

export default App;

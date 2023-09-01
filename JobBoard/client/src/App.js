import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import CompanyDetails from './pages/CompanyDetails';
import CompanyDashboard from './pages/CompanyDashboard';
import JobApplicants from './pages/JobApplicants';
import PostAJob from './pages/PostAJob';
import SignUp from './pages/authForms/SignUp';
import SignIn from './pages/authForms/signIn';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<SignIn />}/>
          <Route path='/CompanyDetails/:id' element={<CompanyDetails />}/>
          <Route path='/CompanyDashboard/:id' element={<CompanyDashboard />}/>
          <Route path='/jobApplicants' element={<JobApplicants />}/>
          <Route path='/jobPostForm/:id' element={<PostAJob />}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

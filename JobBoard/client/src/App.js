import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import AuthForms from './pages/AuthForms';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import CompanyDetails from './pages/CompanyDetails';
import CompanyDashboard from './pages/CompanyDashboard';
import JobApplicants from './pages/JobApplicants';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/form' element={<AuthForms />}/>
          <Route path='/CompanyDetails' element={<CompanyDetails />}/>
          <Route path='/CompanyDashboard' element={<CompanyDashboard />}/>
          <Route path='/jobApplicants' element={<JobApplicants />}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

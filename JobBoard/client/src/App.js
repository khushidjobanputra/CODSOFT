import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import AuthForms from './pages/AuthForms';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <AuthForms />
      <HomePage />
    </ChakraProvider>
  );
}

export default App;

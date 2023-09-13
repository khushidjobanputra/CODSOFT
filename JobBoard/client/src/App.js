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
import Profile from './pages/Profile';
import Home from './pages/Home';
import SavedJobs from './pages/SavedJobs';
import Images from './pages/Image';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/jobs' element={<HomePage />}/>
          <Route path='/jobs/search' element={<HomePage />}/>
          <Route path='/jobs/filters' element={<HomePage />}/>
          <Route path='/images/:id' element={<Images />} />
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<SignIn />}/>
          <Route path='/savedJobs' element={<SavedJobs />}/>
          <Route path='/CompanyDetails/:id' element={<CompanyDetails />}/>
          <Route path='/CompanyDashboard/:id' element={<CompanyDashboard />}/>
          <Route path='/jobApplicants' element={<JobApplicants />}/>
          <Route path='/jobPostForm/:id' element={<PostAJob />}/>
          <Route path='/Profile/:id' element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

/*
One big stupid mistake i was doing from two days wasted so much time
i wanted to store jobPosts after applying filters and i was doing it
let jobPosts = [];
jobPosts = response.data;

and by doing 
const [jobPosts, setJobPosts] = useState([]);
setJobPosts(response.data)

it was solved very silyy mistake
*/
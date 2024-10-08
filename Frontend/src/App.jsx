import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container} from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { RoutesNames } from './services/constants';
import EntryPage from './pages/EntryPage';
import NavBarWineReview from './components/NavBarWineReview';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
 
  function year(){
    const startFrom = 2024;
    const current = new Date().getFullYear();
    if(startFrom===current){
      return current;
    }
    return startFrom + ' - ' + current;
  }

  return (
    <>
    <LoadingSpinner />
      <Container className='app'>
      <NavBarWineReview />
          <Routes>
            <Route path={RoutesNames.HOME} element={<EntryPage />} />
          </Routes>
      </Container>

      <Container>
        Wine Review &copy; {year()}
      </Container>
    </>
  )
}

export default App

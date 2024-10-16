import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container} from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { RoutesNames } from './constants';
import EntryPage from './pages/EntryPage';
import NavBarWineReview from './components/NavBarWineReview';
import LoadingSpinner from './components/LoadingSpinner';
import WineGet from './pages/wine/WineGet';
import EventPlaceGet from './pages/eventplace/EventPlaceGet';
import ReviewerAdd from './pages/reviewer/ReviewerAdd';
import ReviewerGetAll from './pages/reviewer/ReviewerGetAll';
import ReviewerGetById from './pages/reviewer/ReviewerGetById';
import ReviewerUpdate from './pages/reviewer/ReviewerUpdate';

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

            <Route path={RoutesNames.REVIEWER_GET_ALL} element={<ReviewerGetAll />} />
            <Route path={RoutesNames.REVIEWER_ADD} element={<ReviewerAdd />} />
            <Route path={RoutesNames.REVIEWER_GET_BY_ID} element={<ReviewerGetById />} />
            <Route path={RoutesNames.REVIEWER_UPDATE} element={<ReviewerUpdate />} />

            <Route path={RoutesNames.WINE_GET_ALL} element={<WineGet />} />
            <Route path={RoutesNames.EVENTPLACE_GET_ALL} element={<EventPlaceGet />} />

            <Route path={RoutesNames.WINE_GET_BY_ID} element={<WineGet />} />
          </Routes>
      </Container>

      <Container>
        Wine Review &copy; {year()}
      </Container>
    </>
  )
}

export default App

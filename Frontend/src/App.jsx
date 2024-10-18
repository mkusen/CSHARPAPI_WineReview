import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container} from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { RoutesNames } from './constants';
import EntryPage from './pages/EntryPage';
import NavBarWineReview from './components/NavBarWineReview';
import LoadingSpinner from './components/LoadingSpinner';
import ReviewerAdd from './pages/reviewer/ReviewerAdd';
import ReviewerGetAll from './pages/reviewer/ReviewerGetAll';
import ReviewerGetById from './pages/reviewer/ReviewerGetById';
import ReviewerUpdate from './pages/reviewer/ReviewerUpdate';
import WineGetAll from './pages/wine/WineGetAll';
import WineGetById from './pages/wine/WineGetById';
import WineAdd from './pages/wine/WineAdd';
import WineUpdate from './pages/wine/WineUpdate';
import EventPlaceGetAll from './pages/eventplace/EventPlaceGetAll';
import EventPlaceGetById from './pages/eventplace/EventPlaceGetById';
import EventPlaceAdd from './pages/eventplace/EventPlaceAdd';
import EventPlaceUpdate from './pages/eventplace/EventPlaceUpdate';
import TastingGetAll from './pages/tasting/TastingGetAll';
import TastingGetById from './pages/tasting/TastingGetById';
import TastingAdd from './pages/tasting/TastingAdd';
import TastingUpdate from './pages/tasting/TastingUpdate';

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

            <Route path={RoutesNames.WINE_GET_ALL} element={<WineGetAll />} />
            <Route path={RoutesNames.WINE_GET_BY_ID} element={<WineGetById />} />
            <Route path={RoutesNames.WINE_ADD} element={<WineAdd />} />
            <Route path={RoutesNames.WINE_UPDATE} element={<WineUpdate />} />

            <Route path={RoutesNames.EVENTPLACE_GET_ALL} element={<EventPlaceGetAll />} />
            <Route path={RoutesNames.EVENTPLACE_GET_BY_ID} element={<EventPlaceGetById />} />
            <Route path={RoutesNames.EVENTPLACE_ADD} element={<EventPlaceAdd />} />
            <Route path={RoutesNames.EVENTPLACE_UPDATE} element={<EventPlaceUpdate />} />

            <Route path={RoutesNames.TASTING_GET_ALL} element={<TastingGetAll />} />
            <Route path={RoutesNames.TASTING_GET_BY_ID} element={<TastingGetById />} />
            <Route path={RoutesNames.TASTING_ADD} element={<TastingAdd />} />
            <Route path={RoutesNames.TASTING_UPDATE} element={<TastingUpdate />} />
            
          </Routes>

   <br/><strong><p className='right'>Wine Review &copy; {year()}</p> </strong>
       
      </Container>
    </>
  )
}

export default App

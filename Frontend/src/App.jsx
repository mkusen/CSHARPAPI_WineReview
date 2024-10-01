
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarWineReview from './components/NavBarWineReview'
import Start from './pages/Start'
import Reviews from './pages/Reviews'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'


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
    <Container className='App'>
    <NavBarWineReview />
     <Routes>
        <Route path={RoutesNames.HOME} element={<Start />} />
        <Route path={RoutesNames.REVIEWS} element={<Reviews />} />
     </Routes>
    </Container>
    <Container>
      Wine review &copy; {year()}
    </Container>
     
    </>

  )


}

export default App


import './App.css'
import { Container } from 'react-bootstrap'
import NavBarWineReview from './components/NavBarWineReview';
import ReviewCards from './components/ReviewCards';


//this class loads app

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
    <Container className='center'>  
    <NavBarWineReview/> 
    <ReviewCards /> 
    </Container>
    <Container className='copywright'>
      Wine review &copy; {year()}
    </Container>
     
    </>
  )
}

export default App

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../constants';


export default function NavBarWineReview() {

const navigate = useNavigate();



  return (

    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={()=>navigate(RoutesNames.HOME)}><strong>Wine Review</strong></Nav.Link>  

            <NavDropdown title="Recenzija" id="navbarScrollingDropdown">              
             <NavDropdown.Item onClick={()=>navigate(RoutesNames.TASTING_ADD)}>
               Dodaj novu recenziju
             </NavDropdown.Item>
             </NavDropdown>

            <NavDropdown title="Restoran" id="navbarScrollingDropdown">              
             <NavDropdown.Item onClick={()=>navigate(RoutesNames.EVENTPLACE_ADD)}>
               Dodaj novi restoran
             </NavDropdown.Item>
             
             <NavDropdown.Item onClick={()=>navigate(RoutesNames.EVENTPLACE_GET_ALL)}>
               Svi restorani
             </NavDropdown.Item>
           </NavDropdown>
            
            <NavDropdown title="Vina" id="navbarScrollingDropdown">              
             <NavDropdown.Item onClick={()=>navigate(RoutesNames.WINE_ADD)}>
               Dodaj novo vino
             </NavDropdown.Item>
             
             <NavDropdown.Item onClick={()=>navigate(RoutesNames.WINE_GET_ALL)}>
               Sva vina
             </NavDropdown.Item>
           </NavDropdown>

            <NavDropdown title="Recenzenti" id="navbarScrollingDropdown">              
             <NavDropdown.Item onClick={()=>navigate(RoutesNames.REVIEWER_ADD)}>
               Dodaj novog recenzenta
             </NavDropdown.Item>
             
             <NavDropdown.Item onClick={()=>navigate(RoutesNames.REVIEWER_GET_ALL)}>
               Svi recenzenti
             </NavDropdown.Item>
           </NavDropdown>

            <NavDropdown title="Zabava" id="navbarScrollingDropdown">  
             <NavDropdown.Item href="#cyclic">
                Ciklična tablica
              </NavDropdown.Item>
              
              <NavDropdown.Item href="#alcotest">
                Alkotest
              </NavDropdown.Item>
            </NavDropdown>
                   
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
  );
}



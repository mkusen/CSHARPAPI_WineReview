import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { RoutesNames } from '../constants';


export default function NavBarWineReview() {

    const navigate = useNavigate();

    return (
      
        <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
          <Container>
           <Nav.Link onClick={()=>navigate(RoutesNames.HOME)}>Wine review</Nav.Link>
                <Nav.Link href="#user">User</Nav.Link>
                <NavDropdown title="Menu" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#login">LogIn</NavDropdown.Item>
                  <NavDropdown.Item href="#singin">SignIn</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#alcotest">
                    Alkotest
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#about">O aplikaciji</Nav.Link>
        
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Traži"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Traži</Button>
              </Form>
            
          </Container>
        </Navbar>
      );
}
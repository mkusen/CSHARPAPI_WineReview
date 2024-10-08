import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function NavBarWineReview() {

//const navigate = useNavigate();

  return (
  
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand >Wine Review</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#reviewer">Korisnik</Nav.Link>
            <Nav.Link href="#about">O aplikaciji</Nav.Link>
            <NavDropdown title="Zabava" id="navbarScrollingDropdown">
             
              <NavDropdown.Item href="#cyclic">
                Ciklična tablica
              </NavDropdown.Item>
              
              <NavDropdown.Item href="#alcotest">
                Alkotest
              </NavDropdown.Item>
            </NavDropdown>
           
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="upiši min 3 znaka"
              className="me-2"
              aria-label="Pretraži"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}



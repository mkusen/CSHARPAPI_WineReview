import { Link, useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import ReviewerService from "../../services/ReviewerService";
import { RoutesNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";



export default function ReviewerAdd(){

    const navigate = useNavigate();

    const { showLoading, hideLoading } = useLoading();

    async function addReviewer(e) {
        showLoading();
        const response = await ReviewerService.addReviewer(e);
        hideLoading();
        if(response.error){
            alert(response.message);
            return;
        }
        navigate(RoutesNames.REVIEWER_GET_ALL);
    }

    function onSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);
        addReviewer({
                firstName: data.get('firstName'),
                lastName: data.get('lastName'),
                email: data.get('email'),
                pass: data.get('pass')
        });

    }


    return(
        <>
            <Container>
                <br />
                <strong> Dodavanje novog recenzenta </strong>
                <Form onSubmit={onSubmit}>
                    <br />
                    <Form.Group controlId="firstName">
                        <Form.Label>Ime</Form.Label>
                        <Form.Control type="text" name="firstName" required />
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label>Prezime</Form.Label>
                        <Form.Control type="text" name="lastName" required />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" required />
                    </Form.Group>

                    <Form.Group controlId="pass">
                        <Form.Label>Lozinka</Form.Label>
                        <Form.Control type="password" name="pass" />
                    </Form.Group>
                 <br />                 
                    <Row>
                        <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                            <Link to={RoutesNames.REVIEWER_GET_ALL}
                                className="btn btn-danger siroko">
                                Odustani
                            </Link>
                        </Col>
                        <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                            <Button variant="primary" type="submit" className="siroko">
                                Dodaj novog recenzenta
                            </Button>
                        </Col>
                    </Row>
                </Form>

            </Container>
        </>
    )



}
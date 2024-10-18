import { Link, useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import EventPlaceService from "../../services/EventPlaceService";
import { RoutesNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function EventPlaceAdd(){
    const navigate = useNavigate();

    const { showLoading, hideLoading } = useLoading();

    async function addEventPlace(e) {
        showLoading();
        const response = await EventPlaceService.addEventPlace(e);
        hideLoading();
        if(response.error){
            alert(response.message);
            return;
        }
        navigate(RoutesNames.EVENTPLACE_GET_ALL);
    }

    function onSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);
        addEventPlace({
                country: data.get('country'),
                city: data.get('city'), 
                placeName: data.get('placeName'),              
                eventName: data.get('eventName')
        });

    } 

    return (
        <>
            <Container>
                <br />
                <strong> Dodaj novi restoran </strong>
                <Form onSubmit={onSubmit}>
                    <br />
                    <Form.Group controlId="country">
                        <Form.Label>Država</Form.Label>
                        <Form.Control type="text" name="country" required />
                    </Form.Group>

                    <Form.Group controlId="city">
                        <Form.Label>Grad</Form.Label>
                        <Form.Control type="text" name="city" required />
                    </Form.Group>

                    <Form.Group controlId="placeName">
                        <Form.Label>Naziv restorana</Form.Label>
                        <Form.Control type="text" name="placeName" required />
                    </Form.Group>

                    <Form.Group controlId="eventName">
                        <Form.Label>Naziv događaja</Form.Label>
                        <Form.Control type="text" name="eventName" />
                    </Form.Group>
                    <br />
                    <Row>
                        <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                            <Link to={RoutesNames.EVENTPLACE_GET_ALL}
                                className="btn btn-danger siroko">
                                Odustani
                            </Link>
                        </Col>
                        <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                            <Button variant="primary" type="submit" className="siroko">
                                Dodaj
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>

    ) 

}
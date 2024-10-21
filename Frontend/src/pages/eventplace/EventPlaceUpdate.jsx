import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import {Link, useNavigate } from "react-router-dom";
import EventPlaceService from "../../services/EventPlaceService";
import { RoutesNames } from "../../constants";
import { Button, Col, Container, Row, Form } from "react-bootstrap";

export default function EventPlaceUpdate(){

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); 

    const { showLoading, hideLoading } = useLoading();   

    const [eventplace, setEventPlace] = useState({});

    const navigate = useNavigate();

    
    async function EventPlaceById() {
        showLoading();
        const response = await EventPlaceService.getEventPlaceById(id);     
        hideLoading();
        if(response.error){
            alert(response.message);
            return;
        }
        setEventPlace(response.message);
        
    }

    async function UpdateEventPlace(e) {
        showLoading();
        const response = await EventPlaceService.updateEventPlace(id, e);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }
        navigate(RoutesNames.EVENTPLACE_GET_ALL);
    }

    function onSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);
        UpdateEventPlace({
                country: data.get('country'),
                city: data.get('city'), 
                placeName: data.get('placeName'),              
                eventName: data.get('eventName')
        });

    } 

    useEffect(() => {      
        EventPlaceById();       
    }, []);


    return (
        <>
            <Container>

                <br />
                <strong> Promijeni postojeći restoran </strong>
                <Form onSubmit={onSubmit}>
                    <br />
                    <Form.Group controlId="country">
                        <Form.Label>Država</Form.Label>
                        <Form.Control type="text" name="country" required defaultValue={eventplace.country}/>
                    </Form.Group>

                    <Form.Group controlId="city">
                        <Form.Label>Grad</Form.Label>
                        <Form.Control type="text" name="city" required defaultValue={eventplace.city}/>
                    </Form.Group>

                    <Form.Group controlId="placeName">
                        <Form.Label>Naziv restorana</Form.Label>
                        <Form.Control type="text" name="placeName" required defaultValue={eventplace.placeName}/>
                    </Form.Group>

                    <Form.Group controlId="eventName">
                        <Form.Label>Naziv događaja</Form.Label>
                        <Form.Control type="text" name="eventName"  defaultValue={eventplace.eventName}/>
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
                            <Button variant="primary" type="submit" className="buttonPosition">
                                Promijeni
                            </Button>
                        </Col>
                    </Row>
                </Form>


            </Container>
        </>

    ) 
}
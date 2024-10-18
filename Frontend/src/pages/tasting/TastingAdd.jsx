import { Link, useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import { RoutesNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import ReviewerService from "../../services/ReviewerService";
import WineService from "../../services/WineService";
import EventPlaceService from "../../services/EventPlaceService";
import TastingService from "../../services/TastingService";
import Service from '../../services/TastingService';

export default function TastingAdd(){
    const navigate = useNavigate();

    const { showLoading, hideLoading } = useLoading();
    
    const [reviewers, setReviewers] = useState([]);
    const [reviewerId, setReviewerId] = useState(0);

    const [wines, setWines] = useState([]);
    const [wineId, setWineId] = useState(0);

    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState(0);

    async function Revievers() {
        showLoading();
        const response = await ReviewerService.getReviewers();
        setReviewers(response);
        setReviewerId(response[0].id);
        hideLoading();
    }

    async function Wines() {
        showLoading();
        const response = await WineService.getWines();
        setWines(response);
        setWineId(response[0].id);
        hideLoading();        
    }

    async function Events() {
        showLoading();
        const response = await EventPlaceService.getEventPlaces();
        setEvents(response);
        setEventId(response[0].id);
        hideLoading(); 
        
    }

    useEffect(() => {
        Revievers();
        Wines();
        Events();
    }, []);

    async function addTasting(e) {
        showLoading();
        const response = await Service.addTasting(e);
        hideLoading();
        if(response.error){
            alert(response.message + " greška");
            return;
        }
        navigate(RoutesNames.TASTING_GET_ALL);

        
    }

    //2024-02-11T00:00:00
    function onSubmit(e){
        const timestamp = new Date();
        const eventDate = timestamp.toISOString();
        console.log(eventDate);
        e.preventDefault();
        const data = new FormData(e.target);
       
        console.log(reviewerId + " rev id");
        addTasting({
                review: data.get('review'),
                eventDate: eventDate,
                reviewerId: data.get(reviewerId),
                wineId: data.get(wineId),
                eventId: data.get(eventId)
        });

    }


    return(
        <>
            <Container>
                <br />
                <strong>Dodavanje nove recenzije</strong>
                <Form onSubmit={onSubmit}>
                    <br />
                    <Form.Group className='mb-3' controlId="reviewer">
                        <Form.Label>Recenzent</Form.Label>
                        <Form.Select 
                        onChange={(e)=>{setReviewerId(e.target.value)}}>
                            {reviewers && reviewers.map((r, index) => (
                                <option key={index} value={r.id}>
                                    {r.firstName} {r.lastName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId="wine">
                        <Form.Label>Vino</Form.Label>
                        <Form.Select 
                        onChange={(e)=>{setWineId(e.target.value)}}>
                            {wines && wines.map((w, index) => (
                                <option key={index} value={w.id}>
                                    {w.maker}, {w.wineName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId="event">
                        <Form.Label>Restoran</Form.Label>
                        <Form.Select 
                        onChange={(e)=>{setEventId(e.target.value)}}>
                            {events && events.map((ev, index) => (
                                <option key={index} value={ev.id}>
                                    {ev.country}, {ev.placeName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    

                    <Form.Group controlId="review">
                        <Form.Label>Recenzija</Form.Label>
                        <Form.Control placeholder="obavezo polje" as="textarea" rows={5} name="review" required/>
                    </Form.Group>
                 <br />                 
                    <Row>
                        <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                            <Link to={RoutesNames.TASTING_GET_ALL}
                                className="btn btn-danger siroko">
                                Odustani
                            </Link>
                        </Col>
                        <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                            <Button variant="primary" type="submit" className="siroko">
                                Dodaj novi događaj
                            </Button>
                        </Col>
                    </Row>
                </Form>

            </Container>
        </>
    )

}
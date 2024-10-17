import { useEffect, useState } from "react";
import EventPlaceService from "../../services/EventPlaceService";
import useLoading from "../../hooks/useLoading";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";


export default function EventPlaceGetAll() {

    const UpdateEventPlace = (id) => window.location.href=`/updateEventPlace?id=${id}`;

    const [eventplaces, setEventPlaces] = useState();
   
    const { showLoading, hideLoading } = useLoading();

    async function EventPlacesGet() {
        await EventPlaceService.getEventPlaces()
            .then((response) => {
                console.log(response);
                setEventPlaces(response);
               
            })
            .catch((e) => { console.error(e) });
           
    }

    async function DeleteEventPlace(id) {
        showLoading();
        const response =await EventPlaceService.deleteEventPlace(id);
        hideLoading();
        if(response.error){
         alert(response.message);
         return;
        }
        EventPlacesGet();
 
     }

    useEffect(() => {
        showLoading();
        EventPlacesGet();
        hideLoading();
    }, []);

    return (
        <>
            <Container>
                <Stack gap={3} >
                    <br/>
                    <Row>
                        {eventplaces && eventplaces.map((e) => (
                            <Col key={e.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{e.placeName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{e.city}  <br /> {e.country}</Card.Subtitle>
                                        <Card.Link onClick={()=>UpdateEventPlace(e.id)}>Promijeni</Card.Link>
                                        <Card.Link onClick={()=>DeleteEventPlace(e.id)}>Obriši</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Stack>
            </Container>

        </>
    )

   
}


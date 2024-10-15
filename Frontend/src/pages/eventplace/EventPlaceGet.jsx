import { useEffect, useState } from "react";
import EventPlaceService from "../../services/EventPlaceService";
import useLoading from "../../hooks/useLoading";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";


export default function EventPlaceGet() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');  

    //const [eventplaces, setEventPlaces] = useState();
    const [eventplace, setEventPlace] = useState();
    const { showLoading, hideLoading } = useLoading();

    // async function EventPlacesGet() {
    //     await EventPlaceService.getEventPlaces()
    //         .then((response) => {
    //             setEventPlaces(response);
               
    //         })
    //         .catch((e) => { console.error(e) });

           
    // }

    async function EventPlaceById() {
        await EventPlaceService.getEventPlaceById(id)
        .then((response)=>{
            console.log(response);
            console.log("id event " + id);
            setEventPlace(response);
        })
        .catch((e)=>{console.log(e)});
    }

    useEffect(() => {
        showLoading();
        //EventPlacesGet();
        EventPlaceById();
        hideLoading();
    }, []);

    return (
        <>
            <Container>
                <Stack gap={3} >
                    <Row>
                        {(eventplace) && eventplace.lenght > 0 ? (eventplace.map((e) => (
                            <Col key={e.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{e.placeName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{e.city} + <br /> + {e.contry}</Card.Subtitle>
                                        <Card.Link href="#">Promijeni</Card.Link>
                                        <Card.Link href="#">Obriši</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))) : (
                            <div>Restoran nije pronađen</div>
                        )}
                    </Row>
                </Stack>
            </Container>

        </>
    )

   
}


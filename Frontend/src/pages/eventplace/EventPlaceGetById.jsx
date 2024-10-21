import { useEffect, useState } from "react";
import EventPlaceService from "../../services/EventPlaceService";
import { useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import { RoutesNames } from "../../constants";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";



export default function EventPlaceGetById(){

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); 
    
    const UpdateEventPlace = (id) => window.location.href=`/updateEventPlace?id=${id}`;

    const [eventplace, setEventPlace] = useState({});
    const { showLoading, hideLoading } = useLoading();

    const navigate = useNavigate();

    async function EventPlaceById() {

        showLoading();
        await EventPlaceService.getEventPlaceById(id)
        .then((response)=>{
            setEventPlace(response.message);
            hideLoading();
        })
        .catch((e)=>{console.log(e)});
        hideLoading();
    }


    async function DeleteEventPlace(id) {
        showLoading();
        const response =await EventPlaceService.deleteEventPlace(id);
        hideLoading();
        if(response.error){
         alert(response.message);
         return;
        }
      navigate(RoutesNames.EVENTPLACE_GET_ALL);
 
     }

    useEffect(() => {
        EventPlaceById();       
    }, []);


    return (
        <>
           <Container>
                <br />
                <Stack gap={3} >
                    <Row>                      
                            <Col key={eventplace.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{eventplace.placeName}</Card.Title>
                                        <Card.Text>
                                            {eventplace.country} <br /> {eventplace.city}
                                            <br /> {eventplace.eventName}
                                        </Card.Text>                                        
                                        <Button variant="outline-light" size="md"  onClick={()=>UpdateEventPlace(eventplace.id)}>Promijeni</Button>
                                        <Button variant="outline-danger" size="md" className="buttonPosition"  onClick={()=>DeleteEventPlace(eventplace.id)}>Obriši</Button>
                                    </Card.Body>
                                </Card>
                            </Col>                     
                    </Row>
                </Stack>
            </Container>

        </>
    )


 

}
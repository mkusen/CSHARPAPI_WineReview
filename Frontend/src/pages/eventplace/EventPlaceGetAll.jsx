import { useEffect, useState } from "react";
import EventPlaceService from "../../services/EventPlaceService";
import useLoading from "../../hooks/useLoading";
import { Button, Card, Col, Container, Pagination, Row, Stack } from "react-bootstrap";


export default function EventPlaceGetAll() {

    const UpdateEventPlace = (id) => window.location.href=`/updateEventPlace?id=${id}`;

    const [eventplaces, setEventPlaces] = useState();   
    const { showLoading, hideLoading } = useLoading();    
    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState('');

    async function EventPlacesGet() {
        showLoading();
        const response = await EventPlaceService.getPages(page, condition);
        hideLoading();
        if (response.error) {
            alert('Nije moguće dohvatiti podatke');
            return;
        }
        if (response.message.length == 0) {
            setPage(page - 1);
            return;
        }
        setEventPlaces(response.message);
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
        EventPlacesGet(); 
     }

     function changeCondition(e) {
        if (e.nativeEvent.key == "Enter") {
            setPage(1);
            setCondition(e.nativeEvent.srcElement.value);
        }
    }

     function nextPage() {
        setPage(page + 1);
      }
    
      function previousPage() {
        if(page==1){
            return;
        } 
        setPage(page - 1);
      }    


    useEffect(() => {       
        EventPlacesGet();
       }, [page, condition]);

    return (
        <>
            <Container>
                <br />
                <h4>Svi restorani</h4>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination size="md" position="center">
                                <Pagination.Prev onClick={previousPage} />
                                <Pagination.Item disabled>{page}</Pagination.Item> 
                                <Pagination.Next
                                    onClick={nextPage}
                                />
                            </Pagination>
                         </div>
                <Stack gap={3} >                
                    <Row>
                        {eventplaces && eventplaces.map((e) => (
                            <Col key={e.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{e.placeName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{e.city}  <br /> {e.country}</Card.Subtitle>
                                        <Button variant="outline-light" size="md"  onClick={()=>UpdateEventPlace(e.id)}>Promijeni</Button>
                                        <Button variant="outline-danger" size="md" className="buttonPosition" onClick={()=>DeleteEventPlace(e.id)}>Obriši</Button>
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


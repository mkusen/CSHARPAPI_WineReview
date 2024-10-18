import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import TastingService from "../../services/TastingService";
import { Card, Col, Container, Row, Stack} from "react-bootstrap";


export default function TastingGetAll() {
    const [tastings, setTastings] = useState();
    
    const { showLoading, hideLoading } = useLoading();

    const WineById = (id) => window.location.href=`/wineById?id=${id}`;
    const ReviewerById = (id) => window.location.href=`/reviewerById?id=${id}`;
    const EventPlaceById = (id) => window.location.href=`/eventplaceById?id=${id}`;
    
  

    async function TastingGetAll() {  
       
        await TastingService.getTastings()
            .then((response) => {                
                setTastings(response);  
                                       
            })
            .catch((e) => { console.error(e) });  
               
    }


    
    useEffect(() => { 
        showLoading();  
        TastingGetAll(); 
        hideLoading();  
    })


    return (
        <>
            <Container>
            <br />
                <h4>Sve recenzije</h4>      
                <Stack gap={3} >
                    <Row>
                        {tastings && tastings.map((t) => (
                            <Col key={t.id}>
                                <Card style={{ width: '16rem' }}>
                                    <Card.Body>
                                        <Card.Link onClick={() => WineById(t.wineId)}>{t.wineName}</Card.Link>
                                        <br />
                                        <Card.Link onClick={() => EventPlaceById(t.eventId)}>{t.eventName}</Card.Link>
                                        <Card.Text>  <br /> {t.review}
                                        </Card.Text>
                                        <Card.Link onClick={() => ReviewerById(t.reviewerId)}>{t.reviewerName}</Card.Link>
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


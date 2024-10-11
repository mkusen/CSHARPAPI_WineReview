import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import TastingService from "../../services/TastingService";
import { Card, Col, Container, Nav } from "react-bootstrap";
import { RoutesNames } from "../../constants";
import { useNavigate } from "react-router-dom";


export default function TastingGet() {
    const [tastings, setTastings] = useState();
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();

    async function TastingGet() {
        await TastingService.getTastings()
            .then((response) => {
                setTastings(response);              
            })
            .catch((e) => { console.error(e) });
    }


    useEffect(() => {
        showLoading();
            TastingGet();
        hideLoading();
    })


    return (
        <>
            <Container>
                {tastings && tastings.map((t) =>(
                        <Col key={t.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Link href="Wine">{t.wineName}</Card.Link>
                                    <Card.Subtitle className="mb-2 text-muted">{t.eventName}</Card.Subtitle>
                                    <Card.Text>{t.review}
                                        
                                                                              
                                        </Card.Text>                                   
                                    <Card.Link href="Reviewer">{t.reviewerName}</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                ))}
            </Container>
        </>
    )



}


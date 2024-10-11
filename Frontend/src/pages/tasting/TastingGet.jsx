import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import TastingService from "../../services/TastingService";
import { Card, Col, Container } from "react-bootstrap";


export default function TastingGet() {
    const [tastings, setTastings] = useState();
    const { showLoading, hideLoading } = useLoading();
 

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
                                    <Card.Title>{t.wineName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{t.eventName}</Card.Subtitle>
                                    <Card.Text>
                                    {t.review}
                                    </Card.Text>
                                    <Card.Link href="#">Klikni za više</Card.Link>
                                    <Card.Link href="#">{t.reviewerName}</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                ))}
            </Container>
        </>
    )



}


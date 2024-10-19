import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import TastingService from "../../services/TastingService";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";


export default function TastingGetAll() {
    const [tastings, setTastings] = useState();

    const { showLoading, hideLoading } = useLoading();

    const WineById = (id) => window.location.href = `/wineById?id=${id}`;
    const ReviewerById = (id) => window.location.href = `/reviewerById?id=${id}`;
    const EventPlaceById = (id) => window.location.href = `/eventplaceById?id=${id}`;
    const TastingGetById = (id) => window.location.href = `/tastingById?id=${id}`;


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
                                        <Button variant="outline-primary" size="md" onClick={() => WineById(t.wineId)}>{t.wineName}</Button>
                                        <Button variant="outline-primary" size="md" onClick={() => EventPlaceById(t.eventId)}>{t.eventName}</Button>
                                        <Button variant="outline-primary" size="md" onClick={() => ReviewerById(t.reviewerId)}>{t.reviewerName}</Button>
                                        <Card.Text className="middle">  <br /> {t.review}</Card.Text>
                                        <Button variant="outline-primary" type="submit" size="md" className="d-grid gap-2"
                                            onClick={() => TastingGetById(t.id)}>
                                            Uredi recenziju
                                        </Button>

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


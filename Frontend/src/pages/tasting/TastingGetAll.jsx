import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import TastingService from "../../services/TastingService";
import { Button, Card, Col, Container, Pagination, Row, Stack } from "react-bootstrap";


export default function TastingGetAll() {
    const [tastings, setTastings] = useState();
    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState('');

    const { showLoading, hideLoading } = useLoading();

    const WineById = (id) => window.location.href = `/wineById?id=${id}`;
    const ReviewerById = (id) => window.location.href = `/reviewerById?id=${id}`;
    const EventPlaceById = (id) => window.location.href = `/eventplaceById?id=${id}`;
    const TastingGetById = (id) => window.location.href = `/tastingById?id=${id}`;


    async function TastingGetAll() {
        showLoading();
        const response = await TastingService.getPages(page, condition);
        hideLoading();
        if (response.error) {
            alert('Nije moguće dohvatiti podatke');
            return;
        }
        if (response.message.length == 0) {
            setPage(page - 1);
            return;
        }
        setTastings(response.message);
        hideLoading();
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
        TastingGetAll();
    }, [page, condition]);


    return (
        <>
            <body>
                <Container >
                    <br />
                    <h4>Sve recenzije</h4>
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
                            {tastings && tastings.map((t) => (
                                <Col key={t.id}>
                            
                                    <Card style={{ width: '16rem' }}>
                                    
                                        <Card.Body>
                                            <Button variant="outline-light" size="md" onClick={() => WineById(t.wineId)}>{t.wineName}</Button>
                                           
                                            <Button variant="outline-light" size="md" onClick={() => EventPlaceById(t.eventId)}>{t.eventName}</Button>
                                            <Button variant="outline-light" size="md" onClick={() => ReviewerById(t.reviewerId)}>{t.reviewerName}</Button>
                                            <Card.Text >  <br /> {t.review}</Card.Text>
                                            <Button variant="outline-light" type="submit" size="md" className="d-grid gap-2"
                                                onClick={() => TastingGetById(t.id)}>
                                                Uredi recenziju
                                            </Button>

                                        </Card.Body>

                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Stack>
                    <br/>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination size="md" position="center">
                                <Pagination.Prev onClick={previousPage} />
                                <Pagination.Item disabled>{page}</Pagination.Item> 
                                <Pagination.Next
                                    onClick={nextPage}
                                />
                            </Pagination>
                         </div>
                </Container>
            </body>
        </>
    )



}


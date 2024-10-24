import { useEffect, useState } from "react";
import WineService from "../../services/WineService";
import { Button, Card, Col, Container, Form, Pagination, Row, Stack } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import { BACKEND_URL } from "../../constants";
import noimage from '../../assets/noimage.png'; 

export default function WineGetAll() {

    const UpdateWine = (id) => window.location.href = `/updateWine?id=${id}`;

    const [wines, setWines] = useState();
    const { showLoading, hideLoading } = useLoading();
    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState('');

    async function WinesGet() {
        showLoading();
        const response = await WineService.getPages(page, condition);
        hideLoading();
        if (response.error) {
            alert('Nije moguće dohvatiti podatke');
            return;
        }
        if (response.message.length == 0) {
            setPage(page - 1);
            return;
        }
        setWines(response.message);
        hideLoading();
    }

    async function DeleteWine(id) {
        showLoading();
        const response = await WineService.deleteWine(id);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }
        WinesGet();
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
        if (page == 1) {
            return;
        }
        setPage(page - 1);
    }

    function search(e) {
        if (e.nativeEvent.key == "Enter") {
            console.log('Enter')
            setPage(1);
            setCondition(e.nativeEvent.srcElement.value);
            setWines([]);

        }
    }

    function pics(w) {

        if (w.pics != null) {
            return BACKEND_URL + w.pics + `?${Date.now()}`;
        }

        return noimage;
    }


    useEffect(() => {
        WinesGet();
    }, [page, condition]);


    return (
        <>
            <Container>
                <br />
                <h4>Sva vina</h4>
                <Col key={1} sm={12} lg={4} md={4}>
                    <Form.Control
                        type='text'
                        name='searchbar'
                        placeholder='pretraži [Enter]'
                        maxLength={255}
                        defaultValue=''
                        onKeyUp={search}
                    />
                </Col>
                <br />

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
                        {wines && wines.map((w) => (
                            <Col key={w.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={pics(w)} />
                                    <Card.Body>
                                        <Card.Title>{w.maker}</Card.Title>
                                        <Card.Text>
                                            {w.wineName} <br /> {"Berba " + w.yearOfHarvest}
                                            <br /> {"Cijena: " + w.price + " €"}
                                        </Card.Text>
                                        <Button variant="outline-light" size="md" onClick={() => UpdateWine(w.id)}>Promijeni</Button>
                                        <Button variant="outline-danger" size="md" className="buttonPosition" onClick={() => DeleteWine(w.id)}>Obriši</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Stack>

                <br />
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
        </>
    );
}
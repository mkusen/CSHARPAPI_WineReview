import { useEffect, useState } from "react";
import WineService from "../../services/WineService";
import { Card, Col, Container } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";

export default function WineGet() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');  

    const [wine, setWine] = useState();

    const { showLoading, hideLoading } = useLoading();

    async function WineById() {
        await WineService.getWineById(id)
            .then((response) => {
                console.log(response);
                console.log("id wine " + id);
                setWine(response);
            })
            .catch((e) => { console.error(e) });
    }

    useEffect(() => {
        showLoading();
        WineById();
        hideLoading();
    }, []);

    return (
        <>
            <Container>
                {Array.isArray(wine) && wine.lengt > 0 ? (wine.map((w) =>(
                    <Col key={w.id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{w.maker}</Card.Title>
                                <Card.Text>
                                    {w.wineName} <br /> {"Berba " + w.yearOfHarvest}
                                    <br /> {"Cijena: " + w.price + " €"}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))):(
                    <div>Vino nije dostupno</div>
                )}

            </Container>
        </>
    )

}
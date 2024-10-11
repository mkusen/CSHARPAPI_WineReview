import { useEffect, useState } from "react";
import WineService from "../../services/WineService";
import { Container } from "react-bootstrap";

export default function WineGet() {

    const [wine, setWine] = useState();

    async function WineGetById(id) {
        await WineService.getWineById(id)
            .then((response) => {
                setWine(response);
            })
            .catch((e) => { console.error(e) });
    }
    useEffect(() => {
        WineGetById();
    })

    return (
        <>
            <Container>
                {wine && wine.map((w) => (
                    <Col key={w.id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{w.maker}</Card.Title>
                            <Card.Text>
                                {w.wineMaker + <br /> + w.wineName + <br /> + w.yearOfHarvest
                                + <br /> + w.price}
                                
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                    </Col>
                ))}

            </Container>
        </>
    )

}
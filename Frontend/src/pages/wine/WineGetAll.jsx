import { useEffect, useState } from "react";
import WineService from "../../services/WineService";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";

export default function WineGetAll() {  
    
    const UpdateWine = (id) => window.location.href=`/updateWine?id=${id}`;

    const [wines, setWines] = useState();

    const { showLoading, hideLoading } = useLoading();

    async function WinesGet() {   
        
        await WineService.getWines()
            .then((response) => {
                console.log(response);
                setWines(response);
            })
            .catch((e) => { console.error(e) });
    }

    async function DeleteWine(id) {
        showLoading();
        const response =await WineService.deleteWine(id);
        hideLoading();
        if(response.error){
         alert(response.message);
         return;
        }
        WinesGet();
 
     }

    useEffect(() => {
        showLoading();
        WinesGet();
        hideLoading();
    }, []);

    return (
        <>
            <Container>
                <br />
                <Stack gap={3} >
                    <Row>
                        {wines && wines.map((w) => (
                            <Col key={w.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{w.maker}</Card.Title>
                                        <Card.Text>
                                            {w.wineName} <br /> {"Berba " + w.yearOfHarvest}
                                            <br /> {"Cijena: " + w.price + " €"}
                                        </Card.Text>
                                        
                                        <Card.Link onClick={()=>UpdateWine(w.id)}>Promijeni</Card.Link>
                                        <Card.Link onClick={()=>DeleteWine(w.id)}>Obriši</Card.Link>
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
import { useEffect, useState } from "react";
import WineService from "../../services/WineService";
import { Card, Col, Container } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import { RoutesNames } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function WineGet() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');  

    const {wine, setWine} = useState();

    const { showLoading, hideLoading } = useLoading();

    const navigate = useNavigate();

    async function WineById() {
        console.log(id)
        // if(parseInt(id)==null){
        //     navigate(RoutesNames.HOME);
        // }
        
        await WineService.getWineById(id)
            .then((response) => {
                console.log(response);
                console.log("id wine " + id);
                setWine(response);
            })
            .catch((e) => { console.error(e) });
    }

    useEffect(() => {
        //showLoading();
 console.log(id)
        WineById();
       // hideLoading();
    }, []);

    return (
        <>
            <Container>                
                    <Col key={wine.id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{wine.maker}</Card.Title>
                                <Card.Text>
                                    {wine.wineName} <br /> {"Berba " + wine.yearOfHarvest}
                                    <br /> {"Cijena: " + wine.price + " €"}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>                
            </Container>
        </>
    )

}
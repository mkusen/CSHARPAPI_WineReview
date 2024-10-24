import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { useNavigate } from "react-router-dom";
import WineService from "../../services/WineService";
import { BACKEND_URL, RoutesNames } from "../../constants";
import { Button, Card, Col, Container, Image, Row, Stack } from "react-bootstrap";
import noimage from '../../assets/noimage.png';




export default function WineGetById() {   

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');  

    const UpdateWine = (id) => window.location.href=`/updateWine?id=${id}`;
    
    const [wine, setWine] = useState({});
    const { showLoading, hideLoading } = useLoading();
    const [currentImage, setCurrentImage] = useState('');

    const navigate = useNavigate();

    async function WineById() {
        showLoading();
        await WineService.getWineById(id)
        .then((response)=>{
            setWine(response.message);
            if (response.message.pics != null) {
                setCurrentImage(BACKEND_URL + response.message.pics + `?${Date.now()}`);
            } else {
                setCurrentImage(noimage);
            }
            hideLoading();
        })
        .catch((e)=>{console.log(e)});
        hideLoading();

        
        
    }

    async function DeleteWine(id) {
        showLoading();
        const response =await WineService.deleteWine(id);
        hideLoading();
        if(response.error){
         alert(response.message);
         return;
        }
      navigate(RoutesNames.WINE_GET_ALL);
 
     }

     function pics(w) {

        if (w.pics != null) {
            return BACKEND_URL + w.pics + `?${Date.now()}`;
        }

        return noimage;
    }

    useEffect(() => {
        WineById();       
    }, []);


    return (
        <>
            <Container>
                <br />
                <Stack gap={3} >
                    <Row>
                        <Col key={wine.id}>
                       
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={pics(wine)} />
                                <Card.Body>
                               
                                    <Card.Title>{wine.maker}</Card.Title>
                                    <Card.Text>
                                        {wine.wineName} <br /> {"Berba " + wine.yearOfHarvest}
                                        <br /> {"Cijena: " + wine.price + " €"}
                                    </Card.Text>

                                    <Button variant="outline-light" size="md" onClick={() => UpdateWine(wine.id)}>Promijeni</Button>
                                    <Button variant="outline-danger" size="md" className="buttonPosition" onClick={() => DeleteWine(wine.id)}>Obriši</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Stack>
            </Container>

        </>
    )



   
}
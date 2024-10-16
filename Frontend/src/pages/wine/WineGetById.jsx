import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { useNavigate } from "react-router-dom";
import WineService from "../../services/WineService";
import { RoutesNames } from "../../constants";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";




export default function WineGetById() {   

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');  

    const UpdateWine = (id) => window.location.href=`/updateWine?id=${id}`;
    
    const [wine, setWine] = useState({});
    const { showLoading, hideLoading } = useLoading();

    const navigate = useNavigate();

    async function WineById() {
        showLoading();
        await WineService.getWineById(id)
        .then((response)=>{
            console.log(response);
            console.log("id wine " + id);
            setWine(response.message);
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
                                    <Card.Body>
                                        <Card.Title>{wine.maker}</Card.Title>
                                        <Card.Text>
                                            {wine.wineName} <br /> {"Berba " + wine.yearOfHarvest}
                                            <br /> {"Cijena: " + wine.price + " €"}
                                        </Card.Text>
                                        
                                        <Card.Link onClick={()=>UpdateWine(wine.id)}>Promijeni</Card.Link>
                                        <Card.Link onClick={()=>DeleteWine(wine.id)}>Obriši</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                     
                    </Row>
                </Stack>
            </Container>

        </>
    )



   }
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { Link, useNavigate } from "react-router-dom";
import WineService from "../../services/WineService";
import { RoutesNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";


export default function WineUpdate(){

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); 

    const { showLoading, hideLoading } = useLoading();   

    const [wine, setWine] = useState({});

    const navigate = useNavigate();

    
    async function WineById() {
        showLoading();
        const response = await WineService.getWineById(id);     
        hideLoading();

        if(response.error){
            alert(response.message);
            return;
        }
       setWine(response.message);
        
    }

    async function UpdateWine(e) {
        showLoading();
        const response = await WineService.updateWine(id, e);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }

        navigate(RoutesNames.WINE_GET_ALL);
    }

    function onSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);
        UpdateWine({
                maker: data.get('maker'),
                wineName: data.get('wineName'), 
                yearOfHarvest: data.get('yearOfHarvest'),              
                price: data.get('price')
        });

    } 

    useEffect(() => {      
       WineById();       
    }, []);


    return (
        <>
            <Container>

                <br />
                <strong> Promijeni postojeće vino </strong>
                <Form onSubmit={onSubmit}>
                    <br />
                    <Form.Group controlId="maker">
                        <Form.Label>Proizvođač</Form.Label>
                        <Form.Control type="text" name="maker" required defaultValue={wine.maker}/>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Cijena</Form.Label>
                        <Form.Control type="decimal" name="price" defaultValue={wine.price}/>
                    </Form.Group>

                    <Form.Group controlId="wineName">
                        <Form.Label>Naziv vina</Form.Label>
                        <Form.Control type="text" name="wineName" required defaultValue={wine.wineName}/>
                    </Form.Group>

                    <Form.Group controlId="yearOfHarvest">
                        <Form.Label>Berba</Form.Label>
                        <Form.Control type="text" name="yearOfHarvest" required defaultValue={wine.yearOfHarvest}/>
                    </Form.Group>
                    <br />
                    <Row>
                        <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                            <Link to={RoutesNames.WINE_GET_ALL}
                                className="btn btn-danger siroko">
                                Odustani
                            </Link>
                        </Col>
                        <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                            <Button variant="primary" type="submit" className="buttonPosition">
                               Promijeni
                            </Button>
                        </Col>
                    </Row>
                </Form>


            </Container>
        </>

    )
}
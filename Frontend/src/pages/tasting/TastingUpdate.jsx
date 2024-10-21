import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import TastingService from "../../services/TastingService";
import { RoutesNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function TastingUpdate(){

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); 

    console.log(id + " došlo se tastingById")

    const { showLoading, hideLoading } = useLoading();
    const [tasting, setTasting] = useState([]);


    const navigate = useNavigate();

    
    async function TastingById() {
        showLoading();
        const response = await TastingService.getTastingByID(id); 
        console.log(response.message)    
        hideLoading();

        if(response.error){
            alert(response.message);
            return;
        }
       setTasting(response.message);
        
    }

    async function UpdateTasting(e) {
        showLoading();
        const response = await TastingService.updateTasting(id, e);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }
        navigate(RoutesNames.TASTING_GET_ALL);
    }

    function onSubmit(e){
        const timestamp = new Date();
        const eventDate = timestamp.toISOString();
        e.preventDefault();
        const data = new FormData(e.target);       
        UpdateTasting({
            review: data.get('review'),
            eventDate: eventDate,
            reviewerId: parseInt(tasting.reviewerId),
            wineId: parseInt(tasting.wineId),
            eventId: parseInt(tasting.eventId)
        });

    } 

    useEffect(() => { 
        TastingById();              
    }, []);


    return (
        <>
        <Container>
            <br />
            <strong><h2>Izmijeni recenziju</h2></strong>
            <Form onSubmit={onSubmit}>
                <br />
                   <strong><Form.Label><h5 className="colorBlue">Recenzent:</h5> {tasting.reviewerName}</Form.Label></strong> 
                    <br/>
                    <strong><Form.Label><h5 className="colorBlue">Vino:</h5>{tasting.wineName}</Form.Label></strong>
                    <br/>
                    <strong><Form.Label><h5 className="colorBlue">Restoran:</h5>{tasting.eventName}</Form.Label></strong> 
                    <br/>                                      
                    <Form.Group controlId="review">
                    <strong><Form.Label className="colorRed">Recenzija</Form.Label></strong>
                    <Form.Control placeholder="obavezo polje" as="textarea" rows={5} name="review" required defaultValue={tasting.review}/>
                </Form.Group>
             <br />                 
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RoutesNames.TASTING_GET_ALL} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="primary" type="submit">
                            Izmijeni recenziju
                        </Button>
                    </Col>
                </Row>
            </Form>

        </Container>
    </>

    )
}
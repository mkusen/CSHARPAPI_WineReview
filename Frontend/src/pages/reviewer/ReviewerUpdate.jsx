import { Link, useNavigate} from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import ReviewerService from "../../services/ReviewerService";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { RoutesNames } from "../../constants";

export default function ReviewerUpdate() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); 

    const { showLoading, hideLoading } = useLoading();   

    const [reviewer, setReviewer] = useState({});

    const navigate = useNavigate();

    
    async function ReviewerById() {
        showLoading();
        const response = await ReviewerService.getReviewerById(id);     
        hideLoading();

        if(response.error){
            alert(response.message);
            return;
        }
       setReviewer(response.message);
        
    }

    async function UpdateReviewer(e) {
        showLoading();
        const response = await ReviewerService.updateReviewer(id, e);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }

        navigate(RoutesNames.REVIEWER_GET_ALL);
    }

    function onSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);
        UpdateReviewer({
                firstName: data.get('firstName'),
                lastName: data.get('lastName'), 
                email: data.get('email'),              
                pass: data.get('pass')
        });

    } 

    useEffect(() => {      
       ReviewerById();       
    }, []);


    return(
        <>
            <Container>
                <br />
                <strong> Izmijeni postojećeg korisnika </strong>
                <Form onSubmit={onSubmit}>
                    <br />
                    <Form.Group controlId="firstName">
                        <Form.Label>Ime</Form.Label>
                        <Form.Control type="text" name="firstName" required defaultValue={reviewer.firstName}/>                        
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label>Prezime</Form.Label>
                        <Form.Control type="text" name="lastName" required defaultValue={reviewer.lastName}/>
                    </Form.Group>
                    
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" required defaultValue={reviewer.email}/>
                    </Form.Group>

                    <Form.Group controlId="pass">
                        <Form.Label>Lozinka</Form.Label>
                        <Form.Control type="password" name="pass" placeholder="Potrebno je upisati novu lozinku" />
                    </Form.Group>
                 <br />                 
                    <Row>
                        <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                            <Link to={RoutesNames.REVIEWER_GET_ALL}
                                className="btn btn-danger siroko">
                                Odustani
                            </Link>
                        </Col>
                        <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                            <Button variant="primary" type="submit" className="buttonPosition">
                                Izmijeni postojećeg korisnika
                            </Button>
                        </Col>
                    </Row>
                </Form>

            </Container>
        </>
    )



}
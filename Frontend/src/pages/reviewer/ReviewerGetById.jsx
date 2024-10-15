import { useEffect, useState } from "react";
import ReviewerService from "../../services/ReviewerService";
import useLoading from "../../hooks/useLoading";
import { Card, Col, Container } from "react-bootstrap";


export default function ReviewerGetById() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');  
    
    const [reviewer, setReviewer] = useState({});
    const { showLoading, hideLoading } = useLoading();

    async function ReviewerById() {

        await ReviewerService.getReviewerById(id)
        .then((response)=>{
            console.log(response);
            console.log("id reviever " + id);

            setReviewer(response.message);
        })
        .catch((e)=>{console.log(e)});
        
    }

    useEffect(() => {
        showLoading();
        ReviewerById();
        hideLoading();
    }, []);


    return (
        <>
            <Container>
                
                    <Col key={1}>
                     <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{reviewer.firstName} {reviewer.lastName}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{reviewer.email}</Card.Subtitle>
                            <Card.Link href="#">Promijeni</Card.Link>
                            <Card.Link href="#">Obriši</Card.Link>
                        </Card.Body>
                    </Card>  
                    </Col>
              
            </Container>

        </>
    )


}
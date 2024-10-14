import { useEffect, useState } from "react";
import ReviewerService from "../../services/ReviewerService";
import useLoading from "../../hooks/useLoading";
import { Card, Col, Container } from "react-bootstrap";


//this file parse and represents data from backend to UI

export default function ReviewerGet() {

    const [reviewers, setReviewers] = useState();

    const { showLoading, hideLoading } = useLoading();

    async function ReviewersGet() {  
        await ReviewerService.getReviewers()      
            .then((response) => {
                setReviewers(response);
                console.log(response);              
            })
            .catch((e) => { console.log(e) });
      
    }

    useEffect(() => {
        showLoading();
        ReviewersGet();
        hideLoading();
    }, []);


    return (
        <>
            <Container>
                {reviewers && reviewers.map((r) =>(
                    <Col key={r.id}>
                     <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{r.firstName} {r.lastName}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{r.email}</Card.Subtitle>
                            <Card.Link href="#">Promijeni</Card.Link>
                            <Card.Link href="#">Obriši</Card.Link>
                        </Card.Body>
                    </Card>  
                    </Col>
                ))}
            </Container>

        </>
    )


}
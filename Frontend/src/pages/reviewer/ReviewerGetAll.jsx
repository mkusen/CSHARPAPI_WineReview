import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import ReviewerService from "../../services/ReviewerService";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";

export default function ReviewerGetAll() {

    const UpdateReviewer = (id) => window.location.href=`/updateReviewer?id=${id}`;

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

    async function DeleteReviewer(id) {
       showLoading();
       const response =await ReviewerService.deleteReviewer(id);
       hideLoading();
       if(response.error){
        alert(response.message);
        return;
       }
       ReviewersGet();

    }

    useEffect(() => {
        showLoading();
        ReviewersGet();     
        hideLoading();
    }, []);


    return (
        <>
            <Container>
                <br />
                <Stack gap={3} >        
                    <Row>                      
                        {reviewers && reviewers.map((r) => (
                            <Col key={r.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{r.firstName} {r.lastName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{r.email}</Card.Subtitle>
                                        <Card.Link onClick={()=>UpdateReviewer(r.id)}>Promijeni</Card.Link>
                                        <Card.Link onClick={()=>DeleteReviewer(r.id)}>Obriši</Card.Link>
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
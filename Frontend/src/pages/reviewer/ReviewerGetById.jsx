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

            setReviewer(response)
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
                {Array.isArray (reviewer) && reviewer.lenght >0 ? (reviewer.map((r) =>(
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
                ))):(
                    <div>Korisnik nije pronađen</div>
                )}
            </Container>

        </>
    )


}
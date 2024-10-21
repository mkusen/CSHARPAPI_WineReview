import { useEffect, useState } from "react";
import ReviewerService from "../../services/ReviewerService";
import useLoading from "../../hooks/useLoading";
import { Button, Card, Col, Container } from "react-bootstrap";


export default function ReviewerGetById() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');  

    const UpdateReviewer = (id) => window.location.href=`/updateReviewer?id=${id}`;
    
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

    async function DeleteReviewer(id) {
        showLoading();
        const response =await ReviewerService.deleteReviewer(id);
        hideLoading();
        if(response.error){
         alert(response.message);
         return;
        }     
 
     }

    useEffect(() => {
        showLoading();
        ReviewerById();
        hideLoading();
    }, []);


    return (
        <>
            <Container>
                <br />
                    <Col key={1}>
                     <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{reviewer.firstName} {reviewer.lastName}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{reviewer.email}</Card.Subtitle>
                            <Button variant="outline-light" size="md"   onClick={()=>UpdateReviewer(reviewer.id)}>Promijeni</Button>
                            <Button variant="outline-danger" size="md" className="buttonPosition"  onClick={()=>DeleteReviewer(reviewer.id)}>Obriši</Button>
                        </Card.Body>
                    </Card>  
                    </Col>
              
            </Container>

        </>
    )


}
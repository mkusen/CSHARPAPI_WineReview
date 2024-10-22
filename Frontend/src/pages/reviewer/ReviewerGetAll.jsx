import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import ReviewerService from "../../services/ReviewerService";
import { Button, Card, Col, Container, Form, Pagination, Row, Stack } from "react-bootstrap";

export default function ReviewerGetAll() {

    const UpdateReviewer = (id) => window.location.href=`/updateReviewer?id=${id}`;

    const [reviewers, setReviewers] = useState();
    const { showLoading, hideLoading } = useLoading();
    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState('');


    async function ReviewersGet() {  
        showLoading();
        const response = await ReviewerService.getPages(page, condition);
        hideLoading();
        if (response.error) {
            alert('Nije moguće dohvatiti podatke');
            return;
        }
        if (response.message.length == 0) {
            setPage(page - 1);
            return;
        }
        setReviewers(response.message);
        hideLoading();  
      
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

    function changeCondition(e) {
        if (e.nativeEvent.key == "Enter") {
            setPage(1);
            setCondition(e.nativeEvent.srcElement.value);
        }
    }

     function nextPage() {
        setPage(page + 1);
      }
    
      function previousPage() {
        if(page==1){
            return;
        } 
        setPage(page - 1);
      } 
      
      function Search(e) {
        if(e.nativeEvent.key == "Enter"){
            console.log('Enter')
            setPage(1);
            setCondition(e.nativeEvent.srcElement.value);
            setReviewers([]);
             
        }
    }

    useEffect(() => {
        showLoading();
        ReviewersGet();     
        hideLoading();
    }, [page, condition]);


    return (
        <>
            <Container>
                <br />
                <h4>Svi recenzenti</h4>
                <Col key={1} sm={12} lg={4} md={4}>           
            <Form.Control
               type='text'
               name='searchbar'
               placeholder='unosite slova za pretragu [Enter]' 
               maxLength={255}
               defaultValue='' 
               onKeyUp={Search} 
                
            />         
           </Col> 
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination size="md" position="center">
                                <Pagination.Prev onClick={previousPage} />
                                <Pagination.Item disabled>{page}</Pagination.Item> 
                                <Pagination.Next
                                    onClick={nextPage}
                                />
                            </Pagination>
                         </div>
                <Stack gap={3} >        
                    <Row>                      
                        {reviewers && reviewers.map((r) => (
                            <Col key={r.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{r.firstName} {r.lastName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{r.email}</Card.Subtitle>
                                        <Button variant="outline-light" size="md"  onClick={()=>UpdateReviewer(r.id)}>Promijeni</Button>
                                        <Button variant="outline-danger" size="md" className="buttonPosition"  onClick={()=>DeleteReviewer(r.id)}>Obriši</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Stack>
                <br/>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination size="md" position="center">
                                <Pagination.Prev onClick={previousPage} />
                                <Pagination.Item disabled>{page}</Pagination.Item> 
                                <Pagination.Next
                                    onClick={nextPage}
                                />
                            </Pagination>
                         </div>
            </Container>

        </>
    )

}
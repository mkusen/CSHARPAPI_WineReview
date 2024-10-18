import { useEffect, useState } from "react";
import TastingService from "../../services/TastingService";
import ReviewerService from "../../services/ReviewerService";
import useLoading from "../../hooks/useLoading";
import { Card, Col, Container } from "react-bootstrap";

export default function TastingGetById() {

  const UpdateTasting = (id) => window.location.href=`/updateTasting?id=${id}`;

  const { showLoading, hideLoading } = useLoading();
  const [tasting, setTasting] = useState();

  async function TastingById(id) {

    await TastingService.getTastingByID(id)
      .then((response) => {
        console.log(response);
        console.log("id tasting " + id);
        setTasting(response);
      })
      .catch((e) => { console.log(e) });
  }
  async function DeleteTasting(id) {
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
  TastingById();
  hideLoading();
}, []);



return (
  <>
      <Container>
          <br />
              <Col key={tasting.id}>
               <Card style={{ width: '18rem' }}>
                  <Card.Body>
                      <Card.Title>{tasting.wineName}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{tasting.eventName}</Card.Subtitle>
                      <Card.Link onClick={()=>UpdateTasting(tasting.id)}>Promijeni</Card.Link>
                      <Card.Link onClick={()=>DeleteTasting(tasting.id)}>Obriši</Card.Link>
                  </Card.Body>
              </Card>  
              </Col>
        
      </Container>

  </>
)

}
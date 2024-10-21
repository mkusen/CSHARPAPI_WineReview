import { useEffect, useState } from "react";
import TastingService from "../../services/TastingService";
import useLoading from "../../hooks/useLoading";
import { Button, Card, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";

export default function TastingGetById() {

  const UpdateTasting = (id) => window.location.href=`/updateTasting?id=${id}`;

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id'); 

  const { showLoading, hideLoading } = useLoading();
  const [tasting, setTasting] = useState([]);
  const navigate = useNavigate();

  async function TastingById() {
    showLoading();
    await TastingService.getTastingByID(id)
      .then((response) => {
        setTasting(response.message);
        hideLoading();
      })
      .catch((e) => { console.log(e) });
      hideLoading();
  }
  async function DeleteTasting() {
    showLoading();
    const response =await TastingService.deleteTasting(id);
    hideLoading();
    if(response.error){
     alert(response.message);
     return;
  
    }     
    navigate(RoutesNames.TASTING_GET_ALL);
    hideLoading();
 }

 useEffect(() => {
  TastingById();
}, []);



return (
  <>
      <Container>
          <br />
              <Col key={tasting.id}>
               <Card style={{ width: '18rem' }}>
                  <Card.Body>
                      <Card.Title><h4 className='colorBlue'>Restoran:</h4>{tasting.eventName}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted"><h5 className='colorBlue'>Vino: </h5>{tasting.wineName}</Card.Subtitle>
                      <Card.Text className="left"><h5 className="colorBlue">Recenzija:</h5>{tasting.review}</Card.Text>
                      <Card.Subtitle className="mb-2 text-muted"><h5 className='colorBlue'>Recenzent: </h5>{tasting.reviewerName}</Card.Subtitle>
                      <br/>
                      <Button variant="outline-light" size="md"  onClick={()=>UpdateTasting(tasting.id)}>Promijeni</Button>{' '}
                      <Button variant="outline-danger" size="md"className="buttonPosition" onClick={()=>DeleteTasting(tasting.id)}>Obriši</Button>
                  </Card.Body>
              </Card>  
              </Col>
        
      </Container>

  </>
)

}
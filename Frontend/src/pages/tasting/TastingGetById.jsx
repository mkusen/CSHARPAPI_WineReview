import { useEffect, useState } from "react";
import TastingService from "../../services/TastingService";
import useLoading from "../../hooks/useLoading";
import { Card, Col, Container } from "react-bootstrap";
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

    await TastingService.getTastingByID(id)
      .then((response) => {
        console.log(response.message)
        setTasting(response.message);
      })
      .catch((e) => { console.log(e) });
  }
  async function DeleteTasting() {
    
    const response =await TastingService.deleteTasting(id);
   
    if(response.error){
     alert(response.message);
     return;
    }     
    navigate(RoutesNames.TASTING_GET_ALL);
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
                      <Card.Title><h4 className='colorBlue'>Restoran:</h4>{tasting.eventName}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted"><h5 className='colorBlue'>Vino: </h5>{tasting.wineName}</Card.Subtitle>
                      <Card.Text className="left"><h5 className="colorRed">Recenzija:</h5>{tasting.review}</Card.Text>
                      <Card.Subtitle className="mb-2 text-muted"><h5 className='colorBlue'>Recenzent: </h5>{tasting.reviewerName}</Card.Subtitle>
                      <Card.Link onClick={()=>UpdateTasting(tasting.id)}>Promijeni</Card.Link>
                      <Card.Link onClick={()=>DeleteTasting(tasting.id)}>Obriši</Card.Link>
                  </Card.Body>
              </Card>  
              </Col>
        
      </Container>

  </>
)

}
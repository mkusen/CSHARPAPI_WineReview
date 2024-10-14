import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import TastingService from "../../services/TastingService";
import { Card, Col, Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReviewerService from "../../services/ReviewerService";
import EventPlaceService from "../../services/EventPlaceService";


export default function TastingGet() {
    const [tastings, setTastings] = useState();
    const[tasting, setTasting] =useState();
    const [reviewer, setReviewer] = useState();
    const [eventplace, setEventPlace] = useState();
    const { showLoading, hideLoading } = useLoading();

    const WineById = (id) => window.location.href=`/wine?id=${id}`;
    
    const navigate = useNavigate();

    async function TastingGet() {
        await TastingService.getTastings()
            .then((response) => {                
                setTastings(response);              
            })
            .catch((e) => { console.error(e) });
    }

    async function TastingById(id) {

        await TastingService.getTastingByID(id)
        .then((response)=>{
            console.log(response);
            console.log("id tasting " + id);
            setTasting(response);
        })
        .catch((e)=>{console.log(e)});
        
    }

    async function ReviewerById(id) {

        await ReviewerService.getReviewerById(id)
        .then((response)=>{
            console.log(response);
            console.log("id reviever " + id);

            setReviewer(response)
        })
        .catch((e)=>{console.log(e)});
        
    }

    async function EventPlaceById(id) {
        await EventPlaceService.getEventPlaceById(id)
        .then((response)=>{
            console.log(response);
            console.log("id event " + id);
            setEventPlace(response);
        })
        .catch((e)=>{console.log(e)});
    }

    
    useEffect(() => {
        showLoading();
            TastingGet();
        hideLoading();
    })


    return (
        <>
            <Container>
                {tastings && tastings.map((t) =>(
                        <Col key={t.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Link onClick={()=> WineById(t.wineId)}>{t.wineName}</Card.Link>
                                    <br />
                                    <Card.Link onClick={()=>EventPlaceById(t.eventId)}>{t.eventName}</Card.Link>
                                  
                                    <Card.Text>  <br /> {t.review}                   
                                        </Card.Text>                                   
                                    <Card.Link onClick={()=>ReviewerById(t.reviewerId)}>{t.reviewerName}</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                ))}
            </Container>
        </>
    )



}


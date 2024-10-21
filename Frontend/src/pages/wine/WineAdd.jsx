import { Link, useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import WineService from "../../services/WineService";
import { RoutesNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";


export default function WineAdd(){

    const navigate = useNavigate();

    const { showLoading, hideLoading } = useLoading();

    async function addWine(e) {
        showLoading();
        const response = await WineService.addWine(e);
        hideLoading();
        if(response.error){
            alert(response.message);
            return;
        }
        navigate(RoutesNames.WINE_GET_ALL);
    }

    function onSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);
        addWine({
                maker: data.get('maker'),
                price: data.get('price'),
                wineName: data.get('wineName'),
                yearOfHarvest: data.get('yearOfHarvest')
        });

    }


    return(
        <>
            <Container>
                <br />
                <strong> Dodavanje novog vina </strong>
                <Form onSubmit={onSubmit}>
                    <br />
                    <Form.Group controlId="maker">
                        <Form.Label>Proizvođač</Form.Label>
                        <Form.Control type="text" name="maker" required/>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Cijena</Form.Label>
                        <Form.Control type="decimal" name="price"/>
                    </Form.Group>

                    <Form.Group controlId="wineName">
                        <Form.Label>Naziv vina</Form.Label>
                        <Form.Control type="text" name="wineName" required />
                    </Form.Group>

                    <Form.Group controlId="yearOfHarvest">
                        <Form.Label>Berba</Form.Label>
                        <Form.Control type="text" name="yearOfHarvest" required/>
                    </Form.Group>
                 <br />                 
                    <Row>
                        <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                            <Link to={RoutesNames.WINE_GET_ALL}
                                className="btn btn-danger siroko">
                                Odustani
                            </Link>
                        </Col>
                        <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                            <Button variant="primary" type="submit" className="buttonPosition">
                                Dodaj novo vino
                            </Button>
                        </Col>
                    </Row>
                </Form>

            </Container>
        </>
    )

}
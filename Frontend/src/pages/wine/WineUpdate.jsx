import { useEffect, useRef, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { Link, useNavigate } from "react-router-dom";
import WineService from "../../services/WineService";
import { BACKEND_URL, RoutesNames } from "../../constants";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import noimage from '../../assets/noimage.png';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default function WineUpdate() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const { showLoading, hideLoading } = useLoading();
    const [wine, setWine] = useState({});
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState('');
    const [cropedImage, setCropedImage] = useState('');
    const [serverImage, setServerImage] = useState('');
    const cropperRef = useRef(null);


    async function WineById() {
        showLoading();
        const response = await WineService.getWineById(id);
        hideLoading();

        if (response.error) {
            alert(response.message);
            return;
        }
        setWine(response.message);
        if (response.message.pics != null) {
            setCurrentImage(BACKEND_URL + response.message.pics + `?${Date.now()}`); // ovaj Date je da uvijek dovuče zadnju sliku
        } else {
            setCurrentImage(noimage);
        }

    }

    async function UpdateWine(e) {
        showLoading();
        const response = await WineService.updateWine(id, e);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }

        navigate(RoutesNames.WINE_GET_ALL);
    }

    function onWineSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        var value = data.get('price').replace(',', '.');
        var price = new Intl.NumberFormat('en-GB').format(value);
        UpdateWine({
            maker: data.get('maker'),
            wineName: data.get('wineName'),
            yearOfHarvest: data.get('yearOfHarvest'),
            price: price
        });

    }


    function onCrop() {
        setServerImage(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }


    function onChangeImage(e) {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setCropedImage(reader.result);
        };
        try {
            reader.readAsDataURL(files[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async function saveImage() {
        showLoading();
        const base64 = serverImage;
        const response = await WineService.setImage(id, { Base64: base64.replace('data:image/png;base64,', '') });
        console.log(id + " saveImage");
        console.log(response);
        if (!response.ok) {
            hideLoading();
            alert(response.data + " saveImage");
        }

        setCurrentImage(setServerImage);
        hideLoading();
    }



    useEffect(() => {
        WineById();
    }, []);


    return (
        <>

            <Col sm={12} lg={6} md={6}><h5> Promijeni postojeće vino </h5></Col>
            <Row>
                <Col key='1' sm={12} lg={6} md={6}>
                    <Form onSubmit={onWineSubmit}>
                        <br />
                        <Form.Group controlId="maker">
                            <Form.Label>Proizvođač</Form.Label>
                            <Form.Control type="text" name="maker" required defaultValue={wine.maker} />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Cijena  €</Form.Label>
                            <Form.Control type="text" name="price" defaultValue={wine.price} />
                        </Form.Group>

                        <Form.Group controlId="wineName">
                            <Form.Label>Naziv vina</Form.Label>
                            <Form.Control type="text" name="wineName" required defaultValue={wine.wineName} />
                        </Form.Group>

                        <Form.Group controlId="yearOfHarvest">
                            <Form.Label>Berba</Form.Label>
                            <Form.Control type="text" name="yearOfHarvest" required defaultValue={wine.yearOfHarvest} />
                        </Form.Group>


                        <br />
                        <Row className='mb-4'>
                            <Col key='1' sm={12} lg={6} md={12}>
                                <p className='form-label'>Trenutna slika</p>
                                <Image
                                    src={currentImage}
                                    className='slika'
                                />
                            </Col>

                            <Col key='2' sm={12} lg={6} md={12}>
                                {serverImage && (
                                    <>
                                        <p className='form-label'>Nova slika</p>
                                        <Image
                                            src={serverImage || cropedImage}
                                            className='slika'
                                        />
                                    </>
                                )}
                            </Col>
                        </Row>
                        <hr />
                     
                        <Row>
                            <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                                <Link to={RoutesNames.WINE_GET_ALL}
                                    className="btn btn-danger siroko">
                                    Odustani
                                </Link>
                            </Col>
                            <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                                <Button variant="primary" type="submit" className="buttonPosition">
                                    Promijeni
                                </Button>
                            </Col>
                        </Row>
                        <br />
                    </Form>
                </Col>

                <Col key='2' sm={12} lg={6} md={6}>
                    <input className='mb-3' type='file' onChange={onChangeImage} />
                    <Button disabled={!serverImage} onClick={saveImage}>
                        Spremi sliku
                    </Button>

                    <Cropper
                        src={cropedImage}
                        style={{ height: 400, width: '100%' }}
                        initialAspectRatio={1}
                        guides={true}
                        viewMode={1}
                        minCropBoxWidth={50}
                        minCropBoxHeight={50}
                        cropBoxResizable={false}
                        background={false}
                        responsive={true}
                        checkOrientation={false}
                        cropstart={onCrop}
                        cropend={onCrop}
                        ref={cropperRef}
                    />
                </Col>

            </Row>

          
        </>
    )
}
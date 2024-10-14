import { useEffect, useState } from "react";
import EventPlaceService from "../../services/EventPlaceService";
import useLoading from "../../hooks/useLoading";


export default function EventPlaceGet() {

    const [eventplaces, setEventPlaces] = useState();
    const { showLoading, hideLoading } = useLoading();

    async function EventPlacesGet() {
        await EventPlaceService.getEventPlaces()
            .then((response) => {
                setEventPlaces(response);
               
            })
            .catch((e) => { console.error(e) });

           
    }

    useEffect(() => {
        showLoading();
        EventPlacesGet();
        hideLoading();
    });

   
}


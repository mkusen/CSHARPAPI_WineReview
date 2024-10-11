import { HttpService } from "./HttpService"

async function getEventPlaces() {
    return await HttpService.get('/EventPlaces')
        .then((response) => {
            return response.data;
        })
        .catch((e) => { console.error(e) })
}
export default{
getEventPlaces
}
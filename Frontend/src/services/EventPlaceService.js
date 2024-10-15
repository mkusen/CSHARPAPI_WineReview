import { HttpService } from "./HttpService"

async function getEventPlaces() {
    return await HttpService.get('/EventPlaces')
        .then((response) => {
            return response.data;
        })
        .catch((e) => { console.error(e) })
        }


        async function getEventPlaceById(id) {

            return await HttpService.get('/EventPlaces/' + id)
            .then((response) => {
                return{error:false, message: response.data}
            })
            .catch(()=>{
                return {error:true, message: 'Restoran ne postoji'}
            })
        }


export default{
getEventPlaces,
getEventPlaceById
}
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

        async function deleteEventPlace(id){

            return await HttpService.delete('/EventPlaces/' + id)
            .then((response)=>{
                return {error: false, message: response.data}
            })
            .catch(()=>{
                return {error: true, message: 'Restoran nije moguće obrisati'}
            })
        
        }
        
        async function addEventPlace(EventPlace) {
            return await HttpService.post('/EventPlaces',EventPlace)
            .then((response)=>{
                return {error:false, message: response.data}
            })
            .catch((e)=>{
                let messages='';
                switch (e.status){
                    case 400:                
                        for(const key in e.response.data.errors){
                            messages += key + ': ' + e.response.data.errors[key][0] + '\n';
                        }
                        return {error: true, message: messages}
                        default:
                            return {error: true, message: 'Nije moguće dodati restoran'};
                            
        
                }
            })
        }
        
        async function getPages(page, condition) {
            return await HttpService.get('/EventPlaces/getPages/' + page + '?condition=' + condition) 
            .then((response)=>{return {error: false, message: response.data};})
            .catch(()=>{return {error:true, message: 'Nije moguće dohvatiti restorane'}})
        }
        
        async function updateEventPlace(id, EventPlace) {
                     
            return await HttpService.put('/EventPlaces/' + id, EventPlace)
            .then((response)=>{
                return {error: false, message: response.data}
            })
            .catch((e)=>{
                switch (e.status){
                    case 400:
                        let messages=' ';
                        for (const key in e.response.data.errors){
                            messages += key + ': ' + e.response.data.errors[key][0] + '\n';
                        }
                        return {error: true, message: messages}
                        default:
                            return {error:true, message:'Nije moguće izmijeniti podatke o restoranu'}
                }
            })
        }
        
        


export default{
getEventPlaces,
getEventPlaceById,
deleteEventPlace,
addEventPlace,
updateEventPlace,
getPages    
}
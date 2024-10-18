
import { HttpService } from "./HttpService";

async function getTastings() {
    return await HttpService.get('/Tasting')
    .then((response)=>{
        return response.data;
    })
.catch((e)=>{console.error(e)})
}

async function getTastingByID(id) {
    return await HttpService.get('/Tasting/' + id)
    .then((response)=>{
        return{error:false, message: response.data}
    })
    .catch(()=>{
       return {error:true, message: 'Događaj ne postoji'}
    })
}

async function deleteTasting(id){

    return await HttpService.delete('/Tasting/' + id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Nije moguće obrisati događaj'}
    })

}

async function addTasting(Tasting) {
    return await HttpService.post('/Tasting',Tasting)
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
                    return {error: true, message: 'Nije moguće dodati događaj'};
                    

        }
    })
}

// async function getPages(page, condition) {
//     return await HttpService.get('/Reviewer/getPages/' + page + '?condition=' + condition) 
//     .then((response)=>{return {error: false, message: response.data};})
//     .catch(()=>{return {error:true, message: 'Nije moguće dohvatiti korisnike'}})
// }

async function updateTasting(id, Tasting) {
             
    return await HttpService.put('/Tasting/' + id, Tasting)
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
                    return {error:true, message:'Nije moguće izmijeniti podatke o događaju'}
        }
    })
}





export default{
getTastings,
getTastingByID,
deleteTasting,
addTasting,
updateTasting
}
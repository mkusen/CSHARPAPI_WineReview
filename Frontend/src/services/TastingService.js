
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

export default{
getTastings,
getTastingByID
}
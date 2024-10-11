import { HttpService } from "./HttpService";


async function getWineById(id) {
    return await HttpService.get('/Wine/' + id)
    .then((response)=>{
        return{error: false, message: response.data}
    })
    .catch(()=>{
        return {error:true, message: 'Vino ne postoji'}
    })
    
}

export default{
    getWineById
}
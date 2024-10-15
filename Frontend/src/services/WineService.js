import { HttpService } from "./HttpService";


async function getWines() 
{
    return await HttpService.get('/Wine')
    .then((response)=>{
            return response.data;
    })
    .catch((e)=>{console.error(e)})
}

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
    getWines,  
    getWineById
}
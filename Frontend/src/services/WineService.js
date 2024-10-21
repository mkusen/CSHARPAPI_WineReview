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

async function deleteWine(id){

    return await HttpService.delete('/Wine/' + id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Nije moguće obrisati vino'}
    })

}

async function addWine(Wine) {
    return await HttpService.post('/Wine',Wine)
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
                    return {error: true, message: 'Nije moguće dodati vino'};
                    

        }
    })
}

async function getPages(page, condition) {
    return await HttpService.get('/Wine/getPages/' + page + '?condition=' + condition) 
    .then((response)=>{return {error: false, message: response.data};})
    .catch(()=>{return {error:true, message: 'Nije moguće dohvatiti korisnike'}})
}

async function updateWine(id, Wine) {
console.log("id: " + id + "wine: "+ Wine);


    return await HttpService.put('/Wine/' + id, Wine)
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
                    return {error:true, message:'Nije moguće izmijeniti podatke o vinu'}
        }
    })
}

export default{  
    getWines,  
    getWineById,
    deleteWine,
    addWine,
    updateWine,
    getPages
}
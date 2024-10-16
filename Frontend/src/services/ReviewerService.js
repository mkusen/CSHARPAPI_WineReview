import { HttpService } from "./HttpService"


//this file comunicate with backend
async function getReviewers() 
{
    return await HttpService.get('/Reviewer')
    .then((response)=>{
            return response.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getReviewerById(id){
    return await HttpService.get('/Reviewer/' + id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Korisnik ne postoji'}
    })
}

async function deleteReviewer(id){

    return await HttpService.delete('/Reviewer/' + id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Nije moguće obrisati korisnika'}
    })

}

async function addReviewer(Reviewer) {
    return await HttpService.post('/Reviewer',Reviewer)
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
                    return {error: true, message: 'Nije moguće dodati korisnika'};
                    

        }
    })
}

async function getPages(page, condition) {
    return await HttpService.get('/Reviewer/getPages/' + page + '?condition=' + condition) 
    .then((response)=>{return {error: false, message: response.data};})
    .catch(()=>{return {error:true, message: 'Nije moguće dohvatiti korisnike'}})
}

async function updateReviewer(id, Reviewer) {
console.log("id: " + id + "reviewer: "+ Reviewer);


    return await HttpService.put('/Reviewer/' + id, Reviewer)
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
                    return {error:true, message:'Nije moguće izmijeniti podatke korisnika'}
        }
    })
}

export default {
getReviewers,
getReviewerById,
deleteReviewer,
addReviewer,
getPages,
updateReviewer
}
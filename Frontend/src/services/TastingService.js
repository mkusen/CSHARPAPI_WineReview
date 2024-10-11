import { HttpService } from "./HttpService";

async function getTastings() {
    return await HttpService.get('/Tasting')
    .then((response)=>{
        return response.data;
    })
.catch((e)=>{console.error(e)})
}

export default{
getTastings
}
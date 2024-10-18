import { Container} from 'react-bootstrap';
import TastingGetAll from './tasting/TastingGetAll';



export default function EntryPage(){
    return(
        <>
            <Container>             
                    <TastingGetAll />            
            </Container>
        </>
    )
}
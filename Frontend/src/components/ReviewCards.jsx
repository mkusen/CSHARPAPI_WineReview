import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export default function ReviewCards() {

  const navigate = useNavigate();

  return (
    <Card.Link href="#expand">
      <Card.Header>Naziv vina</Card.Header>
      <Card.Body>
        <Card.Title>Naziv restorana</Card.Title>
        <Card.Text>
       recenzija
        </Card.Text>
       
      </Card.Body>
    </Card.Link>
  );
}


import Card from 'react-bootstrap/Card';

export default function SmallReviewCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Naziv vina</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Naziv restorana</Card.Subtitle>
        <Card.Text>
            Recenzija vina
        </Card.Text>
        <Card.Link href="#">Klikni za više</Card.Link>
        <Card.Link href="#">Ime Prezime recenzenta</Card.Link>
      </Card.Body>
    </Card>
  );
}


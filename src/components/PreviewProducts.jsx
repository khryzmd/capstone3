import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PreviewProducts(props){

	const { breakPoint, data } = props;

	// Destructured the products data
	const { _id, name, description, price } = data;

	return(
		<Col xs={12} md={breakPoint}>
			{/*Adding the class cardHighlight for min-height*/}
	        <Card className="cardHighlight mx-2">
	            <Card.Body>
	                <Card.Title className="text-center">
	                    <Link to={`/products/${_id}`}>{name}</Link>
	                </Card.Title>
	                <Card.Text>{description}</Card.Text>
	                
	            </Card.Body>
	            <Card.Footer>
	                <h5 className="text-center">₱{price}</h5>
	                <Link className="btn btn-primary d-block" to={`/products/${_id}`}>Details</Link>
	            </Card.Footer>
	        </Card>
		</Col>
	)

}
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({productProp}) {
    // console.log(productProp);
    const { _id, name, description, price} = productProp

    return (
         <Card className="d-flex flex-column h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-2">{name}</Card.Title>
                <Card.Text className="fw-semibold mb-3">₱{price}</Card.Text>
                <div className="mt-auto">
                    <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
                </div>
            </Card.Body>
        </Card>
    )
}

ProductCard.propTypes = {
    productProp: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}
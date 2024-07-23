import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({productProp}) {
    // console.log(productProp);
    const { _id, name, description, price} = productProp

    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text className="fw-semibold">₱{price}</Card.Text>
                <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
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
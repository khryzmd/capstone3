import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import UserContext from '../context/UserContext';

export default function ProductView(){

	const { productId } = useParams();
	const { user } = useContext(UserContext);
	console.log(user);

	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [description, setDescription] = useState("");

	function addToCart(productId){
		fetch(`${import.meta.env.VITE_API_URL}/cart/add-to-cart`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				productId: productId,
				quantity: quantity,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data.message === "Item added to cart successfully"){

				Swal.fire({
					title: "Item added to cart successfully!",
					icon: "success",
					text: `Total items in cart: ${data.cart.cartItems.length}`
				});

				navigate("/products");

			}else{

				Swal.fire({
					title: "Error",
					icon: "error",
					text: "Something went wrong. Please try again. If the error persists, please consult with the administrator."
				});

			}
		})
	}

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data.product);

			setName(data.product.name);
			setPrice(data.product.price);
			setDescription(data.product.description);
		})

	}, [productId]);

	return(
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Text>{description}</Card.Text>
                            <Card.Text>Price: ₱{price}</Card.Text>
                            <Card.Subtitle>Quantity: {quantity}</Card.Subtitle>
                            { (user.id !== null && user.id !== undefined) ?
                            <Button className="mt-3" variant="primary" block="true" onClick={() => addToCart(productId)}>Add to Cart</Button>
                            :
                            <Link className="btn btn-danger btn-block mt-3" to="/login">Log in to Add to Cart</Link>
                            }
                        </Card.Body>        
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}
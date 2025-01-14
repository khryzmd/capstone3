import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, ButtonGroup, Row, Col } from 'react-bootstrap';
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
				name: name,
				price: price,
				quantity: quantity
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data.message === "Item added to cart successfully"){

				Swal.fire({
				  title: "Item Added to Cart Successfully!",
				  icon: "success",
				  html: `
				    <div style="font-size: 16px; text-align: center;">
				      <strong>Item:</strong> <span style="color: #007bff;">${name}</span><br>
				      <strong>Total items in cart:</strong> <span style="color: #28a745;">${data.cart.cartItems.length}</span>
				    </div>
				  `,
			    showDenyButton: true, 
			    confirmButtonText: 'Back to Products',
			    denyButtonText: 'View Cart', 
			    confirmButtonColor: '#007bff', 
			    denyButtonColor: '#28a745', 
			    preConfirm: () => {
			    navigate("/products")
			    },
			    preDeny: () => {
			    navigate("/cart")
			      
			    }
			  });

			} else {

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

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	}

	const decreaseQuantity = () => {
		setQuantity(quantity - 1);
	}


	return(
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Text>{description}</Card.Text>
                            <Card.Text>Price: ₱{price}</Card.Text>
                            <Card.Subtitle>Quantity:</Card.Subtitle>
                            <div>
                            <ButtonGroup size="sm" className="mt-3">
							  <Button variant="dark" onClick={decreaseQuantity} disabled={quantity < 2}>-</Button>
							  <div className="d-flex align-items-center px-3" style={{ border: '1px solid #ced4da'}}>
							    {quantity}
							  </div>
							  <Button variant="dark" onClick={increaseQuantity}>+</Button>
							</ButtonGroup>
						     </div>
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
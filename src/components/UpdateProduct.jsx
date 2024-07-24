import {useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UpdateProduct({product, fetchData}){

	// state for productId for the fetchURL
	const [productId, setProductId] = useState('');

	// Forms State
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	// state for updateProduct modals to open/close
	const [showUpdate, setShowUpdate] = useState(false);

	// function for opening the modal
	const openUpdate = (productId) => {
		// to still get the actual data from the form
		fetch(`http://localhost:4000/products/specific/${productId}`)
		.then(res => res.json())
		.then(data => {
			// populate all the input values with the product info that we fetched
			// console.log(data);
			setProductId(data._id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price)
		})
		// Then, open the modal
		setShowUpdate(true);
	}

	// function for closing the modal
	const closeUpdate = () => {
		setShowUpdate(false);
		setName('');
		setDescription('');
		setPrice(0);
	}

	// function to update/update the product
	const updateProduct = (e, productId) => {
		e.preventDefault();
		fetch(`http://localhost:4000/products/${productId}`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if(data.message === "Product updated successfully"){

				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Product Successfully updated'
				})
				closeUpdate();
				fetchData();
			}else{

				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})
				closeUpdate();
				fetchData();
			} 
		})
	}

	return(
		<>
			<Button variant="primary" size="sm" onClick={() => openUpdate(product)}>Update</Button>

			{/*EDIT MODAL*/}
            <Modal show={showUpdate} onHide={closeUpdate}>
                <Form onSubmit={e => updateProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            	type="text" 
                            	required
                            	value={name}
                            	onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                            	type="text" 
                            	required
                            	value={description}
                            	onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
	                            type="number" 
	                            required
	                            value={price}
                            	onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeUpdate}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
		</>
	)
}
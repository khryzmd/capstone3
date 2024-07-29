import {useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UpdateProduct({product, fetchData}){

	const [productId, setProductId] = useState('');

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const [showUpdate, setShowUpdate] = useState(false);

	const openUpdate = (productId) => {
		fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setProductId(data.product._id);
			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price)
		})
		setShowUpdate(true);
	}

	const closeUpdate = () => {
		setShowUpdate(false);
		setName('');
		setDescription('');
		setPrice(0);
	}

	const updateProduct = (e, productId) => {
		e.preventDefault();
		fetch(`${import.meta.env.VITE_API_URL}/products/${productId}/update`, {
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
					text: 'Product successfully updated'
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
			<Button variant="primary" size="sm" onClick={() => openUpdate(product)} className="mt-2">Update</Button>
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
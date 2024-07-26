import {useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AddNewProduct({fetchData}){


	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const [showAddNewProduct, setShowAddNewProduct] = useState(false);

	const closeAddNewProduct = () => {
		setShowAddNewProduct(false);
		setName('');
		setDescription('');
		setPrice(0);
	}

	const addNewProduct = (e) => {
		e.preventDefault();
		fetch(`${import.meta.env.VITE_API_URL}/products/`, {
			method: "POST",
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
			if(data.message === "Product successfully added"){

				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Product successfully updated'
				})
				closeAddNewProduct();
				fetchData();
			} else if (data.message === "Product already exists"){
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Product already exists'
				})
				closeAddNewProduct();
				fetchData();
			} else {

				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})
				closeAddNewProduct();
				fetchData();
			} 
		})
	}

	return(
		<>
			    <Button className="mx-1" variant="primary" size="sm" onClick={() => setShowAddNewProduct(true)}>
			      Add New Product
			    </Button>
            <Modal show={showAddNewProduct} onHide={closeAddNewProduct}>
                <Form onSubmit={e => addNewProduct(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            	placeholder="Enter product name"
                            	type="text" 
                            	required
                            	value={name}
                            	onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                           		placeholder="Enter product descriotion"
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
                        <Button variant="secondary" onClick={closeAddNewProduct}>Close</Button>
                        <Button variant="success" type="submit">Add Product</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
		</>
	)
}
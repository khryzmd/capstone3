import { useState, useEffect } from 'react';
import { Button, Table, Container, Accordion } from 'react-bootstrap';
import UpdateProduct from './UpdateProduct';
import ArchiveProduct from './ArchiveProduct';
import AddNewProduct from './AddNewProduct';

export default function AdminView({ productsData, fetchData }) {

    const [products, setProducts] = useState([]);
    const [showUserOrders, setShowUserOrders] = useState(false);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        console.log(productsData);

        const productsArr = productsData.map(product => (
            <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td className={product.isActive ? "text-success" : "text-danger"}>
                    {product.isActive ? "Available" : "Unavailable"}
                </td>
                <td className="text-center">
                    <UpdateProduct product={product._id} fetchData={fetchData}/>
                    <ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData}/>
                </td>
            </tr>
        ));

        setProducts(productsArr);

    }, [productsData]);

    const retrieveAllOrders = () => {
        fetch(`${import.meta.env.VITE_API_URL}/orders/all-orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.orders);
            setUserOrders(data.orders);
        })
    };

    const renderOrders = () => {
    return userOrders.map(order => (
        <Accordion.Item eventKey={order._id} key={order._id}>
            <Accordion.Header>Orders for user {order.userId}</Accordion.Header>
            <Accordion.Body>
                     <div>
                        <p className="mb-0">Purchased on {order.orderedOn}:</p>
                        {order.productsOrdered.map((product, index) => (
                            <li key={index}>{product.productId} - Quantity: {product.quantity}</li>
                        ))}
                        <p>Total: ₱{order.totalPrice}</p>
                    </div>
            </Accordion.Body>
        </Accordion.Item>
    ));
};


    return (
        <>
            <h1 className="text-center mt-4">Admin Dashboard</h1>
            {!showUserOrders ? (
                <>
                    <Container className="text-center mb-4">
                        <AddNewProduct fetchData={fetchData}/>
                        <Button className="mx-1" variant="success" size="sm" onClick={() => {retrieveAllOrders(); setShowUserOrders(true)}}>
                            Show User Orders
                        </Button>
                    </Container>
                    
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Availability</th>
                                <th colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products}
                        </tbody>
                    </Table>
                </>
            ) : (
                <>
                    <Container className="text-center mb-4">
                        <AddNewProduct fetchData={fetchData}/>
                        <Button className="mx-1" variant="danger" size="sm" onClick={() => setShowUserOrders(false)}>
                            Show Product Details
                        </Button>
                    </Container>

                    <Accordion className="black-accordion">
                        {renderOrders()}
                    </Accordion>
                </>
            )}
        </>
    );
}

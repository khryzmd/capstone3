import { useState, useEffect } from 'react';
import { Button, Table, Container, Accordion } from 'react-bootstrap';

export default function UserOrders() {

    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/orders/my-orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.orders);
            setUserOrders(data.orders);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
    }, []);


const renderOrders = () => {
    return userOrders.map((order, index) => (
        <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header>Order #{index + 1} - Purchased on: {order.orderedOn}</Accordion.Header>
            <Accordion.Body>
                     <div>
                        <p className="mb-0">Items:</p>
                        {order.productsOrdered.map((product, index) => (
                            <li key={index}>{product.productId} - Quantity: {product.quantity}</li>
                        ))}
                        <p>Total: ₱{order.totalPrice}</p>
                    </div>
            </Accordion.Body>
        </Accordion.Item>
    ));
}



    return (
        <>
            <h1 className="text-center mt-4">Order History</h1>
            <Accordion className="black-accordion">
                {renderOrders()}
            </Accordion>
        </>
    );
}

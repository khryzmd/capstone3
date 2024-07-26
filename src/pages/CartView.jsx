import { useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';


export default function Cart() {


    const [cart, setCart] = useState([])
    const [cartArr, setCartArr] = useState([])

    const fetchData = () => {

    	fetch(`${import.meta.env.VITE_API_URL}/cart/get-cart`, {
    		headers: {
    			Authorization: `Bearer ${localStorage.getItem('token')}`
    		}
    	})
    	.then(res => res.json())
    	.then(data => {
    		console.log(data.cart.cartItems)
    		if (data.message === "Cart successfully fetched"){
    			setCart(data.cart.cartItems);
    		} else if (data.message === "Cart not found") {
    			console.log("No Cart Found")
    		} else {
    			console.log("Internal Server Error")
    		}
    	})
    	.catch(error => {
    		console.error("Fetch error: ", error)
    	})

    }

    useEffect(() => {
    	fetchData();
    	console.log(cart);
    }, []);



	useEffect(() => {
	        const cartArr = cart.map(item => {
	            return (
	                <tr key={item._id}>
	                    <td>{item._id}</td>
	                    <td>{item.name}</td>
	                    <td>₱{item.price}</td>
	                    <td>{item.quantity}</td>
	                    <td>{item.subtotal}</td>
	                    <td className="text-center">
	                    <Button variant="danger">Remove</Button>
	                    </td>
	                </tr>
	                )
	        })

	        setCartArr(cartArr)

	    }, [cart])


    return(
            <>
            <h1 className="text-center mt-4">Your Shopping Cart</h1>     
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {cartArr}
                </tbody>
            </Table>   
            </>
        )
}










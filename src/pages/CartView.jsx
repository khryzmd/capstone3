import { useState, useEffect, useContext } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CartView() {


    const [cart, setCart] = useState([])
    const [cartArr, setCartArr] = useState([])

    const [total, setTotal] = useState(0);

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
    			setTotal(data.cart.totalPrice);
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


   const removeCartItem = (productId, name) => {
    	fetch(`${import.meta.env.VITE_API_URL}/cart/${productId}/remove-from-cart`, {
    		method: "PATCH",
    		headers: {
    			Authorization: `Bearer ${localStorage.getItem('token')}`
    		}
    	})
    	.then(res => res.json())
    	.then(data => {
    		console.log(data, productId);
    		if(data.message === "Item removed from cart successfully"){

				Swal.fire({
					title: "Success!",
					icon: "success",
					text: `${name} successfully removed`
				});
				fetchData();

			}else{

				Swal.fire({
					title: "Error",
					icon: "error",
					text: "Something went wrong. Please try again. If the error persists, please consult with the administrator."
				});
			}
    	})
    }

    const updateQuantity = (btn, item) => {
	  // Update quantity based on button press
	  item.quantity += btn === '+' ? 1 : btn === '-' ? -1 : 0;

	  // Request options
	  const options = {
	    method: "PATCH",
	    headers: {
	      "Content-Type": "application/json",
	      Authorization: `Bearer ${localStorage.getItem('token')}`
	    },
	    body: JSON.stringify({
	      productId: item.productId,
	      name: item.name,
	      price: item.price,
	      quantity: item.quantity
	    })
	  };

	  // Send request and handle response
	  fetch(`${import.meta.env.VITE_API_URL}/cart/update-cart-quantity`, options)
	    .then(res => res.json())
	    .then(data => {
	      console.log(data.message);
	      fetchData();
	    })
	    .catch(error => console.error("Update quantity error:", error));
	};


	const clearCart = () => {
		// Request options
	  const options = {
	    method: "PUT",
	    headers: {
	      Authorization: `Bearer ${localStorage.getItem('token')}`
	    }
	  };

	  // Send request and handle response
	  fetch(`${import.meta.env.VITE_API_URL}/cart/clear-cart`, options)
	    .then(res => res.json())
	    .then(data => {
	      console.log(data);
	      if(data.message === "Cart cleared successfully"){

				Swal.fire({
					title: "Success!",
					icon: "success",
					text: `Cart successfully cleared`
				});
				fetchData();

			}else{

				Swal.fire({
					title: "Error",
					icon: "error",
					text: "Something went wrong. Please try again. If the error persists, please consult with the administrator."
				});
			}
	    })
	    .catch(error => console.error("Clear cart error:", error));
	}




	useEffect(() => {
	        const cartArr = cart.map(item => {
	            return (
	                <tr key={item._id}>
	                    <td>{item._id}</td>
	                    <td><Link to={`/products/${item.productId}`}>{item.name}</Link></td>
	                    <td>₱{item.price}</td>
	                    <td>
	                    <ButtonGroup size="sm">
						  <Button variant="dark" onClick={(e) => updateQuantity(e.target.innerText, item)} disabled={item.quantity < 2}>-</Button>
						  <div className="d-flex align-items-center justify-content-center px-3" style={{ border: '1px solid #ced4da', width:'60px'}}>
						    {item.quantity}
						  </div>
						  <Button variant="dark" onClick={(e) => updateQuantity(e.target.innerText, item)} >+</Button>
						</ButtonGroup>
	                    </td>
	                    <td>₱{item.subtotal}</td>
	                    <td className="text-center">
	                    <Button variant="danger" onClick={() => removeCartItem(item.productId, item.name)}>Remove</Button>
	                    </td>
	                </tr>
	                )
	        })

	        setCartArr(cartArr)

	    }, [cart])



	const checkOut = () => {
	    fetch(`${import.meta.env.VITE_API_URL}/orders/checkout`, {
	        method: "POST",
	        headers: {
	            "Content-Type": "application/json",
	            Authorization: `Bearer ${localStorage.getItem('token')}`
	        }})
	    .then(res => res.json())
	    .then(data => {
	    	console.log(data.message);
	        if (data.message === "Ordered Successfully") {
	            Swal.fire({
	                title: "Success!",
	                icon: "success",
	                text: "Checkout completed successfully!"
	            })
	            .then((result) => {
	            	if (result.isConfirmed) {
	            		clearCart();
	            	}
	            })
	        } else {
	            Swal.fire({
	                title: "Error",
	                icon: "error",
	                text: `${data.message}`
	            });
	        }
	    })
	    .catch(error => {
	        console.error("Checkout error:", error);});
	};



    return(
            <>
            <h1 className="text-center mt-4">Your Shopping Cart</h1>     
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="table-dark">
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
                    {cartArr.length === 0 ? 
                     <tr>
			          <td colSpan={6}>Your cart is empty right now. <Link to="/products">Start shopping</Link> to add some items to your cart and take advantage of our great deals!</td>
			        </tr>	
			        :
			        <>
			        <tr>
			          <td colSpan={4}>
			          <Button variant="success" onClick={checkOut}>Check Out</Button>
			          </td>
			          <td colSpan={2} className="fs-5">Total: ₱{total} </td>
			        </tr>
			        <Button variant="danger" className="mt-3" onClick={clearCart}>Clear Cart</Button>
			        </>
                }
                    
                </tbody>
            </Table>   
            </>
        )
}










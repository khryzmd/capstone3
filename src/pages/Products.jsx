import { useState, useEffect, useContext } from 'react';
// import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import UserContext from '../context/UserContext';

export default function Products() {

    const {user} = useContext(UserContext);
    console.log(user);
    const [products, setProducts] = useState([]);

    const fetchData = () => {
    	let fetchUrl = user.isAdmin === true ? `${import.meta.env.VITE_API_URL}/products/all` : `${import.meta.env.VITE_API_URL}/products/active`

    	fetch(fetchUrl, {
    		headers: {
    			Authorization: `Bearer ${localStorage.getItem('token')}`
    		}
    	})
    	.then(res => res.json())
    	.then(data => {
    		console.log(data);

    		if(data.message === "No products found"){
    			setProduct([])
    		} else {
    			setProducts(data.products);
    		}
    	})

    }

    useEffect(() => {
    	fetchData();
    	console.log(products);
    }, [user]);

    return(
        (user.isAdmin === true)
        ?
            <AdminView productsData={products} fetchData={fetchData}/>
        :
            <UserView productsData={products} />
    )
}
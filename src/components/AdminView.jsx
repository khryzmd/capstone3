import { useState, useEffect } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import UpdateProduct from './UpdateProduct';
import ArchiveProduct from './ArchiveProduct';
import AddNewProduct from './AddNewProduct';

export default function AdminView({ productsData, fetchData }) {

    const [products, setProducts] = useState([])
    const [showUserOrders, setShowUserOrders] = useState(false);

    useEffect(() => {
        console.log(productsData);

        const productsArr = productsData.map(product => {
            return (
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
                )
        })

        setProducts(productsArr)

    }, [productsData])

    return(
             <>
            <h1 className="text-center mt-4"> Admin Dashboard</h1>
            {(showUserOrders === false) ?
            <>
            <Container className="text-center mb-4">
            <AddNewProduct fetchData={fetchData}/>
                <Button className="mx-1" variant="success" size="sm" onClick={() => setShowUserOrders(true)}>
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
            :
            
            <Container className="text-center mb-4">
            <AddNewProduct fetchData={fetchData}/>
                <Button className="mx-1" variant="danger" size="sm" onClick={() => setShowUserOrders(false)}>
                  Show Product Details
                </Button>
            </Container>
            
            
            }
            </>
        )
}
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch'
import { Container, Row, Col } from 'react-bootstrap';

export default function UserView({productsData}) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        console.log(productsData);

        const productsArr = productsData.map(product => {
            if(product.isActive === true) {
                return (
                	<Col xs={12} md={4} className="d-flex align-items-stretch my-3">
                    <ProductCard productProp={product} key={product._id}/>
                    </Col>
                    )
            } else {
                return null;
            }
        })

        setProducts(productsArr)

    }, [productsData])

    return(
        <>
        <ProductSearch />
        <h3>Our Products:</h3>
        <Container>
        	<Row>
        			{ products }
        	</Row>
        </Container>
            
        </>
        )
}
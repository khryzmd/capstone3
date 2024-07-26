import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PreviewProducts from './PreviewProducts';

export default function FeaturedProducts(){

	const [previews, setPreviews] = useState([])

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/products/active`,{
			headers: {
    			Authorization: `Bearer ${localStorage.getItem('token')}`
    		}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			const numbers = []
			const featured = []

			const generateRandomNums = () => {
				let randomNum = Math.floor(Math.random() * data.products.length)

				if(numbers.indexOf(randomNum) === -1){
					numbers.push(randomNum)
				} else {
					generateRandomNums()
				}
			}

			for(let i = 0; i < 3; i++){
				generateRandomNums();

				featured.push(
					<PreviewProducts data={data.products[numbers[i]]} key={data.products[numbers[i]]._id} breakPoint={3}/>
				)
			}

			setPreviews(featured)
		})
	}, [])

	return(
		<>
			<h2 className='text-center'>Featured Products</h2>
			<CardGroup className="justify-content-center">
				{previews}
			</CardGroup>
		</>
	)

}
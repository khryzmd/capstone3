import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home(){

	const data = {
	    title: "Every Pet Deserves Love",
	    content: "Discover Natural & Healthy Food for Your Furry Friends",
	    destination: "/products",
	    buttonLabel: "Shop Now"
	}

	return(
		<>
			<Banner data={data}/>
			<FeaturedProducts />
			<Highlights />
		</>
	)
}
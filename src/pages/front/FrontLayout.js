import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

function FrontLayout() {
	const priceWithCommas = (price) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	const [cartData, setCartData] = useState({});

	const getCart = async () => {
		try {
			const res = await axios.get(
				`/v2/api/${process.env.REACT_APP_API_PATH}/cart`
			);
			console.log('Cart: ', res);
			let data = res.data.data;
			setCartData({
				...data,
				final_total: priceWithCommas(data.final_total),
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCart();
	}, []);

	return (
		<>
			<Navbar cartData={cartData} />
			<Outlet context={{ getCart, cartData }} />
			<div className="bg-dark">
				<div className="container">
					<div className="d-flex align-items-center justify-content-between text-white py-4">
						<p className="mb-0">© 2023 LOGO All Rights Reserved.</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default FrontLayout;

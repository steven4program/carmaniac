import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
	const priceWithCommas = (price) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	const [product, setProduct] = useState({});
	const [carQuantity, setCarQuantity] = useState(1);
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(false);

	const getProduct = async () => {
		const productRes = await axios.get(
			`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
		);
		const productData = productRes.data.product;
		setProduct({
			...productData,
			price: priceWithCommas(productData.price),
		});
		console.log(productRes);
	};

	const addToCart = async () => {
		const data = {
			data: {
				product_id: id,
				qty: carQuantity,
			},
		};
		setIsLoading(true);
		try {
			const res = await axios.post(
				`/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
				data
			);
			console.log(res);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getProduct(id);
	}, [id]);

	return (
		<div className="container">
			<div
				style={{
					minHeight: '400px',
					backgroundImage: `url(${product.imageUrl})`,
					backgroundPosition: 'center center',
				}}
			></div>
			<div className="row justify-content-between mt-4 mb-7">
				<div className="col-md-7">
					<h2 className="mb-0">{product.title}</h2>
					<p className="fw-bold">NT$ {product.price}</p>
					<p>{product.content}</p>
					<div className="my-4">
						<img src={product.imageUrl} alt="" className="img-fluid mt-4" />
					</div>
				</div>
				<div className="col-md-4">
					<div className="input-group mb-3 border mt-3">
						<div className="input-group-prepend">
							<button
								className="btn btn-outline-dark rounded-0 border-0 py-3"
								type="button"
								id="button-addon1"
								onClick={() => {
									setCarQuantity((pre) => (pre === 1 ? pre : pre - 1));
								}}
							>
								<i className="bi bi-dash"></i>
							</button>
						</div>
						<input
							type="text"
							className="form-control border-0 text-center my-auto shadow-none"
							placeholder=""
							aria-label="Example text with button addon"
							aria-describedby="button-addon1"
							readOnly
							value={carQuantity}
						/>
						<div className="input-group-append">
							<button
								className="btn btn-outline-dark rounded-0 border-0 py-3"
								type="button"
								id="button-addon2"
								onClick={() => {
									setCarQuantity((pre) => (pre === 5 ? pre : pre + 1));
								}}
							>
								<i className="bi bi-plus"></i>
							</button>
						</div>
					</div>
					<button
						type="button"
						href="./checkout.html"
						className="btn btn-dark w-100 rounded-0 py-3"
						onClick={() => {
							addToCart();
						}}
						disabled={isLoading}
					>
						加入訂單
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductDetail;

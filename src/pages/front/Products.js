import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';

function Products() {
	const [products, setProducts] = useState([]);
	const [pagination, setPagination] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const getProducts = async (page = 1) => {
		setIsLoading(true);
		const productRes = await axios.get(
			`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
		);
		setProducts(productRes.data.products);
		setPagination(productRes.data.pagination);
		setIsLoading(false);
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<>
			<div className="container mt-md-5 mt-3 mb-7">
				<Loading isLoading={isLoading} />
				<div className="row">
					{products.map((product) => {
						const priceWithCommas = (price) => {
							return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						};
						return (
							<div className="col-md-3" key={product.id}>
								<div className="card border-0 mb-4 position-relative position-relative">
									<img
										src={product.imageUrl}
										className="card-img-top rounded-0 object-cover"
										width={300}
										alt="..."
									/>
									<div className="card-body p-0">
										<h5 className="mb-0 mt-3">
											<Link to={`/product/${product.id}`}>{product.title}</Link>
										</h5>
										<p className="text-muted mt-2">
											NT$ {priceWithCommas(product.price)}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<nav className="d-flex justify-content-center">
					<Pagination pagination={pagination} changePage={getProducts} />
				</nav>
			</div>
		</>
	);
}

export default Products;

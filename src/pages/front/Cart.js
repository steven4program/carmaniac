import axios from 'axios';
import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

function Cart() {
	const { cartData, getCart } = useOutletContext();
	const [loadingItems, setLoadingItems] = useState([]);

	const removeCartItem = async (id) => {
		try {
			const res = await axios.delete(
				`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
			);
			getCart();
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	const updateCartItem = async (item, quantity) => {
		const data = {
			data: {
				product_id: item.product_id,
				qty: quantity,
			},
		};
		setLoadingItems([...loadingItems, item.id]);
		try {
			const res = await axios.put(
				`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
				data
			);
			getCart();
			setLoadingItems(
				loadingItems.filter((loadingObject) => loadingObject !== item.id)
			);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div
					className="col-md-6 bg-white py-5"
					style={{ minHeight: 'calc(100vh - 56px - 76px)' }}
				>
					<div className="d-flex justify-content-between">
						<h2 className="mt-2">您的訂單</h2>
					</div>
					{cartData?.carts?.map((item) => {
						return (
							<div className="d-flex mt-4 bg-light" key={item.id}>
								<img
									src={item.product.imageUrl}
									alt=""
									style={{
										height: '120px',
									}}
									className="object-cover"
								/>
								<div className="w-100 p-3 position-relative">
									<button
										type="button"
										className="position-absolute btn"
										style={{ top: '10px', right: '10px' }}
										onClick={() => removeCartItem(item.id)}
									>
										<i className="bi bi-x-lg"></i>
									</button>
									<p className="mb-0 fw-bold">{item.product.title}</p>
									<p className="mb-1 text-muted" style={{ fontSize: '14px' }}>
										{item.product.description}
									</p>
									<div className="d-flex justify-content-between align-items-center w-100">
										<div className="input-group w-50 align-items-center">
											<select
												name=""
												className="form-select"
												id=""
												value={item.qty}
												disabled={loadingItems.includes(item.id)}
												onChange={(e) => {
													updateCartItem(item, e.target.value * 1);
												}}
											>
												{[...new Array(5)].map((i, num) => {
													return (
														<option value={num + 1} key={num}>
															{num + 1}
														</option>
													);
												})}
											</select>
										</div>
										<p className="mb-0 ms-auto">NT$ {item.final_total}</p>
									</div>
								</div>
							</div>
						);
					})}

					{/* <table className="table mt-4 text-muted">
						<tbody>
							<tr>
								<th scope="row" className="border-0 px-0 font-weight-normal">
									Lorem ipsum
								</th>
								<td className="text-end border-0 px-0">NT$24,000</td>
							</tr>
							<tr>
								<th
									scope="row"
									className="border-0 px-0 pt-0 font-weight-normal"
								>
									Lorem ipsum
								</th>
								<td className="text-end border-0 px-0 pt-0">NT$500</td>
							</tr>
						</tbody>
					</table> */}
					<div className="d-flex justify-content-between mt-4">
						<p className="mb-0 h4 fw-bold">總金額</p>
						<p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
					</div>
					<Link
						to="/checkout"
						className="btn btn-dark w-100 mt-4 rounded-0 py-3"
					>
						確認訂單正確
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Cart;

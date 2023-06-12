import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
function Success() {
	const { orderId } = useParams();
	const [orderData, setOrderData] = useState({});

	const getCart = async (orderId) => {
		const res = await axios.get(
			`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
		);
		setOrderData(res.data.order);
	};

	useEffect(() => {
		getCart(orderId);
	}, [orderId]);

	return (
		<div className="container">
			<div
				style={{
					minHeight: '400px',
					backgroundImage:
						'url(https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
					backgroundPosition: 'center center',
				}}
				className="object-cover"
			></div>
			<div className="mt-5 mb-7">
				<div className="row">
					<div className="col-md-6">
						<h2>訂單送出成功</h2>
						<p className="text-muted">
							親愛的顧客，感謝您在本平台訂車。我們非常感激您對我們的信任和支持，讓我們有機會為您提供精美的車款和優質的服務。
						</p>
						<p className="text-muted">
							感謝您選擇本平台，後續將由業務與您洽談付款及交車時序，祝您行車愉快！
						</p>
						<Link
							to="/products"
							className="btn btn-outline-dark me-2 rounded-0 mb-4"
						>
							回到首頁
						</Link>
					</div>
					<div className="col-md-6">
						<div className="card rounded-0 py-4">
							<div className="card-header border-bottom-0 bg-white px-4 py-0">
								<h2>訂單概要</h2>
							</div>
							<div className="card-body px-4 py-0">
								<ul className="list-group list-group-flush">
									{Object.values(orderData?.products || {}).map((item) => {
										return (
											<li className="list-group-item px-0" key={item.id}>
												<div className="d-flex mt-2">
													<img
														src={item.product.imageUrl}
														alt=""
														className="me-2"
														style={{ width: '60px', height: '60px' }}
													/>
													<div className="w-100 d-flex flex-column">
														<div className="d-flex justify-content-between fw-bold">
															<h5>{item.product.title}</h5>
															<p className="mb-0">{item.qty}</p>
														</div>
														<div className="d-flex justify-content-between mt-auto">
															<p className="text-muted mb-0">
																<small>NT$ {item.product.price}</small>
															</p>
															<p className="mb-0">NT$ {item.final_total}</p>
														</div>
													</div>
												</div>
											</li>
										);
									})}

									<li className="list-group-item px-0 pb-0">
										<div className="d-flex justify-content-between mt-2">
											<p className="mb-0 h4 fw-bold">總金額</p>
											<p className="mb-0 h4 fw-bold">NT$ {orderData.total}</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Success;

import { useEffect } from 'react';
import axios from 'axios';

function App() {
	useEffect(() => {
		const path = process.env.REACT_APP_API_PATH;
		(async () => {
			const res = await axios.get(`/v2/api/${path}/products/all`);
			console.log(res);
		})();
	}, []);

	return (
		<div className="App">
			<button type="button" className="btn btn-primary">
				Primary
			</button>
			<button type="button" className="btn btn-secondary">
				Secondary
			</button>
			<button type="button" className="btn btn-success">
				Success
			</button>
			<button type="button" className="btn btn-danger">
				Danger
			</button>
			<button type="button" className="btn btn-warning">
				Warning
			</button>
			<button type="button" className="btn btn-info">
				Info
			</button>
			<button type="button" className="btn btn-light">
				Light
			</button>
			<button type="button" className="btn btn-dark">
				Dark
			</button>

			<button type="button" className="btn btn-link">
				Link
			</button>
		</div>
	);
}

export default App;

import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
// import { Header } from './components/Header.jsx';
// import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import HoursSpentOnLeetcode from './pages/HSOL/index.js';
import { Home } from './pages/Home/index';

export function App() {
	
	return (
		<LocationProvider>
			{/* <Header /> */}
			<main>
				<Router>
					<Route path="/portfolio/" component={Home} />
					<Route path="/portfolio/hours-spent-on-leetcode" component={HoursSpentOnLeetcode} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));

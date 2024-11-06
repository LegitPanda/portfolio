import { useEffect } from 'preact/hooks';
import Aurora from '../../components/Aurora/Aurora';

export function Home() {
	useEffect(()=> {
		document.title = "Eric Xing's homepage"
	})
	return (
		<Aurora />
	);
}

export default Home;
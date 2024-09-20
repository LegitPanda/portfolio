import { useEffect } from 'preact/hooks';

export function Aurora() {
	function createStar() {
		const star = document.createElement('div');
		star.classList.add('star');
		star.style.left = `${Math.random() * 100}%`;
		star.style.top = `${Math.random() * 100}%`;
		star.style.width = `${Math.random() * 2 + 1}px`;
		star.style.height = star.style.width;
		// star.style.animationDuration = `${Math.random() * 2 + 0.5}s`;
		star.style.opacity = `${Math.random()}`;
		return star;
	}

	function createStars() {
		const sky = document.getElementsByClassName('aurora')[0];
		for (let i = 0; i < 100; i++) {
			sky.appendChild(createStar());
		}
	}

	useEffect(() => {
		createStars();
	}, []);

	return (
		<>
			<style>{`
html,
body {
	margin: 0;
	padding: 0;
	/* I don't know why scrollbars appear only 5% of the time 
	despite using 100% width and height and I'm too lazy to look into it*/
	overflow: hidden;
}

@property --x1 {
	syntax: '<percentage>';
	inherits: false;
	initial-value: 0%;
}

@property --x2 {
	syntax: '<percentage>';
	inherits: false;
	initial-value: 0%;
}


@property --y1 {
	syntax: '<percentage>';
	inherits: false;
	initial-value: 0%;
}

@property --y2 {
	syntax: '<percentage>';
	inherits: false;
	initial-value: 0%;
}


@property --opacity {
	syntax: '<percentage>';
	inherits: false;
	initial-value: 30%;
}

@property --length1 {
	syntax: '<percentage>';
	inherits: false;
	initial-value: 35%;
}

@property --length2 {
	syntax: '<percentage>';
	inherits: false;
	initial-value: 35%;
}

.aurora {
	z-index: 0;
	position: static;
	opacity: 1;
	display: grid;
	place-content: center;
	height: 100vh;
	background:
		radial-gradient(75% 35% at 50% 95%, rgba(33, 70, 61, 0.6) 20%, rgba(80, 82, 98, 0) 90%),
		/* aurora bands w  													h                                                           x                                                   y          color                             		opacity								inner rad*/
		radial-gradient(calc(10% + 5% * (sin(var(--phase) + 0.0turn))) calc(var(--length1) + 20% * sin(var(--phase) + 0.0turn)) at calc(var(--x1) + 20% * sin(var(--phase) + 0.0turn)) var(--y1), rgba(115, 1, 82, calc(var(--opacity) + 20% * sin(var(--phase) + 0.2turn))) 1%, rgba(145, 43, 165, 0) 90%),
		radial-gradient(calc(10% + 5% * (sin(var(--phase) + 0.2turn))) calc(var(--length1) + 20% * sin(var(--phase) + .25turn)) at calc(var(--x1) + 20% * sin(var(--phase) + 0.2turn)) var(--y1), rgba(125, 1, 80, calc(var(--opacity) + 20% * sin(var(--phase) + 0.4turn))) 1%, rgba(60, 114, 146, 0) 90%),
		radial-gradient(calc(10% + 5% * (sin(var(--phase) + 0.4turn))) calc(var(--length1) + 20% * sin(var(--phase) + .50turn)) at calc(var(--x1) + 20% * sin(var(--phase) + 0.4turn)) var(--y1), rgba(135, 1, 78, calc(var(--opacity) + 20% * sin(var(--phase) + 0.6turn))) 1%, rgba(80, 82, 98, 0) 90%),
		radial-gradient(calc(10% + 5% * (sin(var(--phase) + 0.6turn))) calc(var(--length1) + 20% * sin(var(--phase) + .75turn)) at calc(var(--x1) + 20% * sin(var(--phase) + 0.6turn)) var(--y1), rgba(145, 1, 67, calc(var(--opacity) + 20% * sin(var(--phase) + 0.8turn))) 1%, rgba(80, 82, 98, 0) 90%),
		radial-gradient(calc(10% + 5% * (sin(var(--phase) + 0.8turn))) calc(var(--length1) + 20% * sin(var(--phase) + 0.0turn)) at calc(var(--x1) + 20% * sin(var(--phase) + 0.8turn)) var(--y1), rgba(155, 1, 54, calc(var(--opacity) + 20% * sin(var(--phase) + 0.0turn))) 1%, rgba(80, 82, 98, 0) 90%),
		/*teal*/
		radial-gradient(calc(10% + 5% * (sin(var(--phase) + 0.0turn))) calc(var(--length2) + 20% * sin(var(--phase) + .25turn)) at calc(var(--x1) + 20% * sin(var(--phase) + .60turn)) var(--y1), rgba(0, 128, 128, calc(var(--opacity) + 20% * sin(var(--phase) + 0.60turn))) 1%, rgba(80, 82, 98, 0) 90%),
		radial-gradient(calc(10% + 5% * (sin(var(--phase) + 0.3turn))) calc(var(--length2) + 20% * sin(var(--phase) + .50turn)) at calc(var(--x1) + 20% * sin(var(--phase) + .85turn)) var(--y1), rgba(0, 138, 128, calc(var(--opacity) + 20% * sin(var(--phase) + 0.30turn))) 1%, rgba(80, 82, 98, 0) 90%),
		radial-gradient(calc(10% + 5% * (sin(var(--phase) + 0.6turn))) calc(var(--length2) + 20% * sin(var(--phase) + .75turn)) at calc(var(--x1) + 20% * sin(var(--phase) + 0.1turn)) var(--y1), rgba(0, 158, 128, calc(var(--opacity) + 20% * sin(var(--phase) + 0.00turn))) 1%, rgba(80, 82, 98, 0) 90%),
		/*large*/
		radial-gradient(calc(11% + 5% * (sin(var(--phase) + 0.9turn))) var(--length1) at var(--x2) var(--y2), rgb(1, 151, 101, 0.3) 1%, rgba(80, 82, 98, 0) 90%),
		radial-gradient(calc(61% + 5% * (sin(var(--phase) + 0.5turn))) var(--length1) at calc(var(--x2) + 20%) var(--y2), rgb(1, 151, 101, 0.1) 1%, rgba(80, 82, 98, 0) 90%),
		radial-gradient(calc(61% + 5% * (sin(var(--phase) + 0.0turn))) var(--length1) at calc(var(--x2) + 35%) var(--y2), rgb(1, 151, 101, 0.1) 1%, rgba(80, 82, 98, 0) 90%),

		linear-gradient(rgb(11, 11, 33) 0%, rgb(28, 35, 50) 80%);
	animation:
		aurora-wave 45s infinite cubic-bezier(0.42, 0, 0.58, 1),
		aurora-phase 30s infinite linear;
}

@property --phase {
	syntax: '<angle>';
	inherits: false;
	initial-value: 0rad;
}

@keyframes aurora-phase {
	0% {
		--phase: 0turn;
	}

	100% {
		--phase: 1turn;
	}
}

@keyframes aurora-wave {

	0%,
	100% {
		--x1: 25%;
		--y1: 5%;
		--x2: 10%;
		--y2: 10%;
	}

	40% {
		--x1: 30%;
		--y1: 10%;
		--x2: 15%;
		--y2: 15%;
	}

	60% {
		--x1: 42%;
		--y1: 12%;
		--x2: 17%;
		--y2: 17%;
	}

	80% {
		--x1: 38%;
		--y1: 8%;
		--x2: 12%;
		--y2: 12%;
	}
}

.aurora__container {
	display: block;
	height: auto;
	width: auto;
	max-width: 600px;
	padding: clamp(20px, 5vw, 30px);
	margin: clamp(8px, 4vw, 24px);
	background-color: #ffffff40;
	color: #e2e2e297;
	border-radius: 1rem;
	box-shadow: 0px 12px 24px -5px rgba(0, 0, 0, 0.2);
	/* mix-blend-mode: soft-light; */
	text-align: center;
	font-family: sans-serif;
	font-weight: bold;
}

.aurora__container h1 {
	font-size: clamp(25px, 5vw, 50px);
}

.aurora__container p {
	font-size: clamp(16px, 4vw, 30px);
}

nav {
	position: fixed;
	top: 0;
	left: 0;
	width: 98vw;
	background-color: rgba(18, 18, 18, 0.8);
	padding: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 10;
}

nav a {
	color: #ffffff;
	text-decoration: none;
	transition: color 0.3s ease;
	padding: 0.75rem;
}

nav a:hover {
	color: #4ee1e1;
}

.dropdown {
	position: relative;
	display: inline-block;
}

.dropdown-content {
	visibility: hidden;
	position: absolute;
	background-color: rgba(18, 18, 18, 0.9);
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	opacity: 0;
	transition: 200ms linear 50ms;
}

.dropdown-content a {
	color: #ffffff;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
}

.dropdown:hover .dropdown-content {
	visibility: visible;
	opacity: 0.7;
}

/* For click functionality */
.dropdown.active .dropdown-content {
	display: block;
}

.content {
	position: relative;
	padding: 6rem 2rem 2rem;
	max-width: 800px;
	margin: 0 auto;
	z-index: 1;
}

h1 {
	font-size: 2.5rem;
	margin-bottom: 1rem;
}

.mountains {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 1;
}

.mountain {
	fill: #1a1a1a;
}

.star {
	position: absolute;
	background-color: #ffffff;
	border-radius: 50%;
	/* not worth it for the performance hit */
	/* animation: twinkle 1s infinite alternate; */
}

@keyframes twinkle {
	0% {
		opacity: 0.5;
	}

	100% {
		opacity: 1;
	}
}

@media (max-width: 480px) {
	.mountains {
		position: fixed;
		bottom: 30px;
		left: 0;
		transform: scale(3.5);
	}
}
			`}</style>
			<body>
				<nav>
					<div class="dropdown">
						<div class="dropbtn">My Projects</div>
						<div class="dropdown-content">
							<a href="hours-spent-on-leetcode">Hours Spent on Leetcode (HSOL)</a>
						</div>
					</div>
					<div>
						<a href="https://github.com/legitpanda" target="_blank" rel="noreferrer">GitHub</a>
						<a href="https://www.linkedin.com/in/eric-xing-b42700a8/" target="_blank" rel="noreferrer">LinkedIn</a>
					</div>
				</nav>

				<div class="aurora">
					<div class="aurora__container">
						<h1>Welcome to Eric's page!</h1>
						<p>Stay a while, and enjoy the show.</p>
					</div>
				</div>

				<svg class="mountains" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path class="mountain"
						d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,229.3C672,224,768,192,864,165.3C960,139,1056,117,1152,133.3C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
					</path>
					<path class="mountain"
						d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,192C672,213,768,203,864,181.3C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
						opacity="0.5"></path>
				</svg>

			</body>
		</>
	);
}

export default Aurora;
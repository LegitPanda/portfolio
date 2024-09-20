import { Formik, Field } from "formik";
import * as Yup from "yup";
import "./hsol.css";
import { useEffect, useState } from "preact/hooks";

const LeetcodeSchema = Yup.object().shape({
	hours: Yup.number().min(0).max(1000).required(),
	percentageWasted: Yup.number().min(0).max(100).required(),
	yearsExperience: Yup.number().min(0).max(69).required(),
	alternative: Yup.string().required(),
	customAlternative: Yup.string().when("alternative", {
		is: (value: string) => value === "other",
		then: () => Yup.string().required(),
		otherwise: () => Yup.string().notRequired(),
	}),
});

const calculateDevelopers = () => {
	// https://www.statista.com/statistics/627312/worldwide-developer-population/
	// 28.7 million developers at the start of 2024 + 1 million per year
	// Base number of developers at the start of 2024
	const base_developers = 28.7e6;

	// Start time (January 1, 2024 00:00:00 UTC)
	const start_time = 1704067200000;

	// Use current time if no epoch_time is provided
	const epoch_time = new Date().getTime();

	// Calculate years passed since start time
	const years_passed =
		(epoch_time - start_time) / (365.25 * 24 * 60 * 60 * 1000);

	// Calculate current number of developers
	const current_developers = base_developers + years_passed * 1e6;

	return current_developers;
};

const calculateHoursSpent = () => {
	const developers = calculateDevelopers();
	const hours_spent = developers * 200;
	return hours_spent;
};

const HoursSpentOnLeetcode = () => {
	const [num, setNum] = useState(calculateHoursSpent());
	// console.log({ num });

	// auto increment counter
	useEffect(() => {
		const interval = setInterval(() => setNum(calculateHoursSpent()), 1000);
		return () => clearInterval(interval);
	}, []);

	const [done, setDone] = useState(false);
	return (
		<div className="container scroll-snap-container">
			<SectionCounter num={num} />
			<Section80000 num={num} />
			<SectionFaster />
			<SectionMoney num={num} />
			<SectionInDefense />
			<SectionQuestionnaire done={done} setDone={setDone} />
			<SectionUnhinged />
			<SectionReferences />
		</div>
	);
};

const SectionCounter = ({ num }: { num: number }) => (
	<section>
		<Counter num={num} />
		<h1>Hours have been spent on leetcode</h1>
		<Details
			summary="How is this calculated?"
			content={
				<div className="no-overflow">
					By estimating the average time a person spends on leetcode and
					multiplying by the average number of{" "}
					<Footnote
						id="footnote-developers"
						text="developers in the workforce"
					/>
					. I am using 200 hours as a rough estimate for the number of hours
					spent on leetcode. If you would like to help submit data, please use
					the form at the end of the page.
				</div>
			}
		/>
		<ClockSVG />
		{/* <div>Scroll down to see what we could have done with that time</div> */}
	</section>
);

const Section80000 = ({ num }: { num: number }) => (
	<section>
		<h2>We could have had {(num / 80000).toFixed(2)} careers</h2>
		<Details
			summary="How is this calculated?"
			content={
				<div className="no-overflow">
					Hours spent / 80 000. I know it's not really 80 000 hours but like
					everything else on this page it's a rough estimate ¯\_(ツ)_/¯
				</div>
			}
		/>
		<CheckmarkSVG />
	</section>
);

const SectionFaster = () => (
	<section>
		<h2>We could have found our jobs 13x faster</h2>
		<Details
			summary="How is this calculated?"
			content={
				<div className="no-overflow">
					At least in terms of time spent on job search rather than how quickly
					we can find jobs, since hiring is a very slow and asynchronous
					process. Let's say it takes roughly 10 minutes to fill out a job
					application, or 6/hr. Let's also say each application has a 10% chance
					of hearing back for an interview, so that's 0.6 interviews per hour
					spent on applications. Assume each interview also has a 10% chance of
					getting an offer, so that's 0.06 offers per hours. Let's use a
					negative binomial distribution to calculate the average number of
					hours spent to land an offer, where success <code>r=1</code>, and
					probability <code>p=0.06</code>. The mean is <code>r*(1−p)/p</code>.
					So <code>1*(1-0.06)/0.06 ~= 15.7</code> rounded to 16. These are rough
					numbers but honestly - applications/interviews are very luck-based,
					I've noticed I've sent the same resume to the same job posting only be
					to rejected multiple times followed by response. Anyways, this isn't
					really including the time spent interviewing or doing take-home
					assignments but it'd be nice we didn't need a least of month or two of
					prep time (going over leetcode, system design, etc, let's say this
					takes 40 hours as a conservative estimate), assuming most of us had 2
					jobs by now, that's 80 additional hours saved, so{" "}
					<code>280/16 ~= 17.5</code> jobs. This doesn't factor the improvement
					we get after every interview so <code>p</code> increases with more
					interviews and decreases when we stop practicing, so it's not exactly
					a negative binomial distribution either. Basically: I'm just pulling
					numbers out of my ass. I would love to see more data on this though -
					scroll down to submit your data!
				</div>
			}
		/>
		<BagSVG />
	</section>
);

const SectionMoney = ({ num }: { num: number }) => (
	<section>
		<h2>We could have earned ${(num * 45.24).toFixed(2)} USD</h2>
		<Details
			summary="How is this calculated?"
			content={
				<div className="no-overflow">
					The average developer in the US makes{" "}
					<Footnote id="footnote-salary" text="$55.70 per hour." /> Yes, not all
					of us are from the US but global data is hard to find. The value
					should be somewhere between 20-60 USD/hr depending on the country so
					this is probably an overestimate, and we're probably not working in
					our free time.
				</div>
			}
		/>
		<MoneySVG />
	</section>
);

const SectionInDefense = () => (
	<section>
		<h2>I have nothing against LeetCode</h2>
		<p>
			I think it's an amazing (free!!!) tool if you're into competitive
			programming/academia, but it's basically become our certification at this
			point. This is also coming from a privileged position where programmers
			don't have to get any certification in order to find a job (literally
			anyone can practice and become decent with time, just like
			math/science/art/etc) but some person asking you about an algorithm about
			topological sort feels a bit disingenuous when the job doesn't involve any
			graph theory. I believe the way we're interviewing is broken, and there must exist a better way to evaluate candidates.
		</p>
	</section>
);

const SectionQuestionnaire = ({ done, setDone }: { done: boolean, setDone: (done: boolean) => void }) => (
	<section>
		{done || localStorage.getItem('hsol_submission_done') ? <h2>Thank you for your submission!</h2> : <Questionnaire done={done} setDone={setDone} />}
	</section>
);


const SectionUnhinged = () => (
	<section>
		<h3>Additional unhinged rants</h3>
		<p>
			Some job applications take so loooong, I'm getting RSI from
			answering the questions over and over again. I'm not sponsored
			but check out <a href="https://simplify.jobs/"> Simplify</a>, they can
			automate a lot of the process. Or at least use some auto-job application
			filler for your sanity. I must answered 'are you a visible
			minority/disabled/LGBTQIA' at least 500 times now. How these questions are
			not a direct invasion of privacy is beyond me. How do I know my data is
			not being misused? I can't. I know they use these for DEI stats but can't
			they just tally it after you're hired??? PS: The answer is always 'I don't
			want to disclose' so please let's stop bothering people with these
			questions.
			Also why do websites like workday want you to create a login for every company you apply to? And why do they ask for your postal code specifially in the <code>X1X 1X1</code> format? That's right, if you don't enter the space, they don't accept it and their UI doesn't tell you where it is until you specifically click on the tiny error box that appears after you click submit. Before I figured this out I actually went to the network tab in my browser's debugging tool to see what was wrong. There isn't any excuse for crappy UI that takes less than 10 minutes to fix.
		</p>
	</section>
);

const SectionReferences = () => (
	<section>
		<h3>References</h3>
		<footer>
			<h2 className="visually-hidden" id="footnote-label">
				Footnotes
			</h2>
			<ol>
				<li id="footnote-salary">
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.indeed.com/career/software-engineer/salaries"
					>
						https://www.indeed.com/career/software-engineer/salaries
					</a>

					<a href="#footnote-salary-ref" aria-label="Back to content">
						↩
					</a>
				</li>
				<li id="footnote-developers">
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.statista.com/statistics/627312/worldwide-developer-population/"
					>
						https://www.statista.com/statistics/627312/worldwide-developer-population/
					</a>

					<a href="#footnote-developers-ref" aria-label="Back to content">
						↩
					</a>
				</li>
			</ol>
		</footer>
	</section>
);

const Details = ({
	summary,
	content,
}: { summary: string; content: JSX.Element }) => {
	return (
		<details>
			<summary>{summary}</summary>
			{content}
		</details>
	);
};

const Counter = ({ num }: { num: number }) => (
	// css counters only supports 32bit integers lol
	<div
		style={{
			display: "flex",
			fontSize: "6rem",
			fontWeight: "bold",
			flexWrap: "wrap",
			justifyContent: "center",
		}}
	>
		<div
			className="counter"
			style={{ "--num": Math.floor(num / 1000000).toFixed(0) }}
		/>
		<div
			className="counter"
			style={{ "--num": (num % 1000000).toFixed(0).padStart(6, "0") }}
		/>
	</div>
);

const Footnote = ({ id, text }: { id: string; text: string }) => (
	<a href={`#${id}`} aria-describedby="footnote-label" id={`${id}-ref`}>
		{text}
	</a>
);

const ClockSVG = () => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="clock"
	>
		<title>Clock</title>
		<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
		<line
			x1="12"
			y1="12"
			x2="12"
			y2="7"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			className="hour-hand"
		/>
		<line
			x1="12"
			y1="12"
			x2="12"
			y2="5"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			className="minute-hand"
		/>
		<circle cx="12" cy="12" r="1" fill="currentColor" />
	</svg>
);

const CheckmarkSVG = () => (
	<svg
		className="w-16 h-16 text-green-500"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title>Checkmark</title>
		<path
			d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const BagSVG = () => (
	<svg
		className="w-16 h-16 text-red-500"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title>Bag</title>
		<path
			d="M21 13.2554C18.2207 14.3805 15.1827 15 12 15C8.8173 15 5.7793 14.3805 3 13.2554M16 6V4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V6M12 12H12.01M5 20H19C20.1046 20 21 19.1046 21 18V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V18C3 19.1046 3.89543 20 5 20Z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const MoneySVG = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<title>Money</title>
		<path
			d="M6 8H4M6 16H4M6 12H3M7 4.51555C8.4301 3.55827 10.1499 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C10.1499 21 8.4301 20.4417 7 19.4845M14 9.49991C13.5 9.37589 12.6851 9.37133 12 9.37589M12 9.37589C11.7709 9.37742 11.9094 9.36768 11.6 9.37589C10.7926 9.40108 10.0016 9.73666 10 10.6874C9.99825 11.7002 11 11.9999 12 11.9999C13 11.9999 14 12.2311 14 13.3124C14 14.125 13.1925 14.4811 12.1861 14.599C12.1216 14.599 12.0597 14.5991 12 14.5994M12 9.37589L12 8M12 14.5994C11.3198 14.6022 10.9193 14.6148 10 14.4999M12 14.5994L12 16"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const Error = ({ children }: { children: string }) => (
	<div className="error">{children}</div>
);

const Questionnaire = ({ done, setDone }: { done: boolean, setDone: (done: boolean) => void }) => {
	return (
		<Formik
			initialValues={{
				hours: 0,
				percentageWasted: 100,
				yearsExperience: 0,
				alternative: undefined,
				customAlternative: undefined,
			}}
			validationSchema={LeetcodeSchema}
			onSubmit={async (values, { setSubmitting, setStatus }) => {
				try {
					const response = await fetch(
						'https://us-central1-portfolio-436119.cloudfunctions.net/hsol',
						{
							method: 'POST',
							body: JSON.stringify(values),
						}
					);

					if (response.ok) {
						setStatus({ success: true, message: 'Data submitted successfully!' });
						setDone(true);
						localStorage.setItem('hsol_submission_done', 'true');
					} else {
						setStatus({ success: false, message: 'Failed to submit data. Please try again.' });
					}
				} catch (error) {
					console.error('Error submitting data:', error);
					setStatus({ success: false, message: 'Failed to submit data. Please try again.' });
				} finally {
					setSubmitting(false);
				}
			}}

		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
			}) => {
				// console.log({ values, errors, touched })
				return (
					<div className="no-overflow" style={{ maxHeight: "100vh" }}>
						<h2>Want to help me refine these stats?</h2>
						<form onSubmit={handleSubmit}>
							<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
								<label style={{ flexGrow: 1 }}>
									<div>How many hours have you spent on Leetcode?</div>
									<input
										aria-invalid={errors.hours ? true : undefined}
										type="number"
										name="hours"
										onChange={(e) => {
											const value = Number(e.target.value);
											if (value > 1000) {
												e.target.value = "1000";
											} else if (value < 0) {
												e.target.value = "0";
											}

											handleChange(e);
										}}
										onBlur={handleBlur}
										value={values.hours}
									/>
								</label>
								{touched.hours && errors.hours && <Error>{errors.hours}</Error>}
								<label style={{ flexGrow: 1 }}>
									<div>How many years of experience do you have?</div>
									<input
										aria-invalid={errors.yearsExperience ? true : undefined}
										type="number"
										name="yearsExperience"
										onChange={(e) => {
											const value = Number(e.target.value);
											if (value > 69) {
												e.target.value = "69";
											} else if (value < 0) {
												e.target.value = "0";
											}
											handleChange(e);
										}}
										onBlur={handleBlur}
										value={values.yearsExperience}
									/>
								</label>
								{touched.yearsExperience && errors.yearsExperience && <Error>{errors.yearsExperience}</Error>}
							</div>
							<label>
								<div>
									Approximately how much percentage of those hours were put in
									for the sole purpose of getting a job (not for fun or for
									competitive programming)?
								</div>
								<div>{values.percentageWasted}%</div>
								<input
									aria-invalid={errors.percentageWasted ? true : undefined}
									type="range"
									name="percentageWasted"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.percentageWasted}
									min="0"
									max="100"
								/>
							</label>
							<Error>
								{touched.percentageWasted && errors.percentageWasted}
							</Error>


							<legend>
								<label>
									Do you think there's a better alternative to interviews?
								</label>
							</legend>
							<fieldset>
								<label className={"mc-label"}>
									<input
										aria-invalid={touched.alternative && errors.alternative ? true : undefined}
										type="radio"
										name="alternative"
										value="whiteboarding"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									Yes, whiteboarding/technical discussions/coding with focus on thought process rather than
									compilation, syntax, and efficiency
								</label>
								<label className={"mc-label"}>
									<input
										aria-invalid={touched.alternative && errors.alternative ? true : undefined}
										type="radio"
										name="alternative"
										value="takeHome"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									Yes, take-home assessments
								</label>

								<label className={"mc-label"}>
									<input
										aria-invalid={touched.alternative && errors.alternative ? true : undefined}
										type="radio"
										name="alternative"
										value="probation"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									Yes, make use of a shorter probation period
								</label>

								<label className={"mc-label"}>
									<input
										aria-invalid={touched.alternative && errors.alternative ? true : undefined}
										type="radio"
										name="alternative"
										value="codeReview"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									Yes, code review/work simulation
								</label>

								<label className={"mc-label"}>
									<input
										aria-invalid={touched.alternative && errors.alternative ? true : undefined}
										type="radio"
										name="alternative"
										value="no"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									No
								</label>

								<label className={"mc-label"}>
									<input
										aria-invalid={touched.alternative && errors.alternative ? true : undefined}
										type="radio"
										name="alternative"
										value="other"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									Other, please specify
								</label>
								{values.alternative === "other" && (
									<label>
										<input
											aria-invalid={touched.customAlternative && errors.customAlternative ? true : undefined}
											type="text"
											name="customAlternative"
											placeholder="Enter your alternative"
											value={values.customAlternative}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</label>
								)}
							</fieldset>
							{/* {errors.alternative && touched.alternative} */}

							<button type="submit" disabled={isSubmitting}>
								Submit
							</button>
						</form>
					</div>
				);
			}}
		</Formik>
	);
};

export default HoursSpentOnLeetcode;

/*
Resources
accessible footers https://www.sitepoint.com/accessible-footnotes-css/

*/

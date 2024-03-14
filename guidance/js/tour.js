function makeStep(title, text, buttonText, complete = false)
{
	return {
		title: title,
		text: text,
		buttons:
		[
		{
			text: "Cool!",
			action() { return complete ? this.complete() : this.next(); }
		}
		]
	}
}

function makeStepOnSel(id, title, text)
{
	return {
		id: id,
		title: title,
		text: text,
		attachTo:
		{
			element: "#graph_" + point["id"],
			on: point["coords"]["usrCoords"][2] > 0 ? "bottom" : "top"
		},
		modalOverlayOpeningPadding: "2px"
	}
}

function showTour()
{
	let img = new Image();
	img.src = "img/mood.svg";
	tour = new Shepherd.Tour(
	{
		defaultStepOptions:
		{
			cancelIcon: { enabled: false },
			classes: "class-1 class-2",
			scrollTo: { behavior: "smooth", block: "center" }
		},
		exitOnEsc: false,
		keyboardNavigation: false,
		useModalOverlay: true
	});
	tour.addSteps(
		[
		{
			title: "Hello",
			text: "We will create a playlist to guide you from one emotional state (e.g., your current mood) to your desired emotional state.<br>First time users: Would you like a brief guided tutorial?",
			buttons:
			[
			{
				action() { return this.show(8); },
				text: "No Thanks",
				classes: "bg-danger mr-2"
			},
			{
				action() { return this.next(); },
				text: "Guide Me!"
			}
			]
		},
		makeStep("Welcome", "This walkthrough will teach you how to use this website", "Cool!"),
		makeStepOnSel("bluecircle", "<font color='blue'>The Selector</font>", "The <font color='blue'>blue circle</font> is your selector. Move the selector around the graph or click anywhere on the graph to select an emotion"),
		makeStep("<font color='red'>The Emotions</font>", "The <font color='red'>red</font> triangles represent emotions. They light up when the <font color='blue'>Selector</font> is near them", "Continue"),
		makeStep("The Emotion Graph", "The emotions are categorised broadly as:<br><img src=" + img.src + " height='100%' width='100%'>", "Got It!"),
		makeStepOnSel("positive", "Positive Emotion", "Select any positive emotion (e.g., happy, excited, serene, etc). (See top right or bottom right quadrants.)"),
		makeStepOnSel("negativecalm", "Gloomy & Calm Emotion", "Select any negative and calm emotion. (See bottom left quadrant.)"),
		{
			title: "The Ticker Bar",
			text: "The emotion closest to what you selected is displayed here",
			attachTo:
			{
				element: "#emotion",
				on: "top"
			},
			buttons:
			[
			{
				action() { return this.next(); },
				text: "Alright!"
			}
			]
		},
		makeStep("Over To You", "Please select your current emotional state.<br><br>When you are done, press <font color='#0275d8'>Next</font> at the bottom right corner", "Ok", true),
		makeStep("Moving Forward", "How do you want to feel by the end of the playlist? Please select your desired emotional state.<br><br>When you are done, press <font color='#0275d8'>Next</font> at the bottom right corner.", "Ok", true)
		]);
	tour.start();
}

function continueTour()
{
	if ((tour.getCurrentStep()["id"] == "bluecircle") ||
		(tour.getCurrentStep()["id"] == "positive" && point["coords"]["usrCoords"][1] > 0) ||
	(tour.getCurrentStep()["id"] == "negativecalm" && point["coords"]["usrCoords"][1] < 0 && point["coords"]["usrCoords"][2] < 0))
	{ tour.next(); }
}
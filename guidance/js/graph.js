function showGraph()
{
	$("#content").html([
		$("<nav>",
		{
			class: "navbar navbar-dark bg-dark text-white navbar-expand-md"
		}).html([
		$("<div>",
		{
			class: "navbar-brand",
			href: "/"
		}).html([
		$("<img>",
		{
			src: "/img/icon.svg",
			width: "30",
			height: "30",
			class: "d-inline-block align-top mr-2",
			loading: "lazy"
		}),
		"Guidance"
		]),
		$("<button>",
		{
			class: "navbar-toggler",
			type: "button",
			"data-toggle": "collapse",
			"data-target": "#navbarNavAltMarkup",
			"aria-controls": "navbarNavAltMarkup",
			"aria-expanded": "false",
			"aria-label": "Toggle navigation"
		}).html($("<span>", { class: "navbar-toggler-icon" })),
		$("<div>",
		{
			id: "navbarNavAltMarkup",
			class: "collapse navbar-collapse"
		}).html($("<div>", { class: "navbar-nav" }).html([
			$("<a>", { id: "item-current", class: "nav-item active" }).html("Current Emotion"),
			$("<a>", { class: "nav-item disabled" }).html(">>"),
			$("<a>", { id: "item-desired", class: "nav-item" }).html("Desired Emotion"),
			$("<a>", { class: "nav-item disabled" }).html(">>"),
			$("<a>", { id: "item-generated", class: "nav-item" }).html("Generated Playlist")
			]))
		]),
		$("<div>",
		{
			id: "graph",
			class: "jxgbox mx-auto row"
		}),
		$("<div>",
		{
			id: "ticker",
			class: "row"
		}).html([
		$("<div>",
		{
			id: "emotion",
			class: "col-8 text-light text-center my-auto"
		}).text("The Emotion Bar"),
		$("<div>", { class: "col-4" }).html($("<button>",
		{
			id: "next",
			type: "button",
			class: "btn btn-primary btn-block"
		}).text("Next"))
		])
		]);
	setupGraph();
	showTour();
	displayTicker();
	$("#next").click(() =>
	{
		if (step == 1)
		{
			x = point["coords"]["usrCoords"][1];
			y = point["coords"]["usrCoords"][2];
			vas.push([x, y]);
			tour.show(9);
			displayTicker();
			$("#next").text("Generate");
			$("#item-current").removeClass("active");
			$("#item-desired").addClass("active");
		}
		else
		{
			x = point["coords"]["usrCoords"][1];
			y = point["coords"]["usrCoords"][2];
			vas.push([x, y]);
			showUserFilter();
			$("#item-desired").removeClass("active");
			$("#item-generated").addClass("active");
		}
		step += 1;
	});
};

function setupGraph()
{
	let graph = JXG.JSXGraph.initBoard("graph",
	{
		boundingBox: [-1.1, 1.1, 1.1, -1.1],
		showCopyright: false,
		showNavigation: false,
		pan: { enabled: false },
		zoom: { enabled: false },
		axis: false
	});
	let xaxis = graph.create('axis',[[0, 0], [1, 0]]);
	xaxis.removeTicks(xaxis.defaultTicks);
	let yaxis = graph.create('axis',[[0, 0], [0, 1]]);
	yaxis.removeTicks(yaxis.defaultTicks);
	setupPoint(graph);
	for (emotion of emotions)
	{
		emotion.setPoint(graph.create("point", [emotion.x, emotion.y],
		{
			name: emotion.name,
			face: "^",
			size: 5,
			fixed: true
		}));
		emotion.point.label.setAttribute({ fontSize: 16 });
		emotion.setOpacity(0.1);
	};
};

function displayTicker(text = "")
{
	$("#emotion").html(vas.length == 0 ?
		"<u>Current</u>: " + text :
		vas.length == 1 ?
		"<u>Desired</u>: " + text :
		text);
	$("#emotion").boxfit();
}

function setupPoint(graph)
{
	function getDownPos(e, i)
	{
		let cPos = graph.getCoordsTopLeftCorner(e, i);
		let absPos = JXG.getPosition(e, i);
		let dx = absPos[0]-cPos[0];
		let dy = absPos[1]-cPos[1];
		return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], graph)["usrCoords"];
	}
	function calcNear()
	{
		let x = point["coords"]["usrCoords"][1];
		let y = point["coords"]["usrCoords"][2];
		var closest = emotions[0];
		var near = [];
		for (emotion of emotions)
		{
			let dist = emotion.distance(x, y);
			if (dist < 0.2) near.push(emotion);
			if (dist < closest.distance(x, y)) closest = emotion;
		}
		for (x of lastNear) x.setOpacity(0.1);
			lastNear = near;
		for (x of near) x.setOpacity(0.3, 0.5);
			if (lastClosest != null) lastClosest.setOpacity(0.1);
		lastClosest = closest;
		closest.setOpacity(1);
		displayTicker(closest["name"]);
	}
	point = graph.create("point", [0, 0],
	{
		name: "",
		color: "blue",
		fillOpacity: 0.3,
		size: screen.width > 1000 ? screen.width / 100 : screen.width / 20
	});
	point.label.setAttribute({ fontSize: 24 });
	var lastClosest = null;
	var lastNear = [];
	graph.on("down", (e, i) =>
	{
		let pos = getDownPos(e, i);
		point.setPosition(JXG.COORDS_BY_USER, [pos[1],pos[2]]);
		calcNear();
	})
	graph.on("up", continueTour);
	point.on("drag", calcNear);
};
var step = 1;
var points = [];
var vas = [];
var texts = [];
var graph;

function showGraph()
{
	$("#content").html([
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
		$("<div>", { class: "col-2" }).html($("<button>",
		{
			id: "reset",
			type: "button",
			class: "btn btn-danger btn-lg btn-block"
		}).text("Reset")),
		$("<div>", { class: "col-2" }).html($("<button>",
		{
			id: "undo",
			type: "button",
			class: "btn btn-warning btn-lg btn-block"
		}).text("Undo")),
		$("<div>",
		{
			id: "emotion",
			class: "col-5 text-light text-center my-auto lead display-4"
		}).text("The Valence Chart"),
		$("<div>", { class: "col-3" }).html($("<button>",
		{
			id: "next",
			type: "button",
			class: "btn btn-primary btn-lg btn-block"
		}).text("Next >>"))
		])
		]);
	setupGraph();
	$("#next").click(() =>
	{
		vas.push(points);
		if (step == 1)
		{
			$("#emotion").text("The Arousal Chart");
			graph.create("curve", JXG.Math.Numerics.CardinalSpline([...points], 0.5), { strokeColor: "gray" });
			texts[0].setAttribute({color: "gray"});
			texts.push(graph.create("text", [0.03, -0.2, "Arousal"],
			{
				color: "red"
			}));
			points = [];
			setupLimits(graph);
			fn.setAttribute({strokecolor: "red"});
			$("#next").text("Generate");
		}
		step += 1;
	});
}

function setupGraph()
{
	graph = JXG.JSXGraph.initBoard("graph",
	{
		boundingBox: [-0.03, 1, 1.03, -1],
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
	setupLimits(graph);
	$("#undo").click(() => { if (points.length > 2) { graph.removeObject(points.pop()); }});
	$("#reset").click(() => graph.removeObject(points.splice(2)));
	texts.push(graph.create("text", [0.03, -0.1, "Valence"],
	{
		color: "blue"
	}));
};

function setupLimits(graph)
{
	function getDownPos(e, i)
	{
		let cPos = graph.getCoordsTopLeftCorner(e, i);
		let absPos = JXG.getPosition(e, i);
		let dx = absPos[0]-cPos[0];
		let dy = absPos[1]-cPos[1];
		return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], graph)["usrCoords"];
	}
	startPoint = graph.create("point", [0, 0],
	{
		name: "",
		color: "green",
		size: 4
	});
	endPoint = graph.create("point", [1, 0],
	{
		name: "",
		color: "green",
		size: 4
	});
	graph.on("move", () =>
	{
		startPoint.moveTo([0, startPoint.Y()]);
		endPoint.moveTo([1, endPoint.Y()]);
		graph.update();
	});
	graph.on("down", e =>
	{
		var canCreate = true, i, coords, el;
		if (e[JXG.touchProperty]) { i = 0; }
		var cPos = graph.getCoordsTopLeftCorner(e, i),
		absPos = JXG.getPosition(e, i),
		dx = absPos[0]-cPos[0],
		dy = absPos[1]-cPos[1];
		coords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], graph);
		for (el in graph.objects) {
			if(JXG.isPoint(graph.objects[el]) && graph.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
				canCreate = false;
				break;
			}
		}
		if (canCreate)
		{
			point = graph.create('point', [coords.usrCoords[1], coords.usrCoords[2]],
			{
				color: "blue",
				size: 4
			});
			endPoint = points.pop();
			points.push(point, endPoint);
		}
	});
	points.push(startPoint);
	points.push(endPoint);
	fn = graph.create("curve", JXG.Math.Numerics.CardinalSpline(points, 0.5));
};
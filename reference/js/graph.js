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
		"Reference"
		])
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
			class: "col-2 text-light text-center my-auto"
		}).text("Title"),
		$("<input>",
		{
			id: "title",
			class: "col-2",
			type: "number"
		}).val(16),
		$("<div>",
		{
			class: "col-2 text-light text-center my-auto"
		}).text("Detail"),
		$("<input>",
		{
			id: "detail",
			class: "col-2",
			type: "number"
		}).val(12),
		$("<div>", { class: "col-4" }).html($("<button>",
		{
			id: "update",
			type: "button",
			class: "btn btn-primary btn-block"
		}).text("Update")).click(updateGraph)
		])
		]);
	setupGraph();
};

function setupGraph()
{
	graph = JXG.JSXGraph.initBoard("graph",
	{
		boundingBox: [-1.1, 1.1, 1.1, -1.1],
		showCopyright: false,
		showNavigation: false,
		pan: { enabled: false },
		zoom: { enabled: false },
		axis: false
	});
	let xaxis = graph.create('axis',[[0, 0], [1, 0]], { strokeColor: "#CCCCCC" });
	xaxis.removeTicks(xaxis.defaultTicks);
	let yaxis = graph.create('axis',[[0, 0], [0, 1]], { strokeColor: "#CCCCCC" });
	yaxis.removeTicks(yaxis.defaultTicks);
	for (emotion of emotions)
	{
		emotion.setPoint(graph.create("point", [emotion.x, emotion.y],
		{
			name: "",
			face: "^",
			size: 5,
			fixed: true
		}));
		emotion.setTitle(graph.create("text", [emotion.x + 0.02, emotion.y + 0.025,
		 emotion.name],
			{ fontSize: 16 }));
		emotion.setDetail(graph.create("text", [emotion.x + 0.02, emotion.y - 0.012,
		 `(${emotion.x}, ${emotion.y})`],
			{ fontSize: 12 }));
	};
};

function updateGraph()
{
	for (emotion of emotions)
	{
		emotion.title.setAttribute({ fontSize: $("#title").val() });
		emotion.detail.setAttribute({ fontSize: $("#detail").val() });
	}
	graph.update();
}
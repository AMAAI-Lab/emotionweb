points = [];
startResults = [];

async function executeSystemFilter()
{
	function toDBVal(val) { return (val + 1) / 2; }
	function toPlotVal(val) { return val * 2 - 1; }
	let vMin = Math.min(vas[0][0], vas[1][0]);
	let vMax = Math.max(vas[0][0], vas[1][0]);
	let aMin = Math.min(vas[0][1], vas[1][1]);
	let aMax = Math.max(vas[0][1], vas[1][1]);
	startResults = startResults.filter(function (result, _, _) {
		return result.get("Valence") > toDBVal(vMin) &&
		result.get("Valence") < toDBVal(vMax) &&
		result.get("Arousal") > toDBVal(aMin) &&
		result.get("Arousal") < toDBVal(aMax)
	})
	function sqr(x) { return x * x }
	function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
	function distToSegmentSquared(p, v, w) {
		var l2 = dist2(v, w);
		if (l2 == 0) return dist2(p, v);
		var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
		t = Math.max(0, Math.min(1, t));
		return dist2(p, { x: v.x + t * (w.x - v.x),
			y: v.y + t * (w.y - v.y) });
	}
	function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }
	startResults.sort((a, b) =>
		distToSegment([toPlotVal(a.get("Valence")), toPlotVal(a.get("Arousal"))], vas[0], vas[1]) < distToSegment([toPlotVal(b.get("Valence")), toPlotVal(b.get("Arousal"))], vas[0], vas[1])
		)
	if (vas[0][0] == vMin) startResults.sort((a, b) => a.get("Valence") > b.get("Valence"))
		else startResults.sort((a, b) => a.get("Valence") < b.get("Valence"));
	return startResults;
}

async function executeNoFilter()
{
	let fma = Parse.Object.extend("FMA");
	let query = new Parse.Query(fma).limit(1000)
	var results = await query.find();
	return results;
}

async function showUserFilter()
{
	let results = await executeSystemFilter();
	let intro = [
	$("<h3>", { class: "text-light my-4" }).text("We have found a total of " + results.length + " songs"),
	$("<h3>", { class: "text-light my-4" }).text("Let's filter it down by genre and number"),
	$("<h3>", { class: "text-light my-4" }).text("Genres are optional, ignore them to search all")
	];
	var genres = [];
	results.forEach(result => {
		if (result.has("Genre")) genres.push(...result.get("Genre"))
	});
	genres = [...new Set(genres)];
	let buttons = [
	$("<div>", { class: "btn-group my-2" }).html([
		$("<button>",
		{
			id: "genre1",
			class: "btn btn-secondary btn-lg dropdown-toggle",
			type: "button",
			"data-toggle": "dropdown",
			"aria-haspopup": "true",
			"aria-expanded": "false"
		}).text("Genre Filter 1"),
		$("<div>", { class: "dropdown-menu" }).html(
			genres.map(genre => $("<a>", { class: "dropdown-item" }).text(genre).click(() => $("#genre1").text(genre)))
			)
		]),
	"<br>",
	$("<div>", { class: "btn-group my-2" }).html([
		$("<button>",
		{
			id: "genre2",
			class: "btn btn-secondary btn-lg dropdown-toggle",
			type: "button",
			"data-toggle": "dropdown",
			"aria-haspopup": "true",
			"aria-expanded": "false"
		}).text("Genre Filter 2"),
		$("<div>", { class: "dropdown-menu" }).html(
			genres.map(genre => $("<a>", { class: "dropdown-item" }).text(genre).click(() => $("#genre2").text(genre)))
			)
		]),
	"<br>",
	$("<div>", { class: "btn-group my-2" }).html([
		$("<button>",
		{
			id: "genre3",
			class: "btn btn-secondary btn-lg dropdown-toggle",
			type: "button",
			"data-toggle": "dropdown",
			"aria-haspopup": "true",
			"aria-expanded": "false"
		}).text("Genre Filter 3"),
		$("<div>", { class: "dropdown-menu" }).html(
			genres.map(genre => $("<a>", { class: "dropdown-item" }).text(genre).click(() => $("#genre3").text(genre)))
			)
		]),
	"<br>",
	$("<div>", { class: "btn-group my-2" }).html([
		$("<button>",
		{
			id: "genre4",
			class: "btn btn-secondary btn-lg dropdown-toggle",
			type: "button",
			"data-toggle": "dropdown",
			"aria-haspopup": "true",
			"aria-expanded": "false"
		}).text("Genre Filter 4"),
		$("<div>", { class: "dropdown-menu" }).html(
			genres.map(genre => $("<a>", { class: "dropdown-item" }).text(genre).click(() => $("#genre4").text(genre)))
			)
		]),
	"<br>",
	$("<div>", { class: "btn-group my-2" }).html([
		$("<button>",
		{
			id: "genre5",
			class: "btn btn-secondary btn-lg dropdown-toggle",
			type: "button",
			"data-toggle": "dropdown",
			"aria-haspopup": "true",
			"aria-expanded": "false"
		}).text("Genre Filter 5"),
		$("<div>", { class: "dropdown-menu" }).html(
			genres.map(genre => $("<a>", { class: "dropdown-item" }).text(genre).click(() => $("#genre5").text(genre)))
			)
		])
	];
	let picker = [
	$("<h4>", { class: "text-light my-4" }).text("Maximum number of songs:"),
	$("<input>",
	{
		id: "picker",
		val: "10",
		class: "my-4",
		type: "number",
		min: "1",
		max: "25",
		placeholder: "#"
	})
	];
	let submit = $("<button>", { class: "btn btn-primary btn-lg" }).text("Submit").click(() => executeUserFilter(results));
	$("#content").html($("<div>", { class: "text-center" }).html([...intro, ...buttons, ...picker, "<br>", submit]));
}

async function showStartFilter()
{
	let results = await executeNoFilter();
	let intro = [
	$("<h3>", { class: "text-light my-4" }).text("We have found a total of " + results.length + " songs"),
	$("<h3>", { class: "text-light my-4" }).text("Let's filter it down by genre"),
	$("<h3>", { class: "text-light my-4" }).text("Genres are optional, ignore them to search all")
	];
	var genres = [];
	results.forEach(result => {
		if (result.has("Genre")) genres.push(...result.get("Genre"))
	});
	genres = [...new Set(genres)];
	let buttons = [
	$("<div>", { class: "btn-group my-2" }).html([
		$("<button>",
		{
			id: "startGenre1",
			class: "btn btn-secondary btn-lg dropdown-toggle",
			type: "button",
			"data-toggle": "dropdown",
			"aria-haspopup": "true",
			"aria-expanded": "false"
		}).text("Genre Filter 1"),
		$("<div>", { class: "dropdown-menu" }).html(
			genres.map(genre => $("<a>", { class: "dropdown-item" }).text(genre).click(() => $("#startGenre1").text(genre)))
			)
		]),
	"<br>",
	$("<div>", { class: "btn-group my-2" }).html([
		$("<button>",
		{
			id: "startGenre2",
			class: "btn btn-secondary btn-lg dropdown-toggle",
			type: "button",
			"data-toggle": "dropdown",
			"aria-haspopup": "true",
			"aria-expanded": "false"
		}).text("Genre Filter 2"),
		$("<div>", { class: "dropdown-menu" }).html(
			genres.map(genre => $("<a>", { class: "dropdown-item" }).text(genre).click(() => $("#startGenre2").text(genre)))
			)
		]),
	"<br>",
	$("<div>", { class: "btn-group my-2" }).html([
		$("<button>",
		{
			id: "startGenre3",
			class: "btn btn-secondary btn-lg dropdown-toggle",
			type: "button",
			"data-toggle": "dropdown",
			"aria-haspopup": "true",
			"aria-expanded": "false"
		}).text("Genre Filter 3"),
		$("<div>", { class: "dropdown-menu" }).html(
			genres.map(genre => $("<a>", { class: "dropdown-item" }).text(genre).click(() => $("#startGenre3").text(genre)))
			)
		]),
	"<br>",
	$("<div>", { class: "btn-group my-2" }).html([
		$("<button>",
		{
			id: "startGenre4",
			class: "btn btn-secondary btn-lg dropdown-toggle",
			type: "button",
			"data-toggle": "dropdown",
			"aria-haspopup": "true",
			"aria-expanded": "false"
		}).text("Genre Filter 4"),
		$("<div>", { class: "dropdown-menu" }).html(
			genres.map(genre => $("<a>", { class: "dropdown-item" }).text(genre).click(() => $("#startGenre4").text(genre)))
			)
		]),
	"<br>",
	$("<div>", { class: "btn-group my-2" }).html([
		$("<button>",
		{
			id: "startGenre5",
			class: "btn btn-secondary btn-lg dropdown-toggle",
			type: "button",
			"data-toggle": "dropdown",
			"aria-haspopup": "true",
			"aria-expanded": "false"
		}).text("Genre Filter 5"),
		$("<div>", { class: "dropdown-menu" }).html(
			genres.map(genre => $("<a>", { class: "dropdown-item" }).text(genre).click(() => $("#startGenre5").text(genre)))
			)
		])
	];
	let submit = $("<button>", { class: "btn btn-primary btn-lg" }).text("Submit").click(() => executeStartFilter(results));
	$("#content").html($("<div>", { class: "text-center" }).html([...intro, ...buttons, "<br>", submit]));
}

function executeUserFilter(results)
{
	results = results.filter(function (result, _, _) {
		if (result.has("Genre"))
		{
			return result.get("Genre").includes($("#genre1").text()) ||
			result.get("Genre").includes($("#genre2").text()) ||
			result.get("Genre").includes($("#genre3").text()) ||
			result.get("Genre").includes($("#genre4").text()) ||
			result.get("Genre").includes($("#genre5").text())
		}
		else return true
	});

	var genres = [];
	if ($("#genre1").text() != "Genre Filter 1") { genres.push($("#genre1").text()); }
	if ($("#genre2").text() != "Genre Filter 2") { genres.push($("#genre2").text()); }
	if ($("#genre3").text() != "Genre Filter 3") { genres.push($("#genre3").text()); }
	if ($("#genre4").text() != "Genre Filter 4") { genres.push($("#genre4").text()); }
	if ($("#genre5").text() != "Genre Filter 5") { genres.push($("#genre5").text()); }
	if (genres.length != 0)
	{
		results = results.filter(function (result, _, _) {
			if (result.has("Genre"))
			{
				return result.get("Genre").some(e => genres.includes(e));
			}
			else return true
		});
	}
	showPlayer(results.slice(0, parseInt($("#picker").val())));
}

function executeStartFilter(results)
{
	var genres = [];
	if ($("#startGenre1").text() != "Genre Filter 1") { genres.push($("#startGenre1").text()); }
	if ($("#startGenre2").text() != "Genre Filter 2") { genres.push($("#startGenre2").text()); }
	if ($("#startGenre3").text() != "Genre Filter 3") { genres.push($("#startGenre3").text()); }
	if ($("#startGenre4").text() != "Genre Filter 4") { genres.push($("#startGenre4").text()); }
	if ($("#startGenre5").text() != "Genre Filter 5") { genres.push($("#startGenre5").text()); }
	if (genres.length == 0) { startResults = results }
	else
	{
		startResults = results.filter(function (result, _, _) {
			if (result.has("Genre"))
			{
				return result.get("Genre").some(e => genres.includes(e));
			}
			else return true
		});
	}
	showGraph();
	}
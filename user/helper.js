class Topic
{
	constructor(name, items)
	{
		this.name = name;
		this.items = items;
	}
}

class Item
{
	constructor(name, joined, status, playlistCount, uploadCount)
	{
		this.name = name;
		this.joined = joined;
		this.status = status;
		this.playlistCount = playlistCount;
		this.uploadCount = uploadCount;
	}
}

function makeCards(items)
{
	return items.map(item =>
		$("<div>", { class: "card p-2 mb-4" }).html([
			$("<img>",
			{
				src: "img/user.svg",
				class: "card-img-top mb-2"
			}).css("filter", "invert(0.5) sepia(1) saturate(3) hue-rotate(" + [0, 45, 90, 135, 180, 225, 270, 315][Math.floor(Math.random() * 8)] + "deg)"),
			$("<div>", { class: "card-body text-center p-1" }).html([
				$("<h5>", { class: "card-title" }).html(item.name),
				$("<p>", { class: "card-text" }).html("Joined: " + formatDate(item.joined)),
				$("<hr>"),
				$("<p>", { class: "card-text" }).html("Status: " + item.status),
				$("<p>", { class: "card-text" }).html("Playlist usage: " + item.playlistCount + " / 5"),
				$("<p>", { class: "card-text" }).html("Upload usage: " + item.uploadCount + " / 2")
				])
			])
		);
}

function formatDate(date)
{
	let format = {
		year: "numeric", month: "short", day: "2-digit"
	};
	const dateTimeFormat = new Intl.DateTimeFormat("en-SG", format);
	return dateTimeFormat.format(date);
}

function showCards(topics)
{
	$("#content").append($("<div>",
	{
		id: "subcontent",
		class: "col-11 mx-auto container"
	}).html(topics.map(topic => [
		$("<div>", { class: "row" }).html($("<h1>", { class: "text-muted display-4" }).html(topic.name)),
		$("<div>", { class: "row row-cols-4 row-cols-md-5 row-cols-lg-6" }).html(makeCards(topic.items))
		]).flat()));
}

function start(title, subtitle, topics)
{
	document.title = title;
	let headerTop = [
	$("<h1>", { class: "display-3" }).html(title),
	$("<p>", { class: "lead" }).html(subtitle),
	$("<hr>", { class: "my-4" })
	];
	$("#content").html($("<div>", { class: "jumbotron" }).html(
		$("<div>", { class: "col-11 mx-0" }).html(headerTop)
		)
	);
	showCards(topics);
}
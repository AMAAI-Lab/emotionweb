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
	constructor(name, desc, ext, href = "")
	{
		this.name = name;
		this.desc = desc;
		this.ext = ext;
		this.short = name.toLowerCase().replace(/\s/g, '');
		if (href == "") { this.href = name.toLowerCase().replace(/\s/g, ''); }
		else { this.href = href; }
	}
}

function makeCards(items)
{
	return items.map(item =>
		$("<a>", { href: "/" + item.href } ).html(
			$("<div>", { class: "card p-2 mb-4" }).html([
				$("<img>",
				{
					src: "img/" + item.short + "." + item.ext,
					class: "card-img-top mb-2"
				}),
				$("<div>", { class: "card-body text-center p-1" }).html([
					$("<h5>", { class: "card-title" }).html(item.name),
					$("<p>", { class: "card-text" }).html(item.desc)
					])
				])
			)
		);
}

function showCards(topics)
{
	$("#content").append($("<div>",
	{
		id: "subcontent",
		class: "col-11 mx-auto container"
	}).html(topics.map(topic => [
		$("<div>", { class: "row" }).html($("<h1>", { class: "text-muted display-4" }).html(topic.name)),
		$("<div>", { class: "row row-cols-1 row-cols-md-2 row-cols-lg-4" }).html(makeCards(topic.items))
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
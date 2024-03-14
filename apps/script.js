$(() =>
{
	document.title = "Emotion Apps";
	setupParse();
	checkLogin();
})

function setupParse()
{
	Parse.initialize("sv18yE5pZoFCBhSSn5FDQX7M4R8nvd2Jsxe8N7fv", "Qxz7F2Z3z0Up7wgT90X8Qik3flVYDz3baSd9tg7P");
	Parse.serverURL = "https://parseapi.back4app.com/"
}

function checkLogin()
{
	if (Parse.User.current()) { showApps(); }
	else { window.location.href = "/"; }
}

function showApps()
{
	let guidance = new Item("Mood Guidance", "Generate music from start and end VA points", "svg", "guidance");
	let curves = new Item("VA Curves", "Time sensitive VA playlist producer with user defined curves", "svg", "curves");
	let upload = new Item("Upload Audio", "Choose your music and see the calculated VA progression", "svg", "upload");
	let user = new Item("User Dashboard", "Analytics of users", "svg", "user");
	let reference = new Item("Reference", "Emotion Datapoints", "svg", "reference");
	let about = new Item("About", "Project details and the team behind Emotion Project", "svg", "#");
	let topics = [new Topic("Modules", Parse.User.current().getUsername() == "admin" ? [guidance, curves, upload, user, reference, about] : [guidance, curves, upload, about])];
	start("Emotion Project", "An online emotion music generation showcase", topics);
}
var vas = [];
var step = 1;

$(() =>
{
	document.title = "Mood Guidance";
	setupParse();
	checkLogin();
});

function setupParse()
{
	Parse.initialize("sv18yE5pZoFCBhSSn5FDQX7M4R8nvd2Jsxe8N7fv", "Qxz7F2Z3z0Up7wgT90X8Qik3flVYDz3baSd9tg7P");
	Parse.serverURL = "https://parseapi.back4app.com/";
}

function checkLogin()
{
	if (Parse.User.current()) { showStartFilter(); }
	else { window.location.href = "/"; }
}
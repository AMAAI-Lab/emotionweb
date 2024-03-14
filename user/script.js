$(() =>
{
	document.title = "User Dashboard";
	setupParse();
	checkLogin();
	// showUsers();
})

function setupParse()
{
	Parse.initialize("sv18yE5pZoFCBhSSn5FDQX7M4R8nvd2Jsxe8N7fv", "Qxz7F2Z3z0Up7wgT90X8Qik3flVYDz3baSd9tg7P");
	Parse.serverURL = "https://parseapi.back4app.com/"
}

function checkLogin()
{
	if (Parse.User.current()) { showUsers(); }
	else { window.location.href = "/"; }
}

async function showUsers()
{
	let query = new Parse.Query(Parse.User);
	let results = await query.find();
	let cards = await Promise.all(results.map(async result => {
		let playlist = Parse.Object.extend("Playlist");
		let playlistQuery = new Parse.Query(playlist).equalTo("user", result).greaterThan('createdAt', { $relativeTime: '30 days ago' });
		let playlistCount = await playlistQuery.count();
		let upload = Parse.Object.extend("Upload");
		let uploadQuery = new Parse.Query(upload).equalTo("user", result).greaterThan('createdAt', { $relativeTime: '30 days ago' });
		let uploadCount = await uploadQuery.count();
		return new Item(result.getUsername(), result.createdAt, result.getUsername() == "admin" ? "Admin" : result.has("status") ? result.get("status") : "Free", playlistCount, uploadCount);
	}));
	let topics = [new Topic("Users (" + results.length + ")", cards)];
	start("Dashboard", "", topics);
}
$(() =>
{
	document.title = "Emotion Project";
	setupParse();
	showLoginPage();
})

function setupParse()
{
	Parse.initialize("sv18yE5pZoFCBhSSn5FDQX7M4R8nvd2Jsxe8N7fv", "Qxz7F2Z3z0Up7wgT90X8Qik3flVYDz3baSd9tg7P");
	Parse.serverURL = "https://parseapi.back4app.com/"
}

function showLoginPage()
{
	let left = $("<div>", { id: "form_left" }).html($("<img>", { src: "img/icon.svg" }));
	let right = $("<div>", { id: "form_right" }).html([
		$("<h1>").text("Emotion Project Login"),
		$("<div>", { class: "input_container" }).html([
			$("<i>", { class: "fas fa-user" }),
			$("<input>", {
				id: "field_username",
				class: "input_field",
				type: "username",
				name: "Username",
				placeholder: "Username"
			})
			]),
		$("<div>", { class: "input_container" }).html([
			$("<i>", { class: "fas fa-lock" }),
			$("<input>", {
				id: "field_password",
				class: "input_field",
				type: "password",
				name: "Password",
				placeholder: "Password"
			})
			]),
		$("<input>", {
			id: "input_submit",
			class: "input_field",
			type: "submit",
			value: "Login"
		}).click(login),
		$("<span>", { id: "create_account" }).html($("<a>", { href: "javascript:showRegisterPage()" }).text("Create An Account"))
		]);
	$("#content").html($("<div>", { id: "form_wrapper" }).html([left, right]));
}

function showRegisterPage()
{
	let left = $("<div>", { id: "form_left" }).html($("<img>", { src: "img/icon.svg" }));
	let right = $("<div>", { id: "form_right" }).html([
		$("<h1>").text("Emotion Project Registration"),
		$("<div>", { class: "input_container" }).html([
			$("<i>", { class: "fas fa-user" }),
			$("<input>", {
				id: "field_username",
				class: "input_field",
				type: "username",
				name: "Username",
				placeholder: "Username"
			})
			]),
		$("<div>", { class: "input_container" }).html([
			$("<i>", { class: "fas fa-lock" }),
			$("<input>", {
				id: "field_password",
				class: "input_field",
				type: "password",
				name: "Password",
				placeholder: "Password"
			})
			]),
		$("<div>", { class: "input_container" }).html([
			$("<i>", { class: "fas fa-lock" }),
			$("<input>", {
				id: "field_password2",
				class: "input_field",
				type: "password",
				name: "Password",
				placeholder: "Retype Password"
			})
			]),
		$("<div>", { class: "input_container" }).html([
			$("<i>", { class: "fas fa-envelope" }),
			$("<input>", {
				id: "field_email",
				class: "input_field",
				type: "email",
				name: "Email",
				placeholder: "Email"
			})
			]),
		$("<input>", {
			id: "input_submit",
			class: "input_field",
			type: "submit",
			value: "Register"
		}).click(register),
		$("<span>", { id: "create_account" }).html($("<a>", { href: "javascript:showLoginPage()" }).text("I Have An Account"))
		]);
	$("#content").html($("<div>", { id: "form_wrapper" }).html([left, right]));
}

function login()
{
	Parse.User.logIn($("#field_username").val(), $("#field_password").val())
	.then(() => window.location.href = "apps").catch(showLoginPage);
}

async function register()
{

	if ($("#field_password").val().length == 0)
	{
		alert("Must enter password!");
		return;
	}
	if ($("#field_password").val() != $("#field_password2").val())
	{
		alert("Passwords must match!");
		return;
	}
	var user = new Parse.User();
	user.set("username", $("#field_username").val());
	user.set("password", $("#field_password").val());
	user.set("email", $("#field_email").val());
	try
	{
	  await user.signUp();
	  alert("Signed up successfully. Please login to continue");
	  window.location = "/";
	}
	catch (error)
	{
	  alert("Error: " + error.code + " " + error.message);
	}
}
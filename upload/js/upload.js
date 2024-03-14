async function showUpload()
{
	let uploads = Parse.Object.extend("Upload");
	let query = new Parse.Query(uploads).equalTo("user", Parse.User.current()).greaterThan('createdAt', { $relativeTime: '30 days ago' });
	let results = await query.count();
	$("#content").addClass("col-10 offset-1").html([
		$("<h2>", { class: "display-4" }).text("Upload your files here!"),
		$("<p>", { class: "lead" }).text("After uploading, it will be computed and eventually stored in the audio database"),
		"<br><br>",
		$("<div>", { id: "upload", class: "row dropzone" }),
		$("<p>", { id: "notice", class: "lead text-danger" })
		]);
	var myDropzone = new Dropzone("#upload", { url: "#" });
	myDropzone.on("addedfile", function(file) {
		if (Parse.User.current().get("status") == "Premium")
		{
			if (file.name.endsWith(".mp3"))
			{
				$("#notice").text("");
				var audio = new Parse.File("audio.mp3", file);
				var upload = new Parse.Object("Upload");
				upload.set("user", Parse.User.current());
				upload.set("file", audio);
				upload.save();
				window.location.href = "/upload"
			}
			else
			{
				$("#notice").text("Only mp3 files can be uploaded at this time");
				myDropzone.removeFile(file);
			}
		}
		else
		{
			if (results < 2)
			{
				if (file.name.endsWith(".mp3"))
				{
					$("#notice").text("");
					var audio = new Parse.File("audio.mp3", file);
					var upload = new Parse.Object("Upload");
					upload.set("user", Parse.User.current());
					upload.set("file", audio);
					upload.save().then(() => window.location.href = "/upload");
				}
				else
				{
					$("#notice").text("Only mp3 files can be uploaded at this time");
					myDropzone.removeFile(file);
				}
			}
			else
			{
				$("#notice").text("You have exceeded the free usage of 2 uploads per month");
				myDropzone.removeFile(file);
			}
		}
	});
	getPrevious();
}

async function getPrevious()
{
	let uploads = Parse.Object.extend("Upload");
	let query = new Parse.Query(uploads).limit(1000).equalTo("user", Parse.User.current());
	let results = await query.find();
	if (results.length == 0) return;
	$("#content").prepend([
		$("<h2>", { class: "display-4" }).text("Previous Files"),
		$("<p>", { class: "lead" }).text("Analysis of your files will take some time to fully complete. Check back later if still processing."),
		"<br><br>",
		prettifyPrevious(results),
		"<br><br><br><br>",
		$("<hr>"),
		"<br><br><br><br>"
		]);
}

function prettifyPrevious(results)
{
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
		];
	var contents = [$("<tr>").html([
		$("<th>").text("Date"),
		$("<th>").text("Time"),
		$("<th>").text("File"),
		$("<th>").text("Status")
		])];
	results.forEach(result =>
	{
		var month = months[result.createdAt.getMonth()];
		var hour = result.createdAt.getHours() > 12 ? result.createdAt.getHours() - 12 : result.createdAt.getHours();
		var minute = result.createdAt.getMinutes() > 10 ? result.createdAt.getMinutes() : "0" + result.createdAt.getMinutes();
		var ap = result.createdAt.getHours() < 12 ? "am" : "pm";
		contents.push($("<tr>").html([
		$("<td>").text(result.createdAt.getDate() + " " + month + " " + result.createdAt.getFullYear()),
		$("<td>").text(hour + ":" + minute + " " + ap),
		$("<td>").html($("<a>", { text: "Link", href: result.get("file").url() })),
		$("<td>").text(result.has("results") ? "Completed" : "In Progress...")
		]));
	})
	return $("<table>", { class: "w-100" }).html(contents);
}
// Mythium Archive: https://archive.org/details/mythium/

async function showPlayer(results)
{
	displayPlayer();
	let uploads = Parse.Object.extend("Playlist");
	let query = new Parse.Query(uploads).equalTo("user", Parse.User.current()).greaterThan('createdAt', { $relativeTime: '30 days ago' });
	let uploadCount = await query.count();
	if (Parse.User.current().get("status") != "Premium" && uploadCount > 5)
	{
		alert("You have exceeded the monthly limit of 5 playlists as a free user");
		return;
	}
	else
	{
		var upload = new Parse.Object("Playlist");
		upload.set("user", Parse.User.current());
		upload.set("songs", results);
		upload.save();
	}
	'use strict'
	var supportsAudio = !!document.createElement('audio').canPlayType;
	if (supportsAudio) {
				// initialize plyr
				var player = new Plyr('#audio1', {
					controls: [
					'restart',
					'play',
					'progress',
					'current-time',
					'duration',
					'mute',
					'volume',
					'download'
					],
					"autoplay": true
				});
				// initialize playlist and controls
				results = results.map(function (result, index, _) {
					let dict = {
						"track": index,
						"name": result.get("Track") + " - " + result.get("Artist"),
						"duration": "-",
						"file": "Chart_" + result.get("songid")
					};
					return dict;
				});
				var index = 0,
				playing = false,
				mediaPath = 'https://emotionstudy.s3.ap-south-1.amazonaws.com/fma/',
				extension = '',
				tracks = results,
				buildPlaylist = $.each(tracks, function(key, value) {
					var trackNumber = value.track,
					trackName = value.name,
					trackDuration = value.duration;
					if (trackNumber.toString().length === 1) {
						trackNumber = '0' + trackNumber;
					}
					$('#plList').append('<li> \
						<div class="plItem"> \
						<span class="plNum">' + trackNumber + '.</span> \
						<span class="plTitle">' + trackName + '</span> \
						<span class="plLength">' + trackDuration + '</span> \
						</div> \
						</li>');
				}),
				trackCount = tracks.length,
				npAction = $('#npAction'),
				npTitle = $('#npTitle'),
				audio = $('#audio1').on('play', function () {
					playing = true;
					npAction.text('Now Playing...');
				}).on('pause', function () {
					playing = false;
					npAction.text('Paused...');
				}).on('ended', function () {
					npAction.text('Paused...');
					if ((index + 1) < trackCount) {
						index++;
						loadTrack(index);
						audio.play();
					} else {
						audio.pause();
						index = 0;
						loadTrack(index);
					}
				}).get(0),
				btnPrev = $('#btnPrev').on('click', function () {
					if ((index - 1) > -1) {
						index--;
						loadTrack(index);
						if (playing) {
							audio.play();
						}
					} else {
						audio.pause();
						index = 0;
						loadTrack(index);
					}
				}),
				btnNext = $('#btnNext').on('click', function () {
					if ((index + 1) < trackCount) {
						index++;
						loadTrack(index);
						if (playing) {
							audio.play();
						}
					} else {
						audio.pause();
						index = 0;
						loadTrack(index);
					}
				}),
				li = $('#plList li').on('click', function () {
					var id = parseInt($(this).index());
					if (id !== index) {
						playTrack(id);
					}
				}),
				loadTrack = function (id) {
					$('.plSel').removeClass('plSel');
					$('#plList li:eq(' + id + ')').addClass('plSel');
					npTitle.text(tracks[id].name);
					index = id;
					audio.src = mediaPath + tracks[id].file + extension;
					updateDownload(id, audio.src);
				},
				updateDownload = function (id, source) {
					player.on('loadedmetadata', function () {
						$('a[data-plyr="download"]').attr('href', source);
					});
				},
				playTrack = function (id) {
					loadTrack(id);
					audio.play();
				};
				extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
				loadTrack(index);
			} else {
				// no audio support
				$('.column').addClass('hidden');
				var noSupport = $('#audio1').text();
				$('.container').append('<p class="no-support">' + noSupport + '</p>');
			}
		}

		function displayPlayer()
		{
			let content = $("<div>", { class: "player-container" }).html(
				$("<div>", { class: "column add-bottom" }).html(
					$("<div>", { id: "mainwrap" }).html([
						$("<div>", { id: "nowPlay" }).html([
							$("<span>", { id: "npAction" }).text("Paused..."),
							$("<span>", { id: "npTitle" })
							]),
						$("<div>", { id: "audiowrap" }).html([
							$("<div>", { id: "audio0" }).html($("<audio>",
							{
								id: "audio1",
								preload: true,
								controls: true
							}).text("Your browser does not support HTML5 Audio!")),
							$("<div>", { id: "tracks" }).html([
								$("<a>", { id: "btnPrev" }).html("&vltri;"),
								$("<a>", { id: "btnNext" }).html("&vrtri;")])
							]),
						$("<div>", { id: "plwrap" }).html($("<ul>", { id: "plList" }))
						])));
			$("#content").html(content);
		}
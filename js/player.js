const Rx = require('rx');
const playlist = require('./playlist');

function play() {
}

let player = {
	init: () => {
		var listenPlaylist = playlist.stream.subscribe(() => {
			console.log('click');
		});
	}
};

module.exports = player;

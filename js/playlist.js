const Rx = require('rx');

let playlist = {
	stream: Rx.Observable.fromEvent(document.querySelector('.js-playlist'), 'click')
}

module.exports = playlist;

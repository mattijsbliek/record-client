/**
 * - Get albums from API
 * - Click to open album
 * - Click track to play
 */
const _ = require('ramda');
const P = require('pointfree-fantasy');
const api = require('./api');
const player = require('./player');
const playlist = require('./playlist');

/*
 * Helper functions
 */
let log = function (x) {
	console.log(x);
	return x;
}

/**
 * App starts here
 */


// getTrack :: Array -> Object
//let getTrack = _.filter(_.whereEq({id: getTrackId() })); 

// getTrackUrl :: Object -> String
//let getTrackUrl = _.compose(log, _.prop('url'), _.head, getTrack);

let getTrackName = (track) => track.artist + ' - ' + track.title;

let constructTrackButton = (item) => {
	let trackButton = document.createElement('button');
	trackButton.classList.add('js-playlist-track-button');
	trackButton.textContent = getTrackName(item);
	return trackButton;
}

let constructOrderedList = (items) => {
	// Create <ol> DOM element
	let list = document.createElement('ol');

	// Reduce array of items to list items
	list = items.reduce((list, item) => {
		let listItem = document.createElement('li');
		listItem.appendChild(item);
		list.appendChild(listItem);
		return list;
	}, list);

	return list;
};


/**
 * Impure
 */
let Impure = {
	setHtml: _.curry(function(sel, html) {
		document.querySelector(sel).appendChild(html);
	})
};

let getElement = _.curry(function(elm) {
	return document.querySelector(elm);
});

let constructPlaylist = _.compose(Impure.setHtml('.js-playlist'), constructOrderedList, _.map(constructTrackButton), _.prop('tracks'));

api.get('tracks')
	.then(constructPlaylist)
	.then(player.init)
	.catch((err) => {
		console.log(err);
	});

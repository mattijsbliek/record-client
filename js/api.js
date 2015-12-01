const request = require('superagent');

// getUrl :: String -> String
let getUrl = function(query) {
	return 'http://localhost:3000/api/' + query + '.json';
}

let api = {
	get: (query) => {
		return new Promise((resolve, reject) => {
			request.get(getUrl(query))
				.accept('application/json')
				.end(function(err, res) {
					if (err) {
						reject(err);
					}
					setTimeout(() => {
						resolve(res.body);
					}, 1000);
				});
		});
	}
}

module.exports = api;

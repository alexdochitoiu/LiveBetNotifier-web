module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{tsx,css,js,ts}'
	],
	swDest: 'build/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
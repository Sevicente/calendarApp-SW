//Este código configura Workbox para generar un archivo de service worker

module.exports = {
	globDirectory: 'build/', //Especifica el directorio (build/) donde se buscarán los archivos para precargar.
	globPatterns: [
		'**/*.{json,ico,html,png,txt,css,js}' //Define los patrones de archivos que se incluirán en la precarga
	],
	swDest: 'build/sw.js', //Especifica el destino del archivo de service worker generado
	swSrc:'src/sw-template.js', // Indica la plantilla del service worker //generateSW no funciona con esta propiedad
	// ignoreURLParametersMatching: [
	// 	/^utm_/,
	// 	/^fbclid$/
	// ]
};
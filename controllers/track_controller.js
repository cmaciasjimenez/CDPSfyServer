var fs = require('fs');

var request = require('request');
var models =require('../models/models.js')

exports.load = function(req,res,next,trackId) {
	models.Track.find(trackId).then(function(track) {
		if(track) {
			req.track = track;
			next();
		} else {
			next(new Error('No existe trackId: ' + trackId));
		}
	}).catch(function(error){next(error)});
};

// Devuelve una lista de las canciones disponibles y sus metadatos
exports.list = function (req, res) {
	models.Track.findAll().then(function(tracks) {		
		res.render('tracks/index', {tracks: tracks, errors:[]});
	})
};

// Devuelve la vista del formulario para subir una nueva canción
exports.new = function (req, res) {
	res.render('tracks/new');
};

// Devuelve la vista de reproducción de una canción.
// El campo track.url contiene la url donde se encuentra el fichero de audio
exports.show = function (req, res) {
	models.Track.findById(req.params.trackId).then(function(track) {
		res.render('tracks/show', {track: track, errors:[]});
	})
};

// Escribe una nueva canción en el registro de canciones.
exports.create = function (req, res) {
	var track = req.files.track;
	var urlPostTracks = 'http://10.1.1.1/tracks';

	// Comprobamos que hay un track seleccionado
	if (track == undefined) {
		res.redirect('/tracks/new');
		console.log('No has seleccionado un track');
		return;
	}

	var extension = track.originalname.split('.')[1];

	console.log('Nuevo fichero de audio. Datos: ', track);
	var id = track.name.split('.')[0];
	var name = track.originalname.split('.')[0];

	var url = 'http://10.1.1.1/tracks/';
	var buffer = track.buffer;

	//POST para guardar la cancion en el tracks
	var formData = {
		filename: name + '.' + extension,
		my_buffer: buffer
	};
	request.post({url:urlPostTracks, formData: formData}, function optionalCallback(err, httpResponse, body) {
		if (err) {
		  return console.error('upload failed:', err);
		} else {
		  	//guardamos la URL, que será la respuesta, si todo ha ido bien.
		 	 //body es del estilo: NOMBRE.mp3
		  
			// Escribe los metadatos de la nueva canción en el registro.
			console.log('body: ' + body);
			models.Track.create({
				name: name,
				url: url + body,
			}).then(function() {
				res.redirect('/tracks');
			})
		}
	});
};

// Borra una canción (trackId) del registro de canciones
exports.destroy = function (req, res) {
	var trackId = req.params.trackId;
	var URLdestroyTracks = 'http://10.1.1.1/tracks/'+ trackId;
	
	models.Track.findById(req.params.trackId).then(function(track) {
		var nombre = track.url
		console.log('Nombre: ' + nombre);
		console.log('Id de la cancion ' + nombre + ' es: ' + track.id);
		
		request.del(URLdestroyTracks + nombre);
		
		track.destroy().then(function(){
			res.redirect('/tracks');
		});
	});		
};
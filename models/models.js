var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar BDD SQLite
var sequelize = new Sequelize('database',null,null,{dialect: "sqlite", storage: "track.sqlite"});

//Importar la definicion de Track en track.js
var Track = sequelize.import(path.join(__dirname,'track'));

//Exportar la definicion de Track
exports.Track = Track;

//Crea e inicializa en DB
sequelize.sync().then(function(){
	// Devuelve el numero de filas en la tabla
	Track.count().then(function(count){
		/*if(count === 0){
			Track.create({ name: 'Cute',
						   url: 'http://tracks.cdpsfy.es:3000/songs/Cute.mp3',
						 
						});
			Track.create({ name: 'Dubstep',
						   url: 'http://tracks.cdpsfy.es:3000/songs/Dubstep.mp3',
						   
						});
			Track.create({ name: 'Epic',
						   url: 'http://tracks.cdpsfy.es:3000/songs/Epic.mp3',
						 
						});
			Track.create({ name: 'Littleidea',
						   url: 'http://tracks.cdpsfy.es:3000/songs/Littleidea.mp3',
						 
						}
		).then(function(){console.log('Base de datos inicializada')});
		}; */
	});
});

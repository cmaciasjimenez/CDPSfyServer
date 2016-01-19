/* 

Modelo de datos de canciones (track) ANTIGUO

track_id: {
	name: nombre de la canción,
	url: url del fichero de audio
} 


exports.tracks = {
	1: {
		name: 'Cute',
		url: '/media/Cute.mp3'
	},
	2: {
		name: 'Dubstep',
		url: '/media/Dubstep.mp3'
	},
	3: {
		name: 'Epic',
		url: '/media/Epic.mp3'
	},
	4: {
		name: 'Littleidea',
		url: '/media/Littleidea.mp3'
	}
};



*/
module.exports = function(sequelize, DataTypes){

	return sequelize.define('Track',
	{
		name: DataTypes.STRING,
		url: DataTypes.STRING,

	});
}

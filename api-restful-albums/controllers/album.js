'use strict'

var Album = require('../models/album');


function getAlbum(req, res){
	var albumId = req.params.id;

	Album.findById(albumId, (err, album) => {
		if(err){
			res.status(500).send({message: "Error en la petición"});
		}else{
			if(!album){
				res.status(404).send({message: 'El album no existe!!'});
			}else{
				res.status(200).send({album});
			}
		}


	});
}

function getAlbums(req, res){
	Album.find({}, (err, albums) => {
		if(err){
			res.status(500).send({message: "Error en la petición"});
		}else{
			if(!albums){
				res.status(404).send({message: 'No hay albums!!'});
			}else{
				res.status(200).send({albums});
			}
		}


	});
}

function saveAlbum(req, res){
	var album = new Album();
	var params = req.body;

	album.title = params.title;
	album.description= params.description;

	album.save((err, albumStored) => {
		if(err){
			res.status(500).send({message: "Error al guardar el Album"});
		}else{
			if(!albumStored){
				res.status(404).send({message: "No hay albums!!"});
			}else{
				res.status(200).send({album: albumStored});
			}
		}
	});
}

function updateAlbum(req, res){
	var albumId = req.params.id;
	var update = req.body;

	Album.findByIdAndUpdate(albumId, update, (err, albumUpdate)=>{
		if(err){
			res.status(500).send({message: "Error al actualizar el album"});
		}else{
			if(!albumUpdate){
				res.status(404).send({message: "No se ha podido actualizar el album"});
			}else{
				res.status(200).send({album: albumUpdate});
			}
		}
	} );
}

function deleteAlbum(req, res){
	var albumId = req.params.id;
	

	Album.findByIdAndRemove(albumId, (err, albumRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al borrar el album"});
		}else{
			if(!albumRemoved){
				res.status(404).send({message: "No se ha podido borrar el album"});
			}else{
				res.status(200).send({album: albumRemoved});
			}
		}
	} );
}

module.exports = {
	getAlbum,
	getAlbums,
	saveAlbum,
	updateAlbum,
	deleteAlbum

};
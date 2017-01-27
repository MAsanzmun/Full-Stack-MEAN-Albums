'use strict'

var path = require('path');
var Image = require('../models/image');
var Album = require('../models/album');

function saveImage(req, res){
	var image = new Image();
	var params = req.body;

	image.title = params.title;
	image.picture = null;
	image.album = params.album;

	image.save((err, imageStored) => {
		if(err){
			res.status(500).send({message: "Error al guardar el Imagen"});
		}else{
			if(!imageStored){
				res.status(404).send({message: "No hay imagenes!!"});
			}else{
				res.status(200).send({image: imageStored});
			}
		}
	});
}

function pruebas(req,res){
	res.status(200).send({message: 'Pruebas de controlador de imagenes'});
}

function getImage(req,res){
	var imageId = req.params.id;

	Image.findById(imageId, (err, image)=>{
		if(err){
			res.status(500).send({message: 'Error al obtener la imagen - getImage'});
		}else{
			if(!image){
				res.status(404).send({message:'No existe la imagen'});
			}else{
				Album.populate(image, {path: 'album'}, (err, image) => {
					if(err){
						res.status(500).send({message: 'Error en la petición del populate.'});
					}else{
						res.status(200).send({image});
					}
				});

			}
		}
	});
}

function getImages(req, res){
	var albumId = req.params.album;

	if(!albumId){
		//Sacar todas las imagenes de la base de datos.
		Image.find({}).sort('-title').exec((err, images) => {
			if(err){
				res.status(500).send({message: 'Error en la petición - getImages'});
			}else{
				if(!images){
					res.status(404).send({message: 'No se han encontrado imagenes'});
				}else{
					Album.populate(images, {path: 'album'}, (err, images) => {
						if(err){
							res.status(500).send({message: 'Error en la petición del populate.'});
						}else{
							res.status(200).send({images});
						}
					});
				}
			}
		});
	}else{
		// Sacar todas las imagenes asociadas al album.
		Image.find({album: albumId}).sort('-title').exec((err, images) => {
			if(err){
				res.status(500).send({message: 'Error en la petición - getImages 2'});
			}else{
				if(!images){
					res.status(404).send({message: 'No se han encontrado imagenes'});
				}else{
					Album.populate(images, {path: 'album'}, (err, images) => {
						if(err){
							res.status(500).send({message: 'Error en la petición del populate.'});
						}else{
							res.status(200).send({images});
						}
					});
				}
			}
		});
	}
}
function uploadImage(req, res){
	var imageId = req.params.id;
	var file_name = 'No subido...';
	console.log(req.body);
	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('/');
		var file_name = file_split[1];
		Image.findByIdAndUpdate(imageId, {picture: file_name}, (err, imageUpdated)=>{
			if(err){
				res.status(500).send({message: "Error en la petición - uploadImage"});
			}else{
				if(!imageUpdated){
					res.status(404).send({message: "No se ha actualizado la Imagen!!"});
				}else{
					res.status(200).send({image: imageUpdated});
				}
			}
		});
	}
}

var fs = require('fs');
function getImageFile(req, res){
	var imageFile = req.params.imageFile;

	fs.exists('./uploads/'+imageFile, (exists)=>{
		if(exists){
			res.sendFile(path.resolve('./uploads/'+imageFile));
		}else{
			res.status(200).send({message: 'No existe la imagen!!'});
		}
	});


}



function updateImage(req, res){
	var imageId = req.params.id;
	var update = req.body;
	console.log(update);

	Image.findByIdAndUpdate(imageId, update, (err, imageUpdated)=>{
		if(err){
			res.status(500).send({message: "Error en la petición - updateImage"+imageId+err});
		}else{
			if(!imageUpdated){
				res.status(404).send({message: "No se ha actualizado la Imagen!!"});
			}else{
				res.status(200).send({image: imageUpdated});
			}
		}
	});
}
function deleteImage(req, res){
	var imageId = req.params.id;

	Image.findByIdAndRemove(imageId, (err, imageRemoved)=>{
		if(err){
			res.status(500).send({message: "Error en la petición - delete"});
		}else{
			if(!imageRemoved){
				res.status(404).send({message: "No se ha actualizado la Imagen!!"});
			}else{
				res.status(200).send({image: imageRemoved});
			}
		}
	});
}


module.exports = {
	pruebas,
	getImage,
	saveImage,
	getImages,
	updateImage,
	deleteImage,
	uploadImage,
	getImageFile
};

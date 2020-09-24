const Jimp = require ('jimp')
const fs = require('fs')

// Lê o diretório de imagens
const imagens = fs.readdirSync('src/imagens')

// Trata as imagens lidas e grava em outro diretório
 imagens.forEach( arquivo => {
	Jimp.read('src/imagens/' + arquivo ).then( imagem => {
		return imagem
			.grayscale()
			.write('src/img/' + arquivo) // Grava no diretório de destino
	}).catch( err => {
		console.error(err)
	})
 })


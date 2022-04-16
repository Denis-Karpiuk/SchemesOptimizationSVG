const fs = require('fs')

function deleteFiles(pathes) {
	pathes.forEach(path => {
		fs.unlink(path, err => {
			if (err) {
				console.error(err)
				return
			}
		})
	})
}

exports.deleteFiles = deleteFiles

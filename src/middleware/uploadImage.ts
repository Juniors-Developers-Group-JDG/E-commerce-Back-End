import multer from 'multer'
import path from 'path'
import { v4 as uuid } from 'uuid'
import fs from 'fs'

// Caminho para a pasta de uploads
const uploadFolderPath = 'src/uploads'

// Verifica se a pasta existe, se não existir, cria
if (!fs.existsSync(uploadFolderPath)) {
  fs.mkdirSync(uploadFolderPath)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolderPath)
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

export { upload }

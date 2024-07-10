import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Obtener __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear la carpeta si no existe
const imagePath = path.join(__dirname, "imagenes");
if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath);
}

// Configurar el almacenamiento de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imagenes/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//GET
app.get("/imagenes/:imagen", (req, res) => {
  const { imagen } = req.params;
  const filePath = path.join(imagePath, imagen);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send("Imagen no encontrada");
    } else {
      res.send("Imagen existe");
    }
  });
});

//POST
app.post("/imagenes", upload.single("imagen"), (req, res) => {
  res.send("archivo subido con exito");
  console.log("imagen subida desde server.js");
});

//DELETE
app.delete("/imagenes/:imagen", (req, res) => {
  const { imagen } = req.params;
  const filePath = path.join(imagePath, imagen);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error al borrar la imagen:", err);
      res.status(500).send("Error al borrar la imagen");
      return;
    }
    console.log(`Imagen ${imagen} borrada correctamente`);
    res.send(`Imagen ${imagen} borrada correctamente`);
  });
});

app.listen(port, () => {
  console.log(`escuchando en puerto ${port}`);
});



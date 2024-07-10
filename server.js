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

app.get("/", (req, res) => {
  res.send("hola desde server.js");
});

app.post("/imagenes", upload.single("imagen"), (req, res) => {
  res.send("archivo subido con exito");
  console.log("imagen subida desde server.js");
});

app.listen(port, () => {
  console.log(`escuchando en puerto ${port}`);
});

/* import express from "express";
import multer from "multer";

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/imagenes");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("hola desde server.js");
});

app.post("/imagenes", upload.single("imagen"), (req, res) => {
  res.send("archivo subido con exito");
});

app.listen(port, () => {
  console.log(`escuchando en puerto ${port}`);
});
 */

import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|webp|png/;
    const mimetypes = /image\/jpe?g|image\/webp|image\/png/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only jpg, png, and webp image files are allowed.'), false);
    }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if(err) {
            return res.status(400).send({ message: err.message });
        } else if(req.file) {
            res.status(200).send({ message: 'Image uploaded successfully', image: `/${req.file.path}`});
        } else {
            res.status(400).send({ message: 'No image file uploaded' });
        }
    })
})

export default router;
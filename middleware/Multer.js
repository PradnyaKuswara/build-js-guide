import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        // const ext = file.originalname.split(".").pop();
        const timestamp = new Date().getTime();
        const filename = file.originalname;
        req.body.image = `${timestamp}-${filename}`;
        cb(null, `${timestamp}-${filename}`);
    }
});

const fileFilter = (req, file, cb) => {

    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error("Field image must to have type jpg|jpeg|png."));
    }
    cb(null, true);
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
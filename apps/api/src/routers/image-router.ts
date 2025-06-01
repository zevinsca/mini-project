import express from "express";

import {
  imageArray,
  imageSingle,
  imageFields,
} from "../controllers/image-controller.js";
import { fileUpload } from "../middleware/file-upload-middleware.js";

const router = express.Router();

router.route("/single").post(fileUpload.single("singleImage"), imageSingle);
router.route("/array").post(fileUpload.array("arrayImage"), imageArray);
router.route("/fields").post(
  fileUpload.fields([
    { name: "imagePreview", maxCount: 5 },
    { name: "imageContent", maxCount: 2 },
  ]),
  imageFields
);

export default router;

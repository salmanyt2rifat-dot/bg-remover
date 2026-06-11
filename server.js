const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const cors = require("cors");
require("dotenv").config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

// Home route
app.get("/", (req, res) => {
    res.send("Background Remover API Running");
});

// Remove background route
app.post("/remove-bg", upload.single("image"), async (req, res) => {
    try {
        const formData = new FormData();
        formData.append("image_file", req.file.buffer, "image.jpg");
        formData.append("size", "auto");

        const response = await axios.post(
            "https://api.remove.bg/v1.0/removebg",
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    "X-Api-Key": process.env.REMOVEBG_API_KEY
                },
                responseType: "arraybuffer"
            }
        );

        res.set("Content-Type", "image/png");
        res.send(response.data);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error processing image");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});OR.P.l

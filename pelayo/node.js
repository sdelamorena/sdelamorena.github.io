const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function main() {
    try {
        // Load the docx file as binary content
        const content = await axios.get("https://sdelamorena.github.io/pelayo/templates/amarilla.docx", {responseType: "binary", responseEncoding: "binary"});

        // Unzip the content of the file
        const zip = new PizZip(content.data);

        // This will parse the template, and will throw an error 
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
        doc.render({
            first_name: "John",
            last_name: "Doe",
        });

        // Get the zip document and generate it as a nodebuffer
        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });

        // buf is a nodejs Buffer, you can either write it to a
        // file or res.send it with express for example.
        fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);

    } catch (err) {
        console.error(err);
    }
}
main();
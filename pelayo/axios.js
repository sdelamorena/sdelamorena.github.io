const axios = require("axios");
const fs = require("fs");

async function main() {
    try {
        const response = await axios.get('https://sdelamorena.github.io/pelayo/amarilla.docx', { responseType: 'binary', responseEncoding: 'binary' });
        console.log(response.data);
    } catch (err) {
        console.error(err);
    }
}
main();
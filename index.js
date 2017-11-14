const compareImages = require('resemblejs/compareImages');
const fs = require('fs');
const SCREENSHOT_FOLDER = "./screenshots/";
const OUTPUT_FOLDER = "./output/";
const MASTER = "win10_chrome_50.0.jpg";

fs.readdirSync(SCREENSHOT_FOLDER)
    .forEach(file => {

        // skip not .jpg, master file and .keepme
    if (!file.endsWith(".jpg") || file === ".keepme" || file === ".MASTER") {
        console.log("Abort: ", file);
        return;
    }

    console.log("Process:", file)

    // The parameters can be Node Buffers
    // data is the same as usual with an additional getBuffer() function
    compareImages(
        fs.readFileSync(SCREENSHOT_FOLDER + MASTER),
        fs.readFileSync(SCREENSHOT_FOLDER + file),
    ).then(function (data) {
        const output = OUTPUT_FOLDER + file
        fs.writeFileSync(output, data.getBuffer());
        console.log("Stored:", output)
    }, (error) => {
        console.log(error)
    });
});


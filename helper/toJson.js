import fs from "fs";
function toJson(healthData) {
  fs.writeFile("scrapedData.json", JSON.stringify(healthData), (err) => {
    if (err) throw err;

    console.log("file succesfully saved!");
  });
}
export default toJson
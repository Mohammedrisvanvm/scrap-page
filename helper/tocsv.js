import fs from "fs";
function toCsv(healthData) {
  function convertToCSV(jsonData) {
    const headers = Object.keys(jsonData[0]);
    const csvData = jsonData.map((entry) =>
      headers
        .map((fieldName) => {
          console.log(entry[fieldName]);
          if (Array.isArray(entry[fieldName])) {
            return entry[fieldName].map((inside) => JSON.stringify(inside));
          } else {
            return entry[fieldName];
          }
        })
        .join(",")
    );
    console.log(csvData);
    csvData.unshift(headers.join(","));
    return csvData.join("\n");
  }

  // Write CSV data to a file
  fs.writeFile("data.csv", convertToCSV(healthData.policies), "utf8", (err) => {
    if (err) {
      console.error("Error writing CSV file:", err);
    } else {
      console.log("CSV file saved successfully");
    }
  });
}
export default toCsv

// Importing necessary modules
import axios from "axios";
import { load } from "cheerio";

import parseUrlData from "../util/puppeteer.js";
import toJson from "../helper/toJson.js";
import toCsv from "../helper/tocsv.js";

// Function to fetch HTML data from a given URL
async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

// Controller function to scrape healthcare policy data
export const scrape = (req, res) => {
  res.setHeader("Connection", "keep-alive");
  try {
    // Extracting URL from query parameters
    const url = req.query.url;

    // Object to store scraped data
    const healthData = {};

    // Fetching HTML data from the provided URL
    getHTML(url).then(async (resp) => {
      // Parsing HTML using Cheerio
      const $ = load(resp);

      // Iterating over each main section in the HTML
      $("div.col-lg-12>main").each((i, element) => {
        // Extracting title from each main section
        const text = $(element).find("div h1").text().trim();

        // Array to store medical policy documents
        let MedicalPolicyDocuments = [];

        // Iterating over each section within the main section
        $(element)
          .find("section")
          .each((i, ul) => {
            // Extracting children of each section
            const children = $(ul).children();

            // Iterating over each list item within the section
            children.each((i, li) => {
              // Extracting children of each list item
              const children = $(li).children();

              // Iterating over each link within the list item
              children.each((i, a) => {
                // Extracting link text and URL and adding it to MedicalPolicyDocuments array
                MedicalPolicyDocuments.push({
                  [$(a).text()]: `https://genhealth.ai${$(a)
                    .find("a")
                    .attr("href")}`,
                });
              });
            });
          });

        // Storing title and medical policy documents in healthData object
        healthData["title"] = text;
        healthData["MedicalPolicyDocuments"] = MedicalPolicyDocuments;
      });
      // Array to store parsed data from medical policy documents
      const responseData = [];

      // Iterating over each document in the MedicalPolicyDocuments array
      for (const document of healthData["MedicalPolicyDocuments"]) {
        // Parsing data from the document URL and awaiting the response
        const response = await parseUrlData(document);
        // Adding the parsed response to the responseData array
        if (response) responseData.push(response);
      }

      // Storing the parsed data in the healthData object under the key "policies"
      healthData["policies"] = responseData;
      // console.log(healthData);
      toJson(healthData)
      toCsv(healthData)
      // function convertToCSV(jsonData) {
      //   const headers = Object.keys(jsonData[0]);
      //   const csvData = jsonData.map((entry) =>
      //     headers
      //       .map((fieldName) => {
      //         console.log(entry[fieldName]);
      //         if (Array.isArray(entry[fieldName])) {
      //           return entry[fieldName].map((inside) => JSON.stringify(inside));
      //         } else {
      //           return entry[fieldName];
      //         }
      //       })
      //       .join(",")
      //   );
      //   console.log(csvData);
      //   csvData.unshift(headers.join(","));
      //   return csvData.join("\n");
      // }

      // // Write CSV data to a file
      // fs.writeFile(
      //   "data.csv",
      //   convertToCSV(healthData.policies),
      //   "utf8",
      //   (err) => {
      //     if (err) {
      //       console.error("Error writing CSV file:", err);
      //     } else {
      //       console.log("CSV file saved successfully");
      //     }
      //   }
      // );
      // Writing scraped data to a JSON file
      // fs.writeFile("scrapedData.json", JSON.stringify(healthData), (err) => {
      //   if (err) throw err;

      //   console.log("file succesfully saved!");
      // });
      // // Sending response indicating successful completion
      res.status(200).json(healthData);
    });
  } catch (error) {
    // Handling errors
    res.status(500).json(error);
  }
};

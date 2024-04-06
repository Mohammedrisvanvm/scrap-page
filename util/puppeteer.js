// Importing necessary modules
import puppeteer from "puppeteer";

// Function to parse data from a given URL
const parseUrlData = async (data) => {
  // Extracting policy name and link from the data object
  const policyName = Object.keys(data)[0];
  const policyLink = data[policyName];

  // Launching a new Puppeteer browser instance
  const browser = await puppeteer.launch({
    headless: false, // Running the browser in headful mode for visibility
    executablePath: puppeteer.executablePath(), // Using the Puppeteer's bundled Chromium executable path
    args: ["--no-sandbox", "--disabled-setupid-sandbox"], // Arguments to avoid sandboxing issues
  });

  // Opening a new page within the browser
  const pages = await browser.pages();
  const page = pages[0];

  // Navigating to the policy link
  await page.goto(policyLink);

  // Setting screen size for consistent rendering
  await page.setViewport({ width: 1080, height: 1024 });

  // Fetching data from forms
  const formhandle = await page.$$(".ant-form");

  for (const form of formhandle) {
    // Extracting procedure name from the form
    const procedureName = await form.$eval("h3", (element) =>
      element.textContent.trim()
    );

    // Array to store separated data sections
    const separatedData = [];

    // Extracting sections from the form
    const formSections = await form.$$("h4");

    for (const section of formSections) {
      // Extracting text from section headings
      const h4Text = await section.evaluate((node) => node.textContent.trim());

      // Object to store section data
      const sectionData = {
        type: h4Text,
        questions: [],
      };

      // Finding parent element of section
      const parentHandle = await section.evaluateHandle(
        (element) => element.parentElement
      );

      if (parentHandle) {
        // Extracting text from sibling spans
        const siblingSpans = await parentHandle.$$("span");

        for (const span of siblingSpans) {
          const spanText = await span.evaluate((node) =>
            node.textContent.trim()
          );
          if (spanText !== "") {
            sectionData.questions.push(spanText);
          }
        }
        separatedData.push(sectionData);
      }
    }

    // Formatting the separated data
    const formattedData = separatedData.map((item) => ({
      type: item.type,
      questions: item.questions.reduce((acc, curr, index) => {
        // Grouping questions and options into objects
        if (index % 4 === 0) {
          const match = curr.match(/\((\d+)\)/);
          const code = match ? match[1] : "";
          const questionText = match ? curr.replace(/\(\d+\)\s/, "") : curr;

          acc.push({
            code,
            question: questionText,
            option: [
              item.questions[index + 1],
              item.questions[index + 2],
              item.questions[index + 3],
            ],
          });
        }
        return acc;
      }, []),
    }));

    // Extracting additional metadata from the page
    const data = await page.$$(".mb-2");
    const spanValues = await data[0].evaluate((el) => {
      const spans = Array.from(el.querySelectorAll("div > a > span"));
      return spans.map((span) => span.textContent);
    });
    const effectiveDate = await page.$eval(".ant-col:nth-child(1) p", (p) =>
      p.textContent.trim()
    );
    const lastReviewedDate = await page.$eval(".ant-col:nth-child(2) p", (p) =>
      p.textContent.trim()
    );
    const originalDocumentLink = await page.$eval(
      ".ant-col:nth-child(3) a",
      (a) => a.href
    );

    // Constructing the final data object
    const newData = {
      policyName,
      policyLink,
      procedureName,
      effectiveDate,
      lastReviewedDate,
      originalDocumentLink,
      type: spanValues[0],
      PlanName: spanValues[1],
    };

    // Mapping formatted data to the final data object
    formattedData.forEach((item) => {
      newData[item.type] = item.questions;
    });

    // Closing the browser
    await browser.close();

    // Returning the final data object
    return newData;
  }
};

// Exporting the parseUrlData function
export default parseUrlData;

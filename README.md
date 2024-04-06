# Scrape-page

## Description

Scrape-page is a tool for scraping data from web pages using Puppeteer and Cheerio.

## Features

- Fetches HTML data from a given URL.
- Parses the HTML content using Cheerio for easy data extraction.
- Utilizes Puppeteer for headless browsing and scraping of dynamic websites.

## Installation

To install Scrape-page, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/scrape-page.git

   ```

2. Change directory:

```bash
 cd scrape-page
```

3. Start server:

```bash
npm run start

```

## Working

1. To work with function you need to use an application that allows the testing of web APIs

example : Postman (preffered),thunderclient(vs-extension),or any

2. Method

```bash
POST
```

3. BaseUrl
Here are some example URLs that you can use with the function:

```bash
http://localhost:3000/scrap
```

4. Urls

```bash
https://genhealth.ai/policy/aetna/forms/A
https://genhealth.ai/policy/anthem-bluecross-ca/forms/A
https://genhealth.ai/policy/anthem-bluecross-ct/forms/A
https://genhealth.ai/policy/cigna/forms/A
https://genhealth.ai/policy/cms/forms/A
https://genhealth.ai/policy/healthfirst/forms/A
https://genhealth.ai/policy/humana/forms/A
https://genhealth.ai/policy/oscar/forms/A
https://genhealth.ai/policy/point32/forms/A
https://genhealth.ai/policy/sunflower/forms/A
https://genhealth.ai/policy/united/forms/A

```

5. Sample request

```bash
http://localhost:3000/scrap?url=https://genhealth.ai/policy/anthem-bluecross-ct/forms/A
```

please make sure url argument pass through queries


This README provides instructions for working with the function, including the method, base URL, available URLs, and a sample request. Adjust the URLs and base URL as needed to match your actual API endpoints. Let me know if you need further assistance!


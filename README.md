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

>[!NOTE]
Please ensure that URL arguments are passed through queries when making requests to the API.

[!IMPORTANT]
This README provides instructions for working with the function, including the method, base URL, available URLs, and a sample request. Adjust the URLs and base URL as needed to match your actual API endpoints. Let me know if you need further assistance!

## Scrape Data View

[!NOTE]
You can view the scraped data in the following file:

```bash
scrapedData.json
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

MIT License

Copyright (c) [2024] [Mohammed Risvan VM]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[//]: #@corifeus-header

  [![NPM](https://img.shields.io/npm/v/p3x-html-pdf.svg)](https://www.npmjs.com/package/p3x-html-pdf)  [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m780749701-41bcade28c1ea8154eda7cca.svg)](https://stats.uptimerobot.com/9ggnzcWrw)





# 📃 Generates PDF from HTML with custom headers and footers with wkhtmltopdf v2025.4.150


  
🌌 **Bugs are evident™ - MATRIX️**  
🚧 **This project is under active development!**  
📢 **We welcome your feedback and contributions.**  
    



### NodeJS LTS is supported

### 🛠️ Built on NodeJs version

```txt
v22.13.0
```





# 📝 Description

                        
[//]: #@corifeus-header:end


**p3x-html-pdf** is a Node.js package that generates PDFs from HTML with custom headers and footers using `wkhtmltopdf`. It is a robust tool for creating professional-grade PDFs with features like:

- 📜 **Dynamic Headers and Footers**: Add placeholders for page numbers.
- 🛠️ **Customizable Layouts**: Configure margins, orientation, and paper size.
- ⚡ **Async/Await Support**: Modern JavaScript compatibility for efficient workflows.
- 🔄 **Dynamic Content**: Render data-driven tables and content dynamically.

---

## 🚀 Installation

Install via Yarn:

```bash
yarn add p3x-html-pdf
```

Or install via npm:

```bash
npm install p3x-html-pdf
```

Import in your project:

```javascript
const { generate } = require('p3x-html-pdf');
```

---

## 🛠️ Features

- 📜 **Custom Headers and Footers**: Create professional headers and footers with dynamic placeholders.
- 🔀 **Flexible Page Settings**: Set paper size, orientation, margins, and more.
- ⚡ **Async/Await Support**: Fully compatible with modern JavaScript workflows.
- 📊 **Dynamic Tables and Content**: Generate tables and other dynamic HTML content easily.

---

## 📖 Usage Example

```javascript
const { generate } = require('p3x-html-pdf');
const path = require('path');

(async () => {
    const options = {
        settings: {
            save: true,
            template: {
                format: 'A4',
                orientation: 'portrait',
                marginLeft: 10,
                marginRight: 10,
            },
            html: `
            <div id="p3x-header" data-height="20mm">
                <h1>Header Content</h1>
            </div>
            <div id="p3x-footer" data-height="15mm">
                <p>Page \${page} of \${pages}</p>
            </div>
            <div>
                <h2>Content</h2>
                <p>This is a test PDF document.</p>
                <table width="100%" align="left" border="1">
                    <tr>
                        <th align="left">Header 1</th>
                        <th align="left">Header 2</th>
                        <th align="left">Header 3</th>
                    </tr>
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                    </tr>
                    <tr>
                        <td>Data 4</td>
                        <td>Data 5</td>
                        <td>Data 6</td>
                    </tr>
                </table>
            </div>
            `,
        },
        title: 'Sample PDF',
        saveFile: path.resolve(__dirname, 'output.pdf'),
    };

    try {
        await generate(options);
        console.log('✅ PDF generated successfully!');
        // or options.save = false
        const buffer = await generate(options);
    } catch (err) {
        console.error('❌ Error generating PDF:', err);
    }
})();
```

---

## 🔧 Configuration

### Options

- **Settings**
  - `save`: If false, it returns as a buffer.
  - `template.format`: Page size, e.g., `A4`, `Letter`.
  - `template.orientation`: Page orientation (`portrait` or `landscape`).
  - `template.marginLeft`, `template.marginRight`: Margins in mm.
  - `template.copies`: Copies to generate.
  - `template.fixedWidth` and `template.fixedHeight`: If above zero, generates in millimeters.
  - `html`: HTML content with placeholders.
- **title**: PDF document title.
- **saveFile**: Path for saving the PDF.
- **base** The HTML base href is other then current directory, it can be online as well.
- **css**: Customize the CSS for serving, by default it is in `src/html-template.css`
- **jquery**: The latest that works with webkit is jQuery v1.12.4 is required, you can extend with more functions, the default is in `src/jquery-1.12.4.min.js`
- **javascriptDelay**: The delay before the PDF is generated as default is 1000 ms.

For more options, check the official [wkhtmltopdf usage guide](https://wkhtmltopdf.org/usage/wkhtmltopdf.txt).  
  
Unfortunately the version latest HTTPS TLS 1.3 is not working, so it is better to use inline filesystem images or using HTTP as that is dated but still works.

---

## 🌟 Placeholders

You can use placeholders in your HTML for dynamic data (only these, but it is enough, the rest you can generate in HTML):

- `${page}`: Current page.
- `${pages}`: Total pages.

Example:

```html
<div id="p3x-footer" data-height="15mm">
  <p>Page ${page} of ${pages}</p>
</div>
```

The `p3x-footer` and `p3x-header` should not have any styles other than `id` and `data-height`.

---

## 📊 Advanced Features

- **Debugging**: Use `debug: true` to enable detailed logs.
- **Header/Footer Templates**: Create rich HTML templates for headers/footers.
- **Dynamic Content**: Inject dynamic tables, invoices, or other content into the PDF.

---

## 🌍 Architecture

`p3x-html-pdf` works seamlessly on Linux, Windows and ARM64.




---

## 🖼️ Example Output

Check out an example output PDF:  
[Example PDF](https://cdn.corifeus.com/git/html-pdf/assets/p3x-html-pdf-output.pdf).
  
![Example Output](https://cdn.corifeus.com/git/html-pdf/assets/p3x-html-pdf-output.png)  
  
---

## 🔬 Legacy Rendering with Webkit

This library uses `wkhtmltopdf`, which relies on an older version of Webkit. As such, it does not support modern CSS features like `flexbox`. Instead, older solutions such as `float` and `table`-based layouts must be used for alignment. While these approaches are not modern, they are efficient and compatible with the rendering engine.

For instance, the following layout works seamlessly:

```html
<div id="p3x-header" data-height="40mm">
    <div style="width: 100%; padding: 0px; display: table;">
        <div style="display: table-cell; vertical-align: middle;">
            <img src="http://cdn.corifeus.com/assets/png/patrikx3.png" alt="Header Logo" style="height:40mm; margin:0;"/>
        </div>
        <div style="display: table-cell; vertical-align: middle; text-align: right; width: 100%;">
            <h1 style="margin: 0; font-size: 20px; color: #333;">P3X HTML Invoice</h1>
            <p style="margin: 5px 0 0; font-size: 14px; color: #555;">Generated: 2023-10-01</p>
        </div>
    </div>
</div>
```



## Steps to Clone and Run `test/test.js`

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/patrikx3/html-pdf.git
   cd html-pdf
   ```

2. **Install Dependencies**:
   Using Yarn:
   ```bash
   yarn install
   ```

   Or, using NPM:
   ```bash
   npm install
   ```

3. **Run the Test Script**:
   ```bash
   node ./test/test.js
   ```
---

## Puppeteer vs. p3x-html-pdf: Resource Usage and Features Comparison

When deciding between **Puppeteer** and **p3x-html-pdf**, it's essential to understand their differences in resource usage and capabilities.

### Technology Difference

- **p3x-html-pdf** is built on **wkhtmltopdf**, which uses the WebKit rendering engine. It's lightweight and optimized for HTML-to-PDF tasks.
- **Puppeteer** launches a full **Chrome/Chromium** instance, consuming more CPU and memory, even in headless mode.

### Resource Usage Comparison

| Feature                | p3x-html-pdf (wkhtmltopdf)                  | Puppeteer (Chrome/Chromium)              |
|------------------------|---------------------------------------------|------------------------------------------|
| **Memory Usage**       | Low                                         | High                                     |
| **CPU Usage**          | Low                                         | High                                     |
| **Startup Time**       | Fast                                        | Slower due to browser launch            |
| **Dynamic Content**    | Limited support for JavaScript              | Full support for JavaScript              |
| **Rendering Accuracy** | Basic CSS and HTML support                  | Pixel-perfect rendering with modern web standards |
| **Flexibility**        | Headers, footers, scripts (older JS versions) | Highly customizable (headers, footers, scripts) |
| **Scalability**        | Suitable for lightweight tasks and servers | Better for advanced use cases and large-scale rendering |
| **File Size**          | Smaller binary for wkhtmltopdf dependency  | Puppeteer requires downloading Chromium (~100MB) |

### Trade-offs

#### p3x-html-pdf (wkhtmltopdf)
- **Pros:**
  - Lightweight and uses fewer resources.
  - Faster startup time.
  - Ideal for static HTML content with minimal JavaScript or CSS.

- **Cons:**
  - Limited support for modern web standards and advanced JavaScript.
  - Basic rendering capabilities.

#### Puppeteer
- **Pros:**
  - Full support for dynamic content, advanced JavaScript, and modern web standards.
  - Highly customizable headers, footers, and PDF options.
  - Pixel-perfect rendering accuracy.

- **Cons:**
  - Consumes more CPU and memory.
  - Slower startup time due to launching a full Chrome/Chromium instance.

### When to Use Each

#### Use p3x-html-pdf (wkhtmltopdf):
- When your content is **static** or doesn’t rely on modern web technologies.
- When resource efficiency is a priority (e.g., on resource-constrained servers).

#### Use Puppeteer:
- When your content is **dynamic** or relies heavily on JavaScript and CSS.
- When rendering accuracy, modern web technology support, or customization is critical.

### Conclusion

- **p3x-html-pdf** (wkhtmltopdf) is a better fit for lightweight tasks with simple requirements.
- **Puppeteer** excels in advanced and dynamic use cases but comes with higher resource costs.

---

**Happy PDF Generating!** 🎉

[//]: #@corifeus-footer

---

## 🚀 Quick and Affordable Web Development Services

If you want to quickly and affordably develop your next digital project, visit [corifeus.eu](https://corifeus.eu) for expert solutions tailored to your needs.

---

## 🌐 Powerful Online Networking Tool  

Discover the powerful and free online networking tool at [network.corifeus.com](https://network.corifeus.com).  

**🆓 Free**  
Designed for professionals and enthusiasts, this tool provides essential features for network analysis, troubleshooting, and management.  
Additionally, it offers tools for:  
- 📡 Monitoring TCP, HTTP, and Ping to ensure optimal network performance and reliability.  
- 📊 Status page management to track uptime, performance, and incidents in real time with customizable dashboards.  

All these features are completely free to use.  

---

## ❤️ Support Our Open-Source Project  
If you appreciate our work, consider ⭐ starring this repository or 💰 making a donation to support server maintenance and ongoing development. Your support means the world to us—thank you!  

---

### 🌍 About My Domains  
All my domains, including [patrikx3.com](https://patrikx3.com), [corifeus.eu](https://corifeus.eu), and [corifeus.com](https://corifeus.com), are developed in my spare time. While you may encounter minor errors, the sites are generally stable and fully functional.  

---

### 📈 Versioning Policy  
**Version Structure:** We follow a **Major.Minor.Patch** versioning scheme:  
- **Major:** 📅 Corresponds to the current year.  
- **Minor:** 🌓 Set as 4 for releases from January to June, and 10 for July to December.  
- **Patch:** 🔧 Incremental, updated with each build.  

**🚨 Important Changes:** Any breaking changes are prominently noted in the readme to keep you informed.

---


[**P3X-HTML-PDF**](https://corifeus.com/html-pdf) Build v2025.4.150

 [![NPM](https://img.shields.io/npm/v/p3x-html-pdf.svg)](https://www.npmjs.com/package/p3x-html-pdf)  [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)






[//]: #@corifeus-footer:end

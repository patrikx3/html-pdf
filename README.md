[//]: #@corifeus-header

  [![NPM](https://img.shields.io/npm/v/p3x-html-pdf.svg)](https://www.npmjs.com/package/p3x-html-pdf)  [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Uptime ratio (90 days)](https://network.corifeus.com/public/api/uptime-shield/31ad7a5c194347c33e5445dbaf8.svg)](https://network.corifeus.com/status/31ad7a5c194347c33e5445dbaf8)





# 📃 Generates PDF from HTML with custom headers and footers with wkhtmltopdf v2025.4.166


  
🌌 **Bugs are evident™ - MATRIX️**  
🚧 **This project is under active development!**  
📢 **We welcome your feedback and contributions.**  
    



### NodeJS LTS is supported

### 🛠️ Built on NodeJs version

```txt
v22.13.1
```





# 📝 Description

                        
[//]: #@corifeus-header:end


**p3x-html-pdf** is a Node.js package that generates PDFs from HTML with custom headers and footers using `wkhtmltopdf`. It is a robust tool for creating professional-grade PDFs with features like:

- 📜 **Dynamic Headers and Footers**: Add placeholders for page numbers, dates, and more.
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

## 📖 Usage Example

```javascript
const { generate } = require('p3x-html-pdf');
const path = require('path');

(async () => {
    const outputPath = path.join(process.cwd(), 'p3x-html-pdf-output.pdf');
    
    const options = {
        settings: {
            save: true,
            template: {
                format: 'A4',
                marginLeft: 10,
                marginRight: 10,
                fixedWidth: null,
                fixedHeight: null,
                copies: 1,
                orientation: 'portrait',
            },
            html: `
            <div id="p3x-header-1" data-height="40mm">
                <div style="width: 100%; padding: 0px; display: table;">
                    <div style="display: table-cell; vertical-align: middle;">
                        <img src="http://cdn.corifeus.com/assets/png/patrikx3.png" alt="Header Logo" style="height:40mm; margin:0;"/>
                    </div>
                    <div style="display: table-cell; vertical-align: middle; text-align: right; width: 100%;">
                        <h1 style="margin: 0; font-size: 20px; color: #333;">P3X HTML Invoice - First Page</h1>
                        <p style="margin: 5px 0 0; font-size: 14px; color: #555;">Generated: ${new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
            <div id="p3x-header" data-height="40mm" >
                <div style="display: table; width: 100%; height: 40mm; text-align: right;">
                    <div style="display: table-cell; vertical-align: middle; text-align: right;">
                        <h1 style="margin: 0; font-size: 20px; color: #333;">P3X HTML Invoice </h1>
                    </div>
                </div>
            </div>
            <div id="p3x-header-last" data-height="40mm" >
                <div style="display: table; width: 100%; height: 40mm; text-align: right;">
                    <div style="display: table-cell; vertical-align: middle; text-align: right;">
                        <h1 style="margin: 0; font-size: 20px; color: #333;">P3X HTML Final Notes </h1>
                    </div>
                </div>
            </div>
            <div id="p3x-footer" data-height="10mm">
                <div style="text-align: right; font-size: 12px; color: #777;">
                    Page \${page} of \${pages}                       
                </div>
            </div>
            <div id="p3x-footer-last" data-height="10mm">
                <div style="text-align: right; font-size: 12px; color: #777;">
                    Final \${page} of \${pages}                       
                </div>
            </div>
            <div>
                <h2 style="color: #222;">Invoice Content</h2>
                <p style="font-size: 14px; color: #555;">This invoice showcases structured content on a single page for detailed clarity.</p>
                <table style="width:100%; border-collapse: collapse; margin: 10px 0; font-size: 14px;">
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Item</th>
                        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Quantity</th>
                        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Price</th>
                        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Total</th>
                    </tr>
                    ${Array.from({ length: 26 }).map((_, i) => {
                const price = (i + 1) * 10;
                const quantity = (i % 5) + 1;
                const total = price * quantity;
                return `<tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Product ${String.fromCharCode(65 + (i % 26))}</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${quantity}</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${price}.00</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${total}.00</td>
                        </tr>`;
            }).join('')}
                    <tr>
                        <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">Subtotal</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">$${Array.from({ length: 15 }).reduce((acc, _, i) => acc + ((i + 1) * 10 * ((i % 5) + 1)), 0)}.00</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">VAT (20%)</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">$${(Array.from({ length: 15 }).reduce((acc, _, i) => acc + ((i + 1) * 10 * ((i % 5) + 1)), 0) * 0.2).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">Total</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">$${(Array.from({ length: 15 }).reduce((acc, _, i) => acc + ((i + 1) * 10 * ((i % 5) + 1)), 0) * 1.2).toFixed(2)}</td>
                    </tr>
                </table>
            </div>
            <div class="p3x-template-page-break"></div>
            <div>
                <h2 style="color: #222;">Additional Information</h2>
                <p style="font-size: 14px; color: #555;">This page provides further details about the invoice, payment methods, and terms. Below is a breakdown of important notes:</p>
                <ul style="font-size: 14px; color: #555;">
                    <li>Payments are due within 30 days of receipt.</li>
                    <li>Accepted payment methods include credit card, bank transfer, and PayPal.</li>
                    <li>Please ensure that all transactions reference the invoice number provided above.</li>
                </ul>
                <p style="font-size: 14px; color: #555;">If you have any questions, feel free to contact our support team at <a href="mailto:support@patrikx3.com">support@patrikx3.com</a>.</p>
            </div>
            <div class="np3x-template-page-break"></div>
            <div>
                <p style="font-size: 14px; color: #555;">Thank you for your business! We hope to work with you again in the future. Stay tuned for updates on our services and offerings by visiting our website or subscribing to our newsletter.</p>
            </div>
        `,
        },
        title: 'P3X-HTML-PDF Detailed Invoice',
        debug: false,
        saveFile: outputPath,
    };

    try {
        await generate(options);
        console.log('✅ PDF generated successfully!');

        // or
        options.settings.save = false
        const buffer = await generate(options);
        console.log('--------------------------------------------------------------')
        console.log('PDF Buffer:', buffer);

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

### How to Add a Page Break with `p3x-html-pdf`

To insert a page break, simply use the following snippet:

```html
<div class="p3x-template-page-break"></div>
```

#### ✅ Key Points:
- 🔧 **No additional CSS** is required; the functionality is built-in.
- 📑 The content after this `<div>` will automatically start on a new page.
- 🧹 Ensure your HTML structure is clean for proper rendering.

#### 📝 Example:
```html
<div>
  <p>📜 This content will be on the first page.</p>
</div>

<div class="p3x-template-page-break"></div>

<div>
  <p>📜 This content will appear on the next page.</p>
</div>
```
---

## 🌟 Placeholders

You can use placeholders in your HTML for dynamic data (only these, but it is enough, the rest you can generate in HTML):

- `${page}`: Current page.
- `${pages}`: Total pages.
- `${frompage}`: The starting page of the current section.
- `${topage}`: The ending page of the current section.
- `${webpage}`: The URL of the web page (if applicable).
- `${section}`: The name of the current section.
- `${subsection}`: The name of the current subsection.
- `${date}`: The current date in a localized format.
- `${isodate}`: The current date in ISO 8601 format.
- `${time}`: The current time.
- `${title}`: The document title.
- `${doctitle}`: The title of the document as defined in metadata.
- `${sitepage}`: Current site page number (specific context).
- `${sitepages}`: Total number of site pages (specific context).

### Example

```html
<div id="p3x-footer" data-height="10mm">
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

## 🌟 Headers and Footers in `p3x-html-pdf`

This document provides a detailed explanation of how to work with headers and footers using `p3x-html-pdf`, including first-page-specific headers and indexed headers for subsequent pages. With this approach, you can create professional-grade PDFs with precise control over header and footer content.

---

### 📖 Overview

Headers and footers in `p3x-html-pdf` are managed via HTML templates. You can:
- Define **default headers and footers** for all pages.
- Create **specific headers or footers** for certain pages using indexing (e.g., `p3x-header-1` for the first page).
- Dynamically calculate content for headers and footers, such as page numbers, document titles, or custom logic.

---

### 🚀 How It Works

`p3x-html-pdf` uses the `id` attribute and `data-height` to manage headers and footers. The key attributes and elements are:

- **Header IDs**:
  - `p3x-header`: The default header for all pages.
  - `p3x-header-<page>`: A header for a specific page (e.g., `p3x-header-1` for the first page).
  - `p3x-header-last`: Last header for last page.
- **Footer IDs**:
  - `p3x-footer`: The default footer for all pages.
  - `p3x-footer-<page>`: A footer for a specific page.
  - `p3x-footer-last`: Last footer for last page.
- **`data-height`**: Specifies the height of the header/footer (in millimeters). Ensure this matches the expected content size to prevent overlap.

---

### 🌟 Example: First Page Header and Default Header

The following example demonstrates a **custom header** for the first page and a **default header** for the rest of the document.

#### HTML Template

```html
<div id="p3x-header-1" data-height="40mm">
    <div style="width: 100%; padding: 0px; display: table;">
        <div style="display: table-cell; vertical-align: middle;">
            <img src="http://cdn.corifeus.com/assets/png/patrikx3.png" alt="Header Logo" style="height:40mm; margin:0;"/>
        </div>
        <div style="display: table-cell; vertical-align: middle; text-align: right; width: 100%;">
            <h1 style="margin: 0; font-size: 20px; color: #333;">P3X HTML Invoice - First Page</h1>
            <p style="margin: 5px 0 0; font-size: 14px; color: #555;">Generated: ${new Date().toLocaleDateString()}</p>
        </div>
    </div>
</div>

<div id="p3x-header" data-height="40mm">
    <div style="display: table; width: 100%; height: 40mm; text-align: right;">
        <div style="display: table-cell; vertical-align: middle; text-align: right;">
            <h1 style="margin: 0; font-size: 20px; color: #333;">P3X HTML Invoice</h1>
        </div>
    </div>
</div>

<div id="p3x-header-last" data-height="40mm" >
    <div style="display: table; width: 100%; height: 40mm; text-align: right;">
        <div style="display: table-cell; vertical-align: middle; text-align: right;">
            <h1 style="margin: 0; font-size: 20px; color: #333;">P3X HTML Final Notes </h1>
        </div>
    </div>
</div>

<div id="p3x-footer" data-height="10mm">
    <div style="text-align: right; font-size: 12px; color: #777;">
        Page ${page} of ${pages}
    </div>
</div>
```

---

### 🛠️ Dynamic Header and Footer Logic

- Use indexed headers or footers for specific pages.
- Utilize placeholders like `${page}` and `${pages}` to dynamically display the current page and total pages.

#### Example Configuration in JavaScript

```javascript
const options = {
    settings: {
        save: true,
        template: {
            format: 'A4',
            marginLeft: 10,
            marginRight: 10,
            orientation: 'portrait',
        },
        html: `
        <div id="p3x-header-1" data-height="40mm">
            <!-- Custom header for the first page -->
        </div>
        <div id="p3x-header" data-height="40mm">
            <!-- Default header for subsequent pages -->
        </div>
        <div id="p3x-footer" data-height="10mm">
            <!-- Footer for all pages -->
        </div>
        `,
    },
    title: 'Dynamic Headers and Footers Example',
    saveFile: path.resolve(__dirname, 'output.pdf'),
};
```

---

### 📏 Calculating Headers and Footers per Page

When designing headers and footers:
1. **Estimate Content Size:**
   - Use `data-height` to reserve enough space for your header or footer content.
   - Example: A header with a logo and text may need `40mm`.

2. **Adjust Margins:**
   - Ensure the margins accommodate both the header/footer and the main content.

3. **Testing for Multi-Page Documents:**
   - For multi-page documents, validate the alignment of headers and footers across all pages.

---

#### 📄 Headers and Footers with Indexed Customization

`p3x-html-pdf` supports indexed headers and footers, allowing unique designs for specific pages. For example, `p3x-header-1` can define a header for the first page, while `p3x-header` applies to subsequent pages. Similarly, `p3x-footer-1` can be used for a custom first-page footer.

##### Key Points:
1. **Indexed IDs**: Use `p3x-header-1`, `p3x-footer-1`, etc., for specific pages. Default headers (`p3x-header`) and footers (`p3x-footer`) are used when no specific index is found and there is `p3x-header-last` or `p3x-footer-last`.
2. **Consistent Heights**: All headers and footers must share the same `data-height` (e.g., `40mm` for headers, `10mm` for footers) to ensure proper alignment and accurate page calculations.
3. **Dynamic Content**: Use placeholders like `${page}` and `${pages}` to display page-specific data dynamically.

This approach allows tailored styling for specific pages while maintaining consistent layouts throughout the document.
  
--- 
  
### 📊 Advanced Features

- Combine **indexed headers/footers** for specific pages with a **default** fallback.
- Use JavaScript in the `header-footer.html` template to dynamically adjust content.
- Use indexed configurations to simulate "first-page" or "last-page" behavior.

---

### 🖼️ Example Output

You can generate a PDF with the provided configuration to see how headers and footers are applied dynamically. For larger documents, this approach allows consistent styling with room for customization.


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


[**P3X-HTML-PDF**](https://corifeus.com/html-pdf) Build v2025.4.166

 [![NPM](https://img.shields.io/npm/v/p3x-html-pdf.svg)](https://www.npmjs.com/package/p3x-html-pdf)  [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)






[//]: #@corifeus-footer:end

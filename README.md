[//]: #@corifeus-header

  [![NPM](https://img.shields.io/npm/v/p3x-html-pdf.svg)](https://www.npmjs.com/package/p3x-html-pdf)  [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m780749701-41bcade28c1ea8154eda7cca.svg)](https://stats.uptimerobot.com/9ggnzcWrw)





# 📃 Generates PDF from HTML with custom headers and footers with wkhtmltopdf v2025.4.119


  
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

## 🛠️ Features

- 📜 **Custom Headers and Footers**: Create professional headers and footers with dynamic placeholders.
- 📏 **Flexible Page Settings**: Set paper size, orientation, margins, and more.
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
                <p>Page ${page} of ${pages}</p>
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

For more options, check the official [wkhtmltopdf usage guide](https://wkhtmltopdf.org/usage/wkhtmltopdf.txt).

---

## 🌟 Placeholders

You can use placeholders in your HTML for dynamic data:

- `${page}`: Current page.
- `${pages}`: Total pages.
- `${date}`: Current date.
- `${isodate}`: ISO date format.
- `${time}`: Current time.

Example:

```html
<div id="p3x-footer" data-height="15mm">
  <p>Page ${page} of ${pages} - Generated on ${date}</p>
</div>
```

---

## 📊 Advanced Features

- **Debugging**: Use `debug: true` to enable detailed logs.
- **Header/Footer Templates**: Create rich HTML templates for headers/footers.
- **Dynamic Content**: Inject dynamic tables, invoices, or other content into the PDF.

---

## 🌍 Architecture

`p3x-html-pdf` works seamlessly on Linux and Windows.

### ARM64 Support

If `os.arch() === 'arm64'`, the package automatically sets the `wkhtmltopdf` path to `/usr/local/bin/wkhtmltopdf-arm64`.  
Download the binary manually and place it there:  
[wkhtmltopdf-arm64 binary](https://github.com/houseoftech/wkhtmltopdf-arm64/raw/refs/heads/master/bin/wkhtmltopdf-arm64).

---

## 🖼️ Example Output

Check out an example output PDF:  
[Example PDF](https://cdn.corifeus.com/git/html-pdf/test-output.pdf).

---

## License

This project is licensed under the MIT License.

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

### 🖥️ Server Availability  
Our server may occasionally be down, but please be patient. Typically, it will be back online within 15-30 minutes. We appreciate your understanding.  

---

### 🌍 About My Domains  
All my domains, including [patrikx3.com](https://patrikx3.com), [corifeus.hu](https://corifeus.hu), and [corifeus.com](https://corifeus.com), are developed in my spare time. While you may encounter minor errors, the sites are generally stable and fully functional.  

---

### 📈 Versioning Policy  
**Version Structure:** We follow a **Major.Minor.Patch** versioning scheme:  
- **Major:** 📅 Corresponds to the current year.  
- **Minor:** 🌓 Set as 4 for releases from January to June, and 10 for July to December.  
- **Patch:** 🔧 Incremental, updated with each build.  

**🚨 Important Changes:** Any breaking changes are prominently noted in the readme to keep you informed.

---


[**P3X-HTML-PDF**](https://corifeus.com/html-pdf) Build v2025.4.119

 [![NPM](https://img.shields.io/npm/v/p3x-html-pdf.svg)](https://www.npmjs.com/package/p3x-html-pdf)  [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)






[//]: #@corifeus-footer:end

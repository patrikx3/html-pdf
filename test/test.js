// Import necessary modules
const { generate } = require('../src/index');
const path = require('path');
const fs = require('fs');

(async () => {
    try {
        // Define the output path
        const assetsPath = path.resolve(__dirname, '..', 'assets');
        const outputPath = path.join(assetsPath, 'p3x-html-pdf-output.pdf');

        // Ensure the assets directory exists
        if (!fs.existsSync(assetsPath)) {
            fs.mkdirSync(assetsPath, { recursive: true }); // Create the directory if it doesn't exist
            console.log(`Created directory: ${assetsPath}`);
        }

        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }


        // Define options for PDF generation
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
                <div class="p3x-template-page-break"></div>
                <div>
                    <p style="font-size: 14px; color: #555;">Thank you for your business! We hope to work with you again in the future. Stay tuned for updates on our services and offerings by visiting our website or subscribing to our newsletter.</p>
                </div>
            `,
            },
            title: 'P3X-HTML-PDF Detailed Invoice',
            debug: false,
            saveFile: outputPath,
        };

        // Generate the PDF
        await generate(options);

        options.settings.save = false;

        const buffer = await generate(options);

        console.log('--------------------------------------------------------------')
        console.log('PDF Buffer:', buffer);

        console.log('PDF generation successful! Check test-output.pdf.');
    } catch (error) {
        console.error('PDF generation failed:', error);
    }
})();

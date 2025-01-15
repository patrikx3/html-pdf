// Import necessary modules
const { generate } = require('../src/index');
const path = require('path');
const fs = require('fs');

(async () => {
    try {
        
        if (fs.existsSync(path.resolve(__dirname, '..', 'test-output.pdf'))) {
            fs.unlinkSync(path.resolve(__dirname, '..', 'test-output.pdf'));
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
                <div id="p3x-header" data-height="20mm">
                    <h1>Header Content</h1>
                </div>
                <div id="p3x-footer" data-height="15mm">
                    <p>Page  \${page} / \${pages}</p>
                </div>
                <div>
                    <h2>Main Content</h2>
                    <p>This is a test document with a header, footer, and some main content.</p>
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
                    <hr/>
                    <p>This is a test document with a header, footer, and some main content.</p>
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
                    <hr/>
                    <p>This is a test document with a header, footer, and some main content.</p>
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
                    <hr/>
                    <p>This is a test document with a header, footer, and some main content.</p>
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
                    <hr/>
                    <p>This is a test document with a header, footer, and some main content.</p>
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
                    <hr/>
                    <p>This is a test document with a header, footer, and some main content.</p>
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
                    <hr/>
                    <p>This is a test document with a header, footer, and some main content.</p>
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
                    <hr/>
                    <p>This is a test document with a header, footer, and some main content.</p>
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
                    <hr/>
                    <p>This is a test document with a header, footer, and some main content.</p>
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
                    <hr/>
                    <p>This is a test document with a header, footer, and some main content.</p>
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
                    <hr/>
                </div>
            `,
            },
            //qr: 'https://example.com',
            //base: 'file://' + path.resolve(__dirname, '../src/'),
            //css: fs.readFileSync(path.resolve(__dirname, '../src/ng-html-template.css')).toString(),
            //jquery: fs.readFileSync(path.resolve(__dirname, '../src/jquery-1.12.4.min.js')).toString(),
            title: 'Test PDF Document',
            debug: true,
            saveFile: path.resolve(__dirname ,'..', 'test-output.pdf'),
        };

        // Generate the PDF
        await generate(options);

        console.log('PDF generation successful! Check test-output.pdf.');
    } catch (error) {
        console.error('PDF generation failed:', error);
    }
})();

const utils = require('corifeus-utils');
const path = require('path');
const fs = require('mz/fs');
const fsExtra = require('fs-extra');
const template = require('lodash/template');
const cleanDeep = require('lodash/cloneDeep');
const cheerio = require('cheerio')
const startCase = require('lodash/startCase');

const os = require('os');
const isWin = os.platform() === 'win32';
const binPathAddon = isWin ? '' : 'wkhtmltox/';

let binpath = path.resolve(`${__dirname}/../release/${binPathAddon}bin/wkhtmltopdf`);
// if we are in arm64, change the binpath
if (os.arch() === 'arm64') {
    binpath = `${__dirname}/../release/wkhtmltopdf-arm64`
}

const generate = async (options) => {
    const {settings, saveFile, base, debug, title} = options;
    let {javascriptDelay} = options;

    //console.log('options', options)

    const isFixed = () => {
        return settings.template.fixedWidth > 0 && settings.template.fixedHeight
    }

    const save = settings.hasOwnProperty('save') && settings.save === true;

//    const consoleDebugOriginal = console.debug;
    if (debug) {
        console.debug = console.info;
    } else {
        console.debug = () => {
        };
    }

    let tmpHtmlPath;
    let tmpPdfPath;
    let tmpHtmlPathFooter;
    let tmpHtmlPathHeader;
    try {
        const baseHtml = (await fs.readFile(`${__dirname}/base.html`)).toString();
        const baseHtmlFooterHeader = (await fs.readFile(`${__dirname}/header-footer.html`)).toString();

        options.base = options.base || 'file://' + process.cwd();
        options.css = options.css || (await fs.readFile(`${__dirname}/html-template.css`)).toString();
        options.jquery = options.jquery || (await fs.readFile(`${__dirname}/jquery-1.12.4.min.js`)).toString();

        let html = template(baseHtml)(options)

        let $ = cheerio.load(html);

        const $id = $('[id]');

        let header = {}
        let footer = {};

        const defaultHeightMargin = '10mm';
        let marginTop = defaultHeightMargin;
        let marginBottom = defaultHeightMargin;
        $id.each((index, element) => {
            const $element = $(element)
            //const $parent = $element.parent();
//            console.debug($parent.html());
            const id = $element.attr('id');
            if (id.startsWith('p3x-header')) {
                header[id] = `<div>${$element.html()}</div>`;
                marginTop = $element.data('height') || defaultHeightMargin;
                $element.remove();
            } else if (id.startsWith('p3x-footer')) {
                footer[id] = `<div>${$element.html()}</div>`;
                marginBottom = $element.data('height') || defaultHeightMargin;
                $element.remove();
            }
        })


//        console.debug('marginTop', marginTop);
//        console.debug('marginBottom', marginBottom);

        /*
         page: <span class="page"></span>
         frompage: <span class="frompage"></span>
         topage: <span class="topage"></span> = pages
         webpage: <span class="webpage"></span>
         section: <span class="section"></span>
         subsection: <span class="subsection"></span>
         date: <span class="date"></span>
         isodate: <span class="isodate"></span>
         time: <span class="time"></span>
         title: <span class="title"></span>
         doctitle: <span class="doctitle"></span>
         sitepage: <span class="sitepage"></span>
         sitepages: <span class="sitepages"></span>
         */


        $('.p3x-header').remove();
        $('.p3x-footer').remove();
        //$('ng-core-pdf-template-include').remove()
        //$('ng-html-template-include').remove()
        html = $.html();

        html = html.replace(/\${qr}/g, options.settings.qr)

        const headerOrFooter = (data, type) => {

            const lodashTemplateHack = `
        item = item.replace(/\\$\{page}/g, vars.page);
        item = item.replace(/\\$\{pages}/g, vars.pages);
        item = item.replace(/\\$\{frompage}/g, vars.frompage);
        item = item.replace(/\\$\{topage}/g, vars.topage);
        item = item.replace(/\\$\{webpage}/g, vars.webpage);
        item = item.replace(/\\$\{section}/g, vars.section);
        item = item.replace(/\\$\{subsection}/g, vars.subsection);
        item = item.replace(/\\$\{date}/g, vars.date);
        item = item.replace(/\\$\{isodate}/g, vars.isodate);
        item = item.replace(/\\$\{time}/g, vars.time);
        item = item.replace(/\\$\{title}/g, vars.title);
        item = item.replace(/\\$\{doctitle}/g, vars.doctitle);
        item = item.replace(/\\$\{sitepage}/g, vars.sitepage);
        item = item.replace(/\\$\{sitepages}/g, vars.sitepages);
        item = item.replace(/\\$\{qr}/g, qr);

`;

            const mainsSettings = cleanDeep(options)
            mainsSettings.settings.html = JSON.stringify(data, null, 4);

            data = template(baseHtmlFooterHeader)(mainsSettings)
            data = data.replace('// headerOrFooter //', `var headerOrFooter = ${type};`)
            data = data.replace('// lodash-template-hack //', lodashTemplateHack)

            data = data.replace('// qr-hack //', `
var qr = ${JSON.stringify(mainsSettings.settings.qr)};
`)

            return {
                mainSettings: mainsSettings,
                data: data
            }
        }

        const headResult = headerOrFooter(header, 1)
//        const headerSettings = headResult.mainSettings;
        header = headResult.data;
        const footResult = headerOrFooter(footer, 2)
//        const footerSettings = footResult.mainSettings;
        footer = footResult.data;

//        console.debug('headerSettings', headerSettings)
//        console.debug('footerSettings', footerSettings)

//        console.debug('html', html)
//        console.debug('header', header)

        if (save) {
            tmpPdfPath = saveFile;
            tmpHtmlPath = `${saveFile}.html`;
            await utils.fs.ensureFile(tmpHtmlPath, html);
        } else {
            tmpHtmlPath = await utils.fs.ensureTempFile(html, 'html')
            tmpPdfPath = await utils.fs.tempFileName('pdf');
        }

        tmpHtmlPathHeader = await utils.fs.ensureTempFile(header, 'html')
        tmpHtmlPathFooter = await utils.fs.ensureTempFile(footer, 'html')

        //console.debug('header', footer)
        //console.debug('footer', footer)
        //console.debug('html', footer)
       // console.debug('tmpHtmlPath', tmpHtmlPath);
       // console.debug('tmpPdfPath', tmpPdfPath);

// --header-html ${tmpHtmlPath}  --footer-html ${tmpHtmlPath}
        /*
         -B, --margin-bottom <unitreal>      Set the page bottom margin
         -L, --margin-left <unitreal>        Set the page left margin (default 10mm)
         -R, --margin-right <unitreal>       Set the page right margin (default 10mm)
         -T, --margin-top <unitreal>         Set the page top margin
         */

//
//
        if (javascriptDelay === undefined) {
            javascriptDelay = 1000;
        }

        let addOn = '';
        if (isFixed()) {
            marginTop = '0mm';
            marginBottom = '0mm';
            addOn += ` --margin-left 0mm --margin-right 0mm --disable-smart-shrinking`
        } else {
            if (settings.template.marginLeft !== null && settings.template.marginLeft !== undefined) {
                addOn += ` --margin-left ${settings.template.marginLeft}mm `
            }
            if (settings.template.marginRight != null && settings.template.marginLeft !== undefined) {
                addOn += ` --margin-right ${settings.template.marginRight}mm `
            }
        }
        const pageSize = isFixed() ? `--page-width ${settings.template.fixedWidth + 1}mm --page-height ${settings.template.fixedHeight + 1}mm` : `--page-size ${settings.template.format}`;
        const generatePdfCommand = `${binpath} --javascript-delay ${javascriptDelay} --copies ${settings.template.copies} --margin-bottom ${marginBottom} --margin-top ${marginTop}  ${addOn}  ${debug ? '--debug-javascript' : ''} --title ${JSON.stringify(title + ' ' + new Date().toLocaleString())} --orientation ${startCase(settings.template.orientation)} ${pageSize} ${tmpHtmlPath} --header-html ${tmpHtmlPathHeader} --footer-html ${tmpHtmlPathFooter} ${tmpPdfPath}`;

        console.debug('generatePdfCommand', generatePdfCommand);

        await utils.childProcess.exec(generatePdfCommand, debug);

        if (!save) {
            return await fs.readFile(tmpPdfPath);
        }
    } finally {
        if (tmpHtmlPath !== undefined) {
            await fsExtra.remove(tmpHtmlPath);
        }
        if (tmpHtmlPathFooter !== undefined) {
            await fsExtra.remove(tmpHtmlPathFooter);
        }
        if (tmpHtmlPathHeader !== undefined) {
            await fsExtra.remove(tmpHtmlPathHeader);
        }
        if (!save && tmpPdfPath !== undefined) {
            await fsExtra.remove(tmpPdfPath);
        }
//        console.debug = consoleDebugOriginal;
    }
}
module.exports.generate = generate;

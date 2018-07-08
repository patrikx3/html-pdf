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

const binpath = path.resolve(`${__dirname}/../release/${binPathAddon}bin/wkhtmltopdf`);

const generate = async (options) => {
    const {settings, saveFile, base, debug, title} = options;
    let {javascriptDelay} = options;

    const isFixed = () => {
        return settings.template.fixedWidth > 0 && settings.template.fixedHeight
    }

    const save = settings.hasOwnProperty('save') && settings.save === true;

//    const consoleDebugOriginal = console.debug;
    if (debug) {
        console.debug = console.info;
    } else {
        console.debug = () => {};
    }

    let tmpHtmlPath;
    let tmpPdfPath;
    let tmpHtmlPathFooter;
    let tmpHtmlPathHeader;
    try {
        const baseHtml = (await fs.readFile(`${__dirname}/base.html`)).toString();
        const baseHtmlFooterHeader = (await fs.readFile(`${__dirname}/header-footer.html`)).toString();

        let html = template(baseHtml)(options)

        let $ = cheerio.load(html);

        const $id = $('[id]');

        let header = {}
        let footer = {};

        const defaultHeightMargin = '10mm';
        let marginTop= defaultHeightMargin ;
        let marginBottom = defaultHeightMargin ;
        $id.each((index, element) => {
            const $element = $(element)
            const $parent = $element.parent();
//            console.debug($parent.html());
            const id = $element.attr('id');
            if (id.startsWith('p3x-header')) {
                header[id] = $parent.html();
                marginTop = $element.data('height') || defaultHeightMargin ;
                $element.remove();
            } else if (id.startsWith('p3x-footer')) {
                footer[id] = $parent.html();
                marginBottom = $element.data('height') || defaultHeightMargin ;
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


        $('ngivr-html-template-include .p3x-header').remove();
        $('ngivr-html-template-include .p3x-footer').remove();
        html = $.html();

        html = html.replace(/\${qr}/g, options.settings.qr)

        const headerOrFooter = (data, type) => {

            const lodashTemplateHack = `
        item = item.replace(/\\$\{page}/g, vars.page);
        item = item.replace(/\\$\{pages}/g, vars.pages);  
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

        tmpHtmlPath = await utils.fs.ensureTempFile(html, 'html')
        tmpHtmlPathHeader = await utils.fs.ensureTempFile(header, 'html')
        tmpHtmlPathFooter = await utils.fs.ensureTempFile(footer, 'html')
        tmpPdfPath = await utils.fs.tempFileName('pdf');
//        console.debug('footer', footer)
//        console.debug('tmpHtmlPath', tmpHtmlPath);
//        console.debug('tmpPdfPath', tmpPdfPath);

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
            addOn += ` --margin-left 0mm --margin-right 0mm`
        }
        const pageSize = isFixed() ? `--page-width ${settings.template.fixedWidth}mm --page-height ${settings.template.fixedHeight}mm` : `--page-size ${settings.template.format}`;
        const generatePdfCommand = `${binpath} --javascript-delay ${javascriptDelay} --copies ${settings.template.copies} --margin-bottom ${marginBottom} --margin-top ${marginTop}  ${addOn}  ${debug ? '--debug-javascript' : ''} --title ${JSON.stringify(title + ' ' + new Date().toLocaleString())} --orientation ${startCase(settings.template.orientation)} ${pageSize} ${tmpHtmlPath} --header-html ${tmpHtmlPathHeader} --footer-html ${tmpHtmlPathFooter} ${tmpPdfPath}`;

        console.debug('generatePdfCommand', generatePdfCommand);

        await utils.childProcess.exec(generatePdfCommand, debug);

        if (save) {
            await fsExtra.move(tmpPdfPath, saveFile)
        } else {
            return fs.readFile(tmpPdfPath);
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
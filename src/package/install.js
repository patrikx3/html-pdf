const utils = require('corifeus-utils');

const os = require('os');
const path = require('path');
const fsExtra = require('fs-extra');
// https://api.github.com/repos/wkhtmltopdf/wkhtmltopdf/tags
// https://api.github.com/repos/wkhtmltopdf/wkhtmltopdf/releases/latest

const progress = require('progress');


const currentRelease = 'https://api.github.com/repos/wkhtmltopdf/wkhtmltopdf/releases/latest';
const install = async() => {

    const binPath = path.resolve(`${__dirname}/../../release`);
    await fsExtra.remove(binPath);

    const arch = os.arch();
    const platform = os.platform()

    let platformSearch;
    let archSearch;
    if (platform === 'linux') {
        platformSearch = 'linux';
        if (arch === 'x64') {
            archSearch = 'amd64';
        }
    } else if (platform === 'win32' && arch === 'x64') {
        // wkhtmltox-0.12.4_mingw-w64-cross-win64.exe
        platformSearch = 'mingw-w64-cross';
        archSearch = 'win64';
    }

    if (platformSearch === undefined || archSearch === undefined) {
        console.log(`This platform for p3x-html-pdf is not implemented: ${platform}/${arch}`);
        console.log('The p3x-html-pdf will not work, but will work silently');
        return
    }

    console.log(`Found platform: ${platformSearch} and architecture ${archSearch}`);

    console.log(`Downloading latest release for wkhtmltopdf`);

    const { body } = await utils.http.request(currentRelease);
    const findReleaseAsset = body.assets.find((asset) => {
        return asset.browser_download_url.includes(platformSearch) && asset.browser_download_url.includes(archSearch);
    })

    if (findReleaseAsset === undefined || findReleaseAsset === null) {
        throw new Error('Could not found the latest release for wkhtmltopdf')
    }

    console.log(`Found the latest release: ${findReleaseAsset.browser_download_url}`);

    await utils.fs.ensureDir(binPath);

    const releaseBinaryFileName = `${binPath}/${path.basename(findReleaseAsset.browser_download_url)}`;
    const downloadResponse = await utils.http.request({
        url: findReleaseAsset.browser_download_url,
        pipe: true,
    })

    const releaseBinaryFile = utils.fs.createWriteStream(releaseBinaryFileName);
    downloadResponse.pipe(releaseBinaryFile.stream);

    const releaseSize = downloadResponse.headers['content-length'];
    const bar = new progress('Downloading release [:bar] :rate/bps :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: parseInt(releaseSize, 10),
    });

    downloadResponse.on('data', (chunk) => {
        bar.tick(chunk.length);
    })

    await releaseBinaryFile;


    if (platform === 'linux') {
        console.log(`Decompress ${releaseBinaryFileName}`);
        await utils.childProcess.exec(`tar -xvf ${releaseBinaryFileName} -C ${binPath}`, true)
    } else if (platformSearch === 'mingw-w64-cross') {
        console.log(`Install ${releaseBinaryFileName}`);
        const winCommand = `cmd.exe /v /c "set binpath=${binPath} && \"${releaseBinaryFileName}\" /S /D=!binpath! && echo !binpath!"`;
        await utils.childProcess.exec(winCommand, true)
    }

    console.log(`Delete ${releaseBinaryFileName} file`);
    await fsExtra.remove(releaseBinaryFileName)

    /*
    const jqueryVersion = `jquery@1.12.4`;
    console.log(`Install The specific ${jqueryVersion} we need`);
    await utils.childProcess.exec(`npm install ${jqueryVersion}`);
    */

    console.log(`Install done`);
}
install();
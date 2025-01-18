const utils = require('corifeus-utils');
const os = require('os');
const path = require('path');
const fsExtra = require('fs-extra');
const progress = require('progress');

// GitHub API for wkhtmltopdf releases
const currentRelease = 'https://api.github.com/repos/wkhtmltopdf/wkhtmltopdf/releases/4730156';

// Install function
const install = async () => {
    let staticInstaller;
    const staticInstallerPath = `${process.cwd()}/package.json`;

    staticInstaller = require(staticInstallerPath);

    if (staticInstaller.hasOwnProperty('_where')) {
        staticInstaller = require(`${staticInstaller._where}/package.json`);
    }

    if (
        typeof staticInstaller === 'object' &&
        staticInstaller.hasOwnProperty('p3x') &&
        staticInstaller.p3x.hasOwnProperty('installer') &&
        staticInstaller.p3x.installer['p3x-html-pdf'].hasOwnProperty('linux-x64') &&
        staticInstaller.p3x.installer['p3x-html-pdf'].hasOwnProperty('win32-x64')
    ) {
        console.log('Found static download instead of GitHub as:', JSON.stringify(staticInstaller.p3x.installer['p3x-html-pdf'], null, 4));
    } else {
        staticInstaller = undefined;
    }

    const binPath = path.resolve(`${__dirname}/../../release`);
    await fsExtra.remove(binPath);

    const arch = os.arch();
    const platform = os.platform();
    let platformSearch;
    let archSearch;

    if (platform === 'linux') {
        platformSearch = 'linux';
        if (arch === 'x64') {
            archSearch = 'amd64';
        } else if (arch === 'arm64') {
            console.log('Detected arm64 architecture. Preparing to download arm64 binary.');
            const releaseBinaryFileName = `${binPath}/wkhtmltopdf-arm64`;

            await fsExtra.ensureDir(binPath);

            const downloadResponse = await utils.http.request({
                url: 'https://github.com/houseoftech/wkhtmltopdf-arm64/raw/refs/heads/master/bin/wkhtmltopdf-arm64',
                pipe: true,
            });

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
            });

            await releaseBinaryFile;

            console.log('Setting executable permissions for arm64 binary.');
            await utils.childProcess.exec(`chmod +x ${releaseBinaryFileName}`, true);

            console.log('Installation for arm64 completed.');
            return;
        }
    } else if (platform === 'win32' && arch === 'x64') {
        platformSearch = 'mingw-w64-cross';
        archSearch = 'win64';
    }

    if (platformSearch === undefined || archSearch === undefined) {
        console.log(`This platform for p3x-html-pdf is not implemented: ${platform}/${arch}`);
        console.log('The p3x-html-pdf will not work, but will work silently.');
        return;
    }

    console.log(`Found platform: ${platformSearch} and architecture ${archSearch}`);
    console.log('Downloading latest release for wkhtmltopdf.');

    await utils.fs.ensureDir(binPath);

    let releaseBinaryFileName;
    let downloadResponse;
    let releaseBinaryFile;

    if (staticInstaller === undefined) {
        const headers = {};

        if (process.env.hasOwnProperty('GITHUB_TOKEN')) {
            headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
            console.log('Found GITHUB_TOKEN, using as GitHub authorization.');
        }

        const { body } = await utils.http.request({
            url: currentRelease,
            headers: headers,
        });
        const findReleaseAsset = body.assets.find((asset) =>
            asset.browser_download_url.includes(platformSearch) && asset.browser_download_url.includes(archSearch)
        );

        if (!findReleaseAsset) {
            throw new Error('Could not find the latest release for wkhtmltopdf.');
        }

        console.log(`Found the latest release: ${findReleaseAsset.browser_download_url}`);

        releaseBinaryFileName = `${binPath}/${path.basename(findReleaseAsset.browser_download_url)}`;
        downloadResponse = await utils.http.request({
            url: findReleaseAsset.browser_download_url,
            pipe: true,
        });

        releaseBinaryFile = utils.fs.createWriteStream(releaseBinaryFileName);
        downloadResponse.pipe(releaseBinaryFile.stream);
    } else {
        console.log(`Found the latest release: ${staticInstaller.p3x.installer['p3x-html-pdf'][`${platform}-${arch}`]}`);

        releaseBinaryFileName = `${binPath}/${path.basename(staticInstaller.p3x.installer['p3x-html-pdf'][`${platform}-${arch}`])}`;

        const fixedUrl = staticInstaller.p3x.installer['p3x-html-pdf'][`${platform}-${arch}`];

        downloadResponse = await utils.http.request({
            url: fixedUrl,
            pipe: true,
        });

        releaseBinaryFile = utils.fs.createWriteStream(releaseBinaryFileName);
        downloadResponse.pipe(releaseBinaryFile.stream);
    }

    const releaseSize = downloadResponse.headers['content-length'];
    const bar = new progress('Downloading release [:bar] :rate/bps :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: parseInt(releaseSize, 10),
    });

    downloadResponse.on('data', (chunk) => {
        bar.tick(chunk.length);
    });

    await releaseBinaryFile;

    if (platform === 'linux') {
        console.log(`Decompressing ${releaseBinaryFileName}`);
        await utils.childProcess.exec(`tar -xvf ${releaseBinaryFileName} -C ${binPath}`, true);
    } else if (platformSearch === 'mingw-w64-cross') {
        console.log(`Installing ${releaseBinaryFileName}`);
        const winCommand = `cmd.exe /v /c "set binpath=${binPath} && \"${releaseBinaryFileName}\" /S /D=!binpath! && echo !binpath!"`;
        await utils.childProcess.exec(winCommand, true);
    }

    console.log(`Deleting ${releaseBinaryFileName} file.`);
    await fsExtra.remove(releaseBinaryFileName);

    console.log('Installation done.');
    process.exit();
};

install();

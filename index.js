const electron = require('electron');
const sizeOf = require('image-size');
const ExifImage = require('exif').ExifImage;

const {app, BrowserWindow, ipcMain} = electron;
let mainWindow;

app.on('ready', () => {
   mainWindow = new BrowserWindow({
       webPreferences: {
           nodeIntegration: true
       },
       width: 400,
       resizable: false
   });
   mainWindow.setMenu(null);
   mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('obterDimensoesDaImagem', (event, path)=> {
    sizeOf(path, function(err, dimensions) {
        mainWindow.webContents.send('dimensoesDaImagem', dimensions);
    });
});

ipcMain.on('obterMetaDadosImage', (event, path) => {
    new ExifImage({ image: path}, (error, exifData) => {
        mainWindow.webContents.send('metaDadosImage', exifData);
    });
});
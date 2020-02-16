const electron = require('electron');
const ExifImage = require('exif').ExifImage;

const {app, BrowserWindow, ipcMain} = electron;
let mainWindow;

app.on('ready', () => {
   mainWindow = new BrowserWindow({
       webPreferences: {
           nodeIntegration: true
       },
       width: 400,
       height: 525,
       resizable: false,
       icon: __dirname + `/metaImage.ico`
   });
   mainWindow.setMenu(null);
   mainWindow.loadURL(`file://${__dirname}/index.html`);
   mainWindow.setTitle('MetaImage Jpeg')
});

ipcMain.on('obterMetaDados', (event, path) => {
    new ExifImage({ image : path }, function (error, exifData) {
        if (error)
            console.log('Error: '+ error.message);
        else         
            mainWindow.webContents.send('metaDadosImage', exifData);  
    });       
});
import app from './app';
import '@babel/polyfill';
import './database';

async function init() {
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
};

init();
import App from './ncounter/App.svelte';
import 'reset-css/reset.css';
import './ncounter/site.css';
import {Workbox} from 'workbox-window/Workbox.mjs';

const app = new App({ target: document.body });

if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw.js');

    wb.addEventListener('message', async (event) => {
        if (event.data.type === 'CACHE_UPDATED') {
            app.SetUpdateAvailable();
        }
    });

    wb.register();
}
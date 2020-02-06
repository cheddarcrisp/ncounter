import App from './ncounter/App.svelte';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import 'reset-css/reset.css';
import './ncounter/site.css';

if ('serviceWorker' in navigator) {
    const registration = runtime.register();
}

new App({ target: document.body });
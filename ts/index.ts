import 'font-awesome/css/font-awesome.css';
import '../scss/layout.scss';
import '../scss/main.scss';

import { configureRoutes } from './routes';
import methodOverride from './utils/method-override';
import 'whatwg-fetch';

const routes = configureRoutes();

window.addEventListener('DOMContentLoaded', () => {
    methodOverride.start();

    const els = document.querySelectorAll('[data-js-action]');
    for (const el of els) {
        const keyString = el.getAttribute('data-js-action');
        const keys = keyString.split(',');
        for (const key of keys) {
            const callback = routes.get(key.trim());
            if (callback) {
                callback();
            }
        }
    }
});

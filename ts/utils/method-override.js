import matches from "./matches";

const methodOverride = {};

methodOverride.start = () => {
    document.addEventListener('click', event => {
        // Only left click allowed. Firefox triggers click event on right click/contextmenu.
        if (event.button !== 0) {
            return;
        }

        const element = event.target;

        function submit(options) {
            let input;

            if (options.method === 'GET') {
                return false;
            }

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = options.url;
            form.style.display = 'none';

            const keys = Object.keys(options.data);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', key);
                input.setAttribute('value', options.data[key]);
                form.appendChild(input);
            }

            if (options.method !== 'POST') {
                input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', '_method');
                input.setAttribute('value', options.method);
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            return true;
        }

        const isMatch = matches(element)('a[data-method]');
        if (isMatch) {
            const url = element.getAttribute('href');
            const method = element.getAttribute('data-method').toUpperCase();
            const data = {};

            if (submit({ url, method, data, element })) {
                event.preventDefault();
            } else {
                return;
            }
        }
    });

    document.addEventListener('submit', (e) => {
        const form = e.target;

        const method = form.getAttribute('data-method');
        if (method) {
            form.method = 'POST';
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', '_method');
            input.setAttribute('value', method);
            form.appendChild(input);
        }

        if (param && token && !form.querySelector(`input[name='${param}]'`)) {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', param);
            input.setAttribute('value', token);

            form.appendChild(input);
        }
        return;
    });
};

export default methodOverride;

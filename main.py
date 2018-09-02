from flask import Flask, session
import os
import json

from lib.middlewares import MethodRewriteMiddleware
from flask_wtf.csrf import CSRFProtect

from views.page_view import *
import helpers.asset_helper as asset_helper
import helpers.date_helper as date_helper

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'xxxxxx')
env = os.getenv('APP_ENV', 'development')
if env == 'development':
    app.config['DEBUG'] = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True

app.register_blueprint(page_view)
csrf = CSRFProtect(app)

@app.context_processor
def utility_processor():
    return {
        'strftime': date_helper.strftime,
        'isoformat': date_helper.isoformat,
        'l': date_helper.l,
        'webpack_url': asset_helper.webpack_url,
        'inline_style_tag': asset_helper.inline_style_tag,
    }

app.wsgi_app = MethodRewriteMiddleware(app.wsgi_app)

if __name__ == '__main__':
    if env == 'development':
        app.run(host='0.0.0.0', port=5000)
    else:
        app.run()

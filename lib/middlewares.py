from io import BytesIO
from werkzeug.formparser import parse_form_data
from werkzeug.wsgi import get_input_stream

class MethodRewriteMiddleware(object):
    """
        app = MethodRewriteMiddleware(app)
    """
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        if environ["REQUEST_METHOD"].upper() == "POST":
            environ["wsgi.input"] = stream = \
                BytesIO(get_input_stream(environ).read())
            formdata = parse_form_data(environ)[1]
            stream.seek(0)
            method = formdata.get('_method', '').upper()
            if method in ('GET', 'POST', 'PUT', 'DELETE'):
                environ['REQUEST_METHOD'] = method
        return self.app(environ, start_response)

# encoding: utf-8

import os
import json
import re
import urllib
import pdb

def webpack_url(path):
    env = os.getenv('APP_ENV', 'development')
    if env == "development":
        return "http://localhost:4001/static/" + path

    with open('static/build/webpack-manifest.json') as manifest:
        data = json.load(manifest)
        return data[path]

def inline_style_tag(path):
    env = os.getenv('APP_ENV', 'development')
    if env == "development":
        return "<link rel='preload' as='style' href='{}' />".format(webpack_url(path))

    with open('static/build/webpack-manifest.json') as manifest:
        data = json.load(manifest)
        path = data[path]
        path = re.sub(r'^\/static', 'static/build', path)
        return "<style type='text/css'>{}</style>".format(open(path).read())

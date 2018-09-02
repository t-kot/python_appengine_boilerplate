# encoding: utf-8

from flask import Blueprint, request, render_template, session, redirect
import logging
import urllib
import pdb
import json

page_view = Blueprint('page_view', __name__)

@page_view.route('/')
def top():
    return render_template('page/hello.html')

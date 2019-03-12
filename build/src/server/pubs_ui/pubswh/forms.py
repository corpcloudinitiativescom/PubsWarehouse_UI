"""
Forms for the pubswh Blueprint
"""
# pylint: disable=C0111,C0301

from flask_wtf import FlaskForm, RecaptchaField
from wtforms import StringField, TextAreaField, SubmitField, validators, BooleanField
from wtforms.fields.html5 import DateField


__author__ = 'jameskreft'


class ContactForm(FlaskForm):
    name = StringField('Name', description='your name')
    # email validator also makes this a required field... a blank email is considered invalid
    email = StringField('Email', [validators.Email()])
    originating_page = StringField('Originating Page')
    message = TextAreaField('Message')
    recaptcha = RecaptchaField()
    submit = SubmitField('Send')


class PublicAccessContactForm(FlaskForm):
    name = StringField('Name')
    # email validator also makes this a required field... a blank email is considered invalid
    email = StringField('Email', [validators.Email()])
    originating_page = StringField('Originating Page')
    message = TextAreaField('Message', default='I would like to request the full-text public access version of the following publication')
    recaptcha = RecaptchaField()
    submit = SubmitField('Send')


class NumSeries(FlaskForm):
    num_series = BooleanField('Only USGS Numbered Series')
    date_range = DateField('Include publications back to date:   ')

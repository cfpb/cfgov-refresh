# -*- coding: utf-8 -*-
# Generated by Django 1.11.27 on 2020-02-24 18:23
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0201_cfgovimage_file_hash'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='homepage',
            name='header',
        ),
    ]
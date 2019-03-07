# -*- coding: utf-8 -*-
# Generated by Django 1.11.18 on 2019-03-12 05:12
from __future__ import unicode_literals

from django.db import migrations
import django.db.models.deletion
import modelcluster.fields


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0146_add_portal_tag_models'),
        ('ask_cfpb', '0022_add_related_resource_field'),
    ]

    operations = [
        migrations.RenameField(
            model_name='answerpage',
            old_name='content',
            new_name='user_feedback',
        ),
        migrations.AddField(
            model_name='answerpage',
            name='portal_see_all',
            field=modelcluster.fields.ParentalManyToManyField(blank=True, to='v1.PortalSeeAll'),
        ),
        migrations.AddField(
            model_name='answerpage',
            name='portal_topic',
            field=modelcluster.fields.ParentalManyToManyField(blank=True, help_text='Limit to 1 portal topic if possible', to='v1.PortalTopic'),
        ),
        migrations.AddField(
            model_name='answerpage',
            name='primary_portal_topic',
            field=modelcluster.fields.ParentalKey(blank=True, help_text='Use only if assigning more than one portal topic, to control which topic is used as a breadcrumb.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='primary_portal_topic', to='v1.PortalTopic'),
        ),
        migrations.AlterField(
            model_name='answerpage',
            name='related_questions',
            field=modelcluster.fields.ParentalManyToManyField(blank=True, help_text='Maximum of 3 related questions', related_name='related_question', to='ask_cfpb.AnswerPage'),
        ),
    ]

# Generated by Django 4.0.5 on 2022-06-12 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_request_observation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='observation',
            field=models.TextField(blank=True, null=True),
        ),
    ]
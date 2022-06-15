# Generated by Django 4.0.5 on 2022-06-13 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_alter_request_observation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='state',
            field=models.CharField(choices=[('BP', 'Being Processed'), ('A', 'Accepted'), ('R', 'Rejected')], default='BR', max_length=20, null=True),
        ),
    ]

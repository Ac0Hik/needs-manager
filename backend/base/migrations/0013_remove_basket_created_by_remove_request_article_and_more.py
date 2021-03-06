# Generated by Django 4.0.5 on 2022-06-19 02:11

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0012_teacher_is_manager_delete_myuser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='basket',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='request',
            name='article',
        ),
        migrations.RemoveField(
            model_name='request',
            name='observation',
        ),
        migrations.RemoveField(
            model_name='request',
            name='qte',
        ),
        migrations.RemoveField(
            model_name='request',
            name='state',
        ),
        migrations.AddField(
            model_name='request',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='request',
            name='basket',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='base.basket'),
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qte_requested', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(200)])),
                ('observation', models.TextField(blank=True, null=True)),
                ('state', models.CharField(choices=[('BP', 'Being Processed'), ('A', 'Accepted'), ('R', 'Rejected')], default='BP', max_length=20, null=True)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.article')),
                ('basket', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.basket')),
            ],
        ),
    ]

# Generated by Django 3.0.8 on 2020-08-28 18:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20200825_0110'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='agency_agent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='agency_agents', to=settings.AUTH_USER_MODEL),
        ),
    ]

# Generated by Django 3.0.8 on 2020-08-02 13:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0002_auto_20200802_1310'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contact',
            old_name='contact_creator',
            new_name='creator',
        ),
    ]

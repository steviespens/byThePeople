# Generated by Django 2.1.5 on 2019-05-09 03:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('byThePeople', '0011_auto_20190508_2116'),
    ]

    operations = [
        migrations.AddField(
            model_name='commentuserlikes',
            name='action',
            field=models.CharField(default='', max_length=1),
        ),
    ]

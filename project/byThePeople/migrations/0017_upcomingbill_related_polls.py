# Generated by Django 2.1.5 on 2019-05-19 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('byThePeople', '0016_auto_20190519_1553'),
    ]

    operations = [
        migrations.AddField(
            model_name='upcomingbill',
            name='related_polls',
            field=models.ManyToManyField(to='byThePeople.Poll'),
        ),
    ]

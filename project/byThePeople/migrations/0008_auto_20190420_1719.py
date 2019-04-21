# Generated by Django 2.1.5 on 2019-04-20 22:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('byThePeople', '0007_auto_20190307_2134'),
    ]

    operations = [
        migrations.CreateModel(
            name='PollUserVotes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choice_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='choice_id', to='byThePeople.Choice')),
                ('poll_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='poll_id', to='byThePeople.Poll')),
                ('user_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_id', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='polluservotes',
            unique_together={('user_id', 'poll_id')},
        ),
    ]

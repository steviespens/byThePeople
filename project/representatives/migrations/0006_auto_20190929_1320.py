# Generated by Django 2.1.5 on 2019-09-29 18:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('byThePeople', '0021_auto_20190919_2216'),
        ('representatives', '0005_auto_20190922_1614'),
    ]

    operations = [
        migrations.CreateModel(
            name='MemberBillVotes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.CharField(blank=True, max_length=50, null=True)),
                ('bill', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='member_bill_votes_bill', to='byThePeople.UpcomingBill')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='member_bill_votes_member', to='representatives.BaseMember')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='memberbillvotes',
            unique_together={('member', 'bill')},
        ),
    ]

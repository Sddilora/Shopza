# Generated by Django 4.2 on 2023-04-27 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_next', '0002_user_product_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
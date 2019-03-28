from django.contrib.auth.forms import UserCreationForm
from api.models import User

class UserCreationForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields
        # + ('custom_field',)
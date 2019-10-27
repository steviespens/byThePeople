from django import forms
from django.contrib.auth.forms import UserCreationForm
from api.models import User


# class UserCreationForm(UserCreationForm):
#     email = forms.EmailField(
#                 verbose_name='email address',
#                 max_length=255,
#                 unique=True,
#             )
#     class Meta(UserCreationForm.Meta):

#         model = User
#         # fields = UserCreationForm.Meta.fields
#         #c + ('custom_field',)
#     def save(self, commit=True):
#         if not commit:
#             raise NotImplementedError("Can't create User and UserProfile without database save")
#         user = super(UserCreationForm, self).save(commit=True)
#         user_profile = User(user=user, email=self.cleaned_data['email'])
#         user_profile.save()
#         return user, user_profile

class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', 'gender')

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
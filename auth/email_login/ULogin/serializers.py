from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from rest_framework import serializers
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id','username', 'email', 'password', 'password1']
        extra_kwargs = {
            'password': {'write_only': True},
            'password1': {'write_only': True},
        }
    def validate(self, attrs):
        username = attrs['username']
        email = attrs['email']
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "username is already taken"})
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "email is already taken"})
        # user = User.objects.filter(email=attrs['email'])
        # if user:
        #     raise serializers.ValidationError({"email": "email is already taken"})
        if attrs['password'] != attrs['password1']:
            raise serializers.ValidationError({"password": "Password fields didn't match"})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        # user.set_password(validated_data['password'])
        return user

# class User42Login(serializers.Serializer):
#     class Meta:
#         model = User
#         fields = '__all__'

#     def create(self, validated_data):
#         print('validated_data:',validated_data)
#         user = User.objects.create_user(
#             username= validated_data['username'],
#             email= validated_data['email'],
#             img_url= validated_data['img_url'],
#             full_name= validated_data['full_name']
#         )
#         return user
    
class User42Login(serializers.ModelSerializer):
    class Meta:
        model = User  # Make sure User model has the fields 'email', etc.
        fields = ['username', 'email', 'first_name', 'last_name', 'img_url', 'full_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username= validated_data['username'],
            email= validated_data['email'],
            img_url= validated_data['img_url'],
            full_name= validated_data['full_name']
        )
        return user


class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }
    def validate(self, data):
        user = authenticate(**data)
        if user is None:
            raise serializers.ValidationError("Incorrect username or password")
        return data

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name','first_name', 'email', 'level', 'img_url', 'full_name', 'username']
# for jwt:


# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

#     @classmethod
#     def get_token(cls, user):
#         token = super(MyTokenObtainPairSerializer, cls).get_token(user)

#         # Add custom claims
#         token['username'] = 'hamza'
#         return token
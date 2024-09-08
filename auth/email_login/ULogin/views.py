from django.shortcuts import render,redirect
from django.http import JsonResponse,HttpResponse,HttpResponseRedirect
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,authentication_classes, permission_classes
from .serializers import UserSerializer,LoginUserSerializer,User42Login,UserDataSerializer
from .models import User
from .tests import save_user42
from django.conf import settings
import requests

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError
from urllib.parse import urlencode
from rest_framework.permissions import AllowAny


# function to regenret access token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh',
        'api/register',
        'api/login',
        'api/user',
        'api/logout',
        'api/login42',
    ]
    return Response(routes)


@api_view(['POST'])
def register(request):
    user = UserSerializer(data=request.data)
    if user.is_valid():
        print('User is valid')
        user.save()
        return Response(user.data)
    return Response(user.errors)

@api_view(['POST'])
def loginView(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = User.objects.filter(email=email).first()
    if user is None:
        raise AuthenticationFailed('User not found!')
    print('pass::',user.password)
    if not user.check_password(password):
        raise AuthenticationFailed('Incorrect password!')

    # refresh = RefreshToken.for_user(user)
    # access_token = str(refresh.access_token)
    token = get_tokens_for_user(user)


    response = Response()
    # response.set_cookie(
    #     key='access_token',
    #     # value=access_token,
    #     value=token['access'],
    #     httponly=True, 
    #     secure=True,    
    # )
    response.set_cookie(
        key='refresh_token',
        # value=str(refresh),
        value=token['refresh'],
        httponly=True,
        secure=True,
    )
    response.data = {
        'message': 'success',
        'access_token': token['access'],
    }
    # print('access_token::',access_token)
    print('access_token::',str(token['access']))
    # print('refresh_token::',str(refresh))
    print('refresh_token::',str(token['refresh']))
    return response

# check if user is authenticated
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkAuth(request):
    user = request.user
    return Response(UserDataSerializer(user).data)
# @api_view(['GET'])
# def checkAuth(request):
#     access_token = request.COOKIES.get('access_token')
#     refresh_token = request.COOKIES.get('refresh_token')
#     print('access_token::',access_token)
#     print('refresh_token::',refresh_token)
#     response = Response()
#     if not access_token or not refresh_token:
#         raise AuthenticationFailed('Unauthenticated!')
#     jwt_authenticator = JWTAuthentication()
#     try:
#         validated_token = jwt_authenticator.get_validated_token(access_token)
#         user = jwt_authenticator.get_user(validated_token)
#         response.data = {
#             'message': 'Authenticated!',
#             'user': UserDataSerializer(user).data,
#         }
#         return response
#     except AuthenticationFailed as e:
#         raise AuthenticationFailed('AuthenticationFailed!')
#     except TokenError as e:
#         raise AuthenticationFailed('Token is invalid or expired!')


@api_view(['POST'])
def refresh_token(request):
    refresh_token = request.COOKIES.get('refresh_token')
    acc_tkn = request.COOKIES.get('access_token')
    if not refresh_token:
        return Response({'detail': 'Refresh token not found'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        refresh_token_obj = RefreshToken(refresh_token)
        new_access_token = refresh_token_obj.access_token
        print('\nNEW\n')
        print('access_token::',new_access_token)
        print('refresh_token::',str(refresh_token_obj))
        response = Response({
            'message': 'Token refreshed',
            'access_token': str(new_access_token),
        })
        # response.set_cookie('access_token', str(new_access_token), httponly=True)

        return response

    except TokenError:
        return Response({'detail': 'Refresh token is invalid or expired!'}, status=status.HTTP_401_UNAUTHORIZED)


# 42 api
@api_view(["GET"])
def login42(request):
    redirect_uri = urlencode({"redirect_uri": settings.FORTYTWO_REDIRECT_URI})
    # print("Redirect URI:", redirect_uri)
    authorization_url = f"https://api.intra.42.fr/oauth/authorize?client_id={settings.FORTYTWO_CLIENT_ID}&{redirect_uri}&response_type=code&scope=public"
    # print("Authorization URL:", authorization_url)
    return redirect(authorization_url)



@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def callback42(request):
    code = request.GET.get("code")  
    error = request.GET.get("error")
    scope = request.GET.get("scope")
    print('lololololololol')
    if error:
        return Response({"error": error})
    
    if not code:
        return Response({"error": "No code provided"})
    
    token_url = "https://api.intra.42.fr/oauth/token"
    payload = {
        "grant_type": "authorization_code",
        "client_id": settings.FORTYTWO_CLIENT_ID,
        "client_secret": settings.FORTYTWO_CLIENT_SECRET,
        "code": code,
        "redirect_uri": settings.FORTYTWO_REDIRECT_URI,
    }
    token_response = requests.post(token_url, data=payload)
    
    if token_response.status_code == 200:
        access_token = token_response.json().get("access_token")
        user_info_url = "https://api.intra.42.fr/v2/me"
        user_response = requests.get(user_info_url, headers={"Authorization": f"Bearer {access_token}"})
        if user_response.status_code == 200:
            user_info = user_response.json()
            user_profile = {
                'username': user_info['login'],
                'email': user_info['email'],
                'first_name': user_info['first_name'],
                'last_name': user_info['last_name'],
                'img_url': user_info['image']['link'],
                'full_name': user_info['displayname'],
            }
            response = HttpResponseRedirect('http://127.0.0.1:5501/frontend/profile.html')
            if User.objects.filter(email=user_profile['email']).exists():
                print('User exists!!!!!!!!!!!!!!!!!!!')
                user = User.objects.get(email=user_profile['email'])
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                response.set_cookie(
                    key='refresh_token',
                    value=str(refresh),
                    httponly=True,
                    secure=True,
                    samesite='None',
                )
                response.data = {
                    'message': 'success',
                    # 'access_token': access_token,
                }
                return response
            user = User42Login(data=user_profile)
            if user.is_valid():
                
                save_user42(user=user)
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                response = Response()
                response.set_cookie(
                    key='refresh_token',
                    value=str(refresh),
                    httponly=True,
                    secure=True,
                    samesite='None',
                )
                response.data = {
                    'message': 'success',
                    'access_token': access_token,
                }
                return response
            else:
                return Response({'message': user.errors})
        else:
            return HttpResponse(f"An error occurred while trying to log you in. Status Code: {token_response.status_code}. Response: {token_response.text}")


@api_view(['POST'])
def logoutView(request):
    response = Response({'message': 'Successfully logged out'}, status=status.HTTP_200_OK)
    # Delete the access and refresh tokens from cookies
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    return response
# Access to fetch at '' (redirected from '') from origin 'http://127.0.0.1:5501' has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer

from django.contrib.auth.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        if user.is_staff:
            token['role'] = 'admin'
        else:
            token['role'] = 'normal'
            
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterUser(APIView):
    
    permission_classes = [AllowAny]

    def post(self, request):

        print(request.data)

        serializer = UserSerializer(data=request.data)

        try:
            User.objects.get(username=request.data.get('username'))
            return Response('Username already exists!', status=status.HTTP_409_CONFLICT)
        except:
            pass

        if serializer.is_valid():

            user = serializer.save()

            if user:                
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterAdmin(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        try:
            User.objects.get(username=request.data.get('username'))
            return Response('Username already exists!', status=status.HTTP_409_CONFLICT)
        except:
            pass

        if serializer.is_valid():

            user = serializer.save()

            if user:

                user.is_staff = True
                user.save()
                
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from products.models import Laptop, Accessory, Profession, LaptopCart, AccessoryCart, Repair, CPU, GPU, RAM, ScreenSize

class CpuSerializer(ModelSerializer):    
    class Meta:
        model = CPU
        fields = '__all__'

class GpuSerializer(ModelSerializer):    
    class Meta:
        model = GPU
        fields = '__all__'

class RamSerializer(ModelSerializer):    
    class Meta:
        model = RAM
        fields = '__all__'

class ScreenSizeSerializer(ModelSerializer):    
    class Meta:
        model = ScreenSize
        fields = '__all__'

class LaptopSerializer(ModelSerializer):
    get_cpu = serializers.CharField(source='cpu.name', read_only=True)
    get_gpu = serializers.CharField(source='gpu.name', read_only=True)
    get_ram = serializers.CharField(source='ram.name', read_only=True)
    get_screen_size = serializers.CharField(source='screen_size.name', read_only=True)

    class Meta:
        model = Laptop
        fields = '__all__'


class AccessorySerializer(ModelSerializer):    
    class Meta:
        model = Accessory
        fields = '__all__'


class ProfessionSerializer(ModelSerializer):    
    class Meta:
        model = Profession
        fields = '__all__'


class LaptopCartSerializer(ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    product_name = serializers.CharField(source="laptop.name", read_only=True)

    class Meta:
        model = LaptopCart
        fields = ('__all__')

class AccessoryCartSerializer(ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    product_name = serializers.CharField(source="accessory.name", read_only=True)

    class Meta:
        model = AccessoryCart
        fields = ('__all__')


class RepairSerializer(ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Repair
        exclude = ('approved', )
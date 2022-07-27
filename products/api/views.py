from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.conf import settings
from django.core.mail import send_mail

from .serializers import LaptopSerializer, AccessorySerializer, ProfessionSerializer, LaptopCartSerializer, AccessoryCartSerializer, RepairSerializer, CpuSerializer, GpuSerializer, RamSerializer, ScreenSizeSerializer
from products.models import Laptop, Accessory, Profession, LaptopCart, AccessoryCart , Repair, CPU, GPU, RAM, ScreenSize

@api_view(['GET'])
def laptops_list(request):

    laptops = Laptop.objects.all().order_by('-created')
    
    # www......?a=1&n1

    if request.method == 'GET' and 'profession' in request.GET:
        if int(request.GET.get('price')) > 0:
            laptops = Laptop.objects.filter(cpu__name__icontains=request.GET.get('cpu'), gpu__name__icontains=request.GET.get('gpu'), ram__name__icontains=request.GET.get('ram'), screen_size__name__icontains=request.GET.get('screen_size'), profession__name__icontains=request.GET.get('profession'), price__lte=int(request.GET.get('price')))
        else:
            laptops = Laptop.objects.filter(cpu__name__icontains=request.GET.get('cpu'), gpu__name__icontains=request.GET.get('gpu'), ram__name__icontains=request.GET.get('ram'), screen_size__name__icontains=request.GET.get('screen_size'), profession__name__icontains=request.GET.get('profession'))

    serializer = LaptopSerializer(laptops, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def accessories_list(request):
    accessories = Accessory.objects.all().order_by('-created')

    serializer = AccessorySerializer(accessories, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def laptop_details(request, pk):
    laptop = get_object_or_404(Laptop, pk=pk)

    serializer = LaptopSerializer(laptop, many=False)

    return Response(serializer.data)

@api_view(['GET'])
def accessory_details(request, pk):
    accessory = get_object_or_404(Accessory, pk=pk)

    serializer = AccessorySerializer(accessory, many=False)

    return Response(serializer.data)

@api_view(['PUT'])
def laptop_update(request, pk):
    laptop = get_object_or_404(Laptop, pk=pk)

    cpu = laptop.cpu
    gpu = laptop.gpu
    ram = laptop.ram
    screen_size = laptop.screen_size

    cpu.name = request.data['cpu']
    gpu.name = request.data['gpu']
    ram.name = request.data['ram']
    screen_size.name = request.data['screen_size']

    cpu.save()
    gpu.save()
    ram.save()
    screen_size.save()

    serializer = LaptopSerializer(instance=laptop, data=request.data)

    if serializer.is_valid():
        serializer.save()


    return Response(serializer.data)

@api_view(['PUT'])
def accessory_update(request, pk):
    accessory = get_object_or_404(Accessory, pk=pk)

    serializer = AccessorySerializer(instance=accessory, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def laptop_delete(request, pk):
    laptop = get_object_or_404(Laptop, pk=pk)

    laptop.delete()

    return Response('Laptop has been deleted!')

@api_view(['DELETE'])
def accessory_delete(request, pk):
    accessory = get_object_or_404(Accessory, pk=pk)

    accessory.delete()

    return Response('Accessory has been deleted!')


@api_view(['POST'])
def add_laptop_to_cart(request, pk):
    serializer = LaptopCartSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def add_accessory_to_cart(request, pk):
    serializer = AccessoryCartSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def add_product_to_repair(request):
    serializer = RepairSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET'])
def approve_products_repair_list(request):
    repair_item = Repair.objects.filter(approved=False).order_by('-created')
    serializer = RepairSerializer(repair_item, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def approve_repair(request, pk):
    repair_item = get_object_or_404(Repair, pk=pk)

    subject = 'Approved'
    message = f'Hi {request.user}, your request for repairing item {repair_item.device_name} has been approved.'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [repair_item.user.email, ]

    send_mail( subject, message, email_from, recipient_list )
    
    repair_item.approved = True
    repair_item.save()

    return Response('done!')

@api_view(['POST'])
def deny_repair(request, pk):
    repair_item = get_object_or_404(Repair, pk=pk)

    subject = 'Denied'
    message = f'Hi {request.user}, your request for repairing item {repair_item.device_name} has been denied.'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [repair_item.user.email, ]

    send_mail( subject, message, email_from, recipient_list )
    
    repair_item.delete()

    return Response('done!')

@api_view(['GET'])
def cpuList(request):
    cpus = CPU.objects.all().order_by('name')

    serializer = CpuSerializer(cpus, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def gpuList(request):
    gpus = GPU.objects.all().order_by('name')

    serializer = CpuSerializer(gpus, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def ramList(request):
    rams = RAM.objects.all().order_by('name')

    serializer = CpuSerializer(rams, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def screenSizeList(request):
    ss = ScreenSize.objects.all().order_by('name')

    serializer = CpuSerializer(ss, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def professionList(request):
    p = Profession.objects.all().order_by('name')

    serializer = CpuSerializer(p, many=True)

    return Response(serializer.data)
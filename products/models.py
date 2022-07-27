from django.db import models
from django.contrib.auth.models import User

class Profession(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class CPU(models.Model):
    name = models.CharField(max_length=15)

    def __str__(self):
        return self.name

class GPU(models.Model):
    name = models.CharField(max_length=15)

    def __str__(self):
        return self.name
      

class RAM(models.Model):
    name = models.CharField(max_length=15)

    def __str__(self):
        return self.name


class ScreenSize(models.Model):
    name = models.CharField(max_length=15)

    def __str__(self):
        return self.name

class Laptop(models.Model):
    name = models.CharField(max_length=200)

    cpu = models.ForeignKey(CPU, on_delete=models.CASCADE)
    gpu = models.ForeignKey(GPU, on_delete=models.CASCADE)
    ram = models.ForeignKey(RAM, on_delete=models.CASCADE)
    screen_size = models.ForeignKey(ScreenSize, on_delete=models.CASCADE)

    profession = models.ManyToManyField(Profession, blank=True)

    price = models.DecimalField(max_digits=15, decimal_places=2 , default=0)

    image = models.ImageField(upload_to='uploads/procucts', null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    @property
    def get_cpu(self):
        return self.cpu

class Accessory(models.Model):
    name = models.CharField(max_length=200)

    price = models.DecimalField(max_digits=15, decimal_places=2 , default=0)

    image = models.ImageField(upload_to='uploads/procucts', null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class LaptopCart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    laptop = models.ForeignKey(Laptop, on_delete=models.CASCADE, null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + ' ' + self.laptop.name

class AccessoryCart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    accessory = models.ForeignKey(Accessory, on_delete=models.CASCADE, null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + ' ' + self.accessory.name
    

class Repair(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    device_name = models.CharField(max_length=50)
    specs = models.TextField()
    problem = models.TextField()
    mobile = models.CharField(max_length=30)

    created = models.DateTimeField(auto_now_add=True)

    approved = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username + ' ' + self.device_name
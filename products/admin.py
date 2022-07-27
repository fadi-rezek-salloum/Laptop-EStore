from django.contrib import admin

from .models import Laptop, Accessory, Profession, LaptopCart, AccessoryCart, Repair, CPU, GPU, RAM, ScreenSize

admin.site.register(Laptop)
admin.site.register(Accessory)
admin.site.register(CPU)
admin.site.register(GPU)
admin.site.register(RAM)
admin.site.register(ScreenSize)
admin.site.register(Profession)
admin.site.register(LaptopCart)
admin.site.register(AccessoryCart)
admin.site.register(Repair)
from django.urls import path

from . import views

urlpatterns = [
    path('laptops/', views.laptops_list),
    path('accessories/', views.accessories_list),

    path('laptop-details/<pk>/', views.laptop_details),
    path('accessory-details/<pk>/', views.accessory_details),

    path('laptop-update/<pk>/', views.laptop_update),
    path('accessory-update/<pk>/', views.accessory_update),

    path('laptop-delete/<pk>/', views.laptop_delete),
    path('accessory-delete/<pk>/', views.accessory_delete),

    path('buy-laptop/<pk>/', views.add_laptop_to_cart),
    path('buy-accessory/<pk>/', views.add_accessory_to_cart),

    path('repair-product/', views.add_product_to_repair),
    
    path('approve-products-repair/', views.approve_products_repair_list),

    path('approve-repair/<pk>/', views.approve_repair),
    path('deny-repair/<pk>/', views.deny_repair),

    path('cpu-list/', views.cpuList),
    path('gpu-list/', views.gpuList),
    path('ram-list/', views.ramList),
    path('screen-size-list/', views.screenSizeList),
    path('profession-list/', views.professionList),

]
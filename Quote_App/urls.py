from django.urls import path 
from django.views.generic import TemplateView
from .views import *

app_name = 'Quote_App'



urlpatterns = [
    path('', LogInView.as_view(), name='login'),
    path('conf_code/', ForgotPasswordView.as_view(), name='conf_code'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),

    path('structures_lab/', QuotePrincipalView.as_view(), name='structures_lab'),
    path('structures_lab/forbidden/', TemplateView.as_view(template_name= 'pages_error403.html')),
    path('structures_lab/forbidden/login/', TemplateView.as_view(template_name= 'index.html')),

    path('structures_lab_assessores/', QuotePrincipalAssessoresView.as_view(), name='structures_lab_assessores'),
    path('structures_lab_assessores/forbidden/', TemplateView.as_view(template_name= 'pages_error403.html')),
    path('structures_lab_assessores/forbidden/login/', TemplateView.as_view(template_name= 'index.html')),

    path('options_chain/', OptionsChainView.as_view(), name='options_chain'),
    path('options_chain/forbidden/', TemplateView.as_view(template_name= 'pages_error403.html')),
    path('options_chain/forbidden/login/', TemplateView.as_view(template_name= 'index.html')),

    path('stored_structures/', StoredStructuresView.as_view(), name='stored_structures'),
    path('stored_structures/forbidden/', TemplateView.as_view(template_name= 'pages_error403.html')),
    path('stored_structures/forbidden/login/', TemplateView.as_view(template_name= 'index.html')),

    path('administrative_area/', AdministrativeAreaView.as_view(), name='administrative_area'),
    path('administrative_area/forbidden/', TemplateView.as_view(template_name= 'pages_error403.html')),
    path('administrative_area/forbidden/login/', TemplateView.as_view(template_name= 'index.html')),

    path('manage_users/', ManageUsersAreaView.as_view(), name='manage_users'),
    path('manage_users/forbidden/', TemplateView.as_view(template_name= 'pages_error403.html')),
    path('manage_users/forbidden/login/', TemplateView.as_view(template_name= 'index.html')),

]
from django.contrib import admin
from django.urls import path, include

# Handle media files
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
     path('admin/', admin.site.urls),
     path('', include('core.urls')),
]

# Media files URL 
if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



from rest_framework import routers

from rest_framework.routers import SimpleRouter

from .views import (
	PersonViewSet
)

router = SimpleRouter()

router.register('', PersonViewSet, base_name='profile'),


app_name = 'core'
urlpatterns = router.urls
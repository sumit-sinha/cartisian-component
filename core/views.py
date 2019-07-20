from rest_framework import viewsets

from core.models import Person

from core.serializers import (
	PersonSerializer,
)

class PersonViewSet(viewsets.ModelViewSet):
	"""
	List of data.
	"""
	queryset = Person.objects.all()
	serializer_class = PersonSerializer

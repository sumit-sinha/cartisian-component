from core.models import Person
from rest_framework import serializers

class PersonSerializer(serializers.ModelSerializer):
	"""
	Serialize
	(transform data to json data).
	"""

	class Meta:
		model = Person

		fields = ('id', 
				'username',
				'first_name',
				'last_name',
				'image',
				'title',
				'project',
				'description',
				'created',
				'updated'
		)
		
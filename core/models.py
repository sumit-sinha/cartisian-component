from django.db import models
from PIL import Image

class Person(models.Model):
	"""
	List of items to display.
	Not the right way to implement 
	username, first and last_name I know :).
	"""
	username = models.CharField(max_length=50)
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	title = models.CharField(max_length=50)
	project = models.CharField(max_length=200)
	image = models.ImageField(default='default.jpg', upload_to='profile_pics')
	description = models.TextField(max_length=100)
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	def __str__(self):
		"""
		Return username.
		"""
		return self.username


	#git init
	#git add .
	#git commit -m “first commit backend with django”

	#git remote add origin https://github.com/sumit-sinha/greenlight.git
	#git pull origin master
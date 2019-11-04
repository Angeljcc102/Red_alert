from __future__ import unicode_literals

from djongo import models

class Map_locations(models.Model):

	id_tw = models.CharField(max_length = 25, null = True)
	text = models.CharField(max_length = 1000, null = True)
	date = models.CharField(max_length = 30, null = True)

	def __str__(self):
		return self.name
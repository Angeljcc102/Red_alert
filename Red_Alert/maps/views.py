from django.shortcuts import render

from django.http import HttpResponse

from .models import Map_locations

def home(request):
	map_locations_data = Map_locations.objects.all()
	for field in map_locations_data:
		print('name of location is:', field.name )
	return HttpResponse("see the terminal for result")

# Create your views here.
def default_map(request):
  # TODO: move this token to Django settings from an environment variable
  # found in the Mapbox account settings and getting started instructions
  # see https://www.mapbox.com/account/ under the "Access tokens" section
  mapbox_access_token = 'pk.my_mapbox_access_token'
  return render(request, 'default.html', 
    { 'mapbox_access_token': mapbox_access_token })

from django.shortcuts import render

# serve the / directory
def home(request):

  # if no query param, show landing page
  return render(request, 'index.html')

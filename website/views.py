from django.shortcuts import render

# serve the / directory
def home(request):
  return render(request, 'index.html')

# serve the /sjt directory
def sjt(request):
  return render(request, 'sjt.html')

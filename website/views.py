from django.shortcuts import render

# serve the / directory
def home(request):
  return render(request, 'index.html')

# serve the /sjt directory
def sjt(request):
  return render(request, 'sjt.html')

# serve the /sjt/about directory
def sjtAbout(request):
  return render(request, 'sjt-about.html')

# serve the /sw directory
def sw(request):
  return render(request, 'sw.html')

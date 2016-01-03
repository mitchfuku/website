## Installing things

There will probably be lots of things you need to install to get everything to
work.  Just go with the flow:

Download virtualenv https://pypi.python.org/pypi/virtualenv

    sudo python setup.py install #install virtualenv

Go into website/ folder

    virtualenv venv --distribute
    source venv/bin/activate #this runs Virtualenv.  See below.
    pip install -r requirements.txt

If you install a new package, make sure you are in virtualenv, install your
package, and run:

    pip freeze > requirements.txt

This will tell Heroku the packages necessary to run your application.  It is
critical that you install all packages necessary in the application in
virtualenv and then run the above command.

## Running the application locally

First, enter Virtualenv in your terminal.  Run:

    source venv/bin/activate

Your terminal will be prepended with "(venv)".  To deactivate venv, run:

    deactivate

Finally, to start the server, run:

    python manage.py runserver

This should start the app on localhost:5000

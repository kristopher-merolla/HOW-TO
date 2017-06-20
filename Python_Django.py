##############################
### LOAD VENV AND CREATE THE APP FILE STRUCTURE
##############################

### LOAD DJANGO VENV
# navigate to your virtualenv folder and load it
$ source djangoEnv/bin/activate #for mac
$ call djangoEnv/scripts/activate # for windows
# your terminal prompt should start with (py2FlaskEnv) after you successfully load
# you can deactivate your virtualenv with the command "deactivate"

### OVERVIEW OF FOLDER STRUCTURE 
# One big project folder
# apps folder
  # templates folder
  # urls.py (the app urls.py)
  # views.py
# project management folder
  # settings.py
  # urls.py (a second different urls.py)

### SETTING UP YOUR FILE STRUCTURE
$ django-admin startproject first_app_assignment #creates the django project
$ cd first_app_assignment
$ mkdir apps
$ cd apps
$ touch __init__.py  #makes the __init__.py file
$ python ../manage.py startapp first_app #notice that this is first_app and not first_app_assignment

$ cd first_app
$ touch urls.py # make /apps/first_app/urls.py
$ mkdir templates
$ mkdir templates/first_app 
#also add any html files you want i.e. touch templates/first_app/index.html

# open the directory in sublime
$ cd .. 
$ cd ..
$ subl . #need to have sublime shortcut enabled

# proj mgmt folder - settings.py, include the app 
'apps.first_app', # dont forget the comma!
# add this too to the proj mgmt folder if you want timezone to reflect west coast:
TIME_ZONE = 'America/Los_Angeles'
# proj mgmt folder - urls.py url pattern to include the app 
from django.conf.urls import url, include # add the , include
url(r'^', include('apps.first_app.urls')), 

# add some routes for application urls.py #if you dont do this first you will get a circular import error
from django.conf.urls import url
from . import views
urlpatterns = [
  url(r'^$', views.index),
]

# add an index method for views.py #if you dont do this first you will get AttributeError: 'module' object has no attribute 'index'
def index(request):
  return render(request, 'first_app/index.html')

$ python manage.py runserver #starts your server

## libraries you may want to import into your views.py:
from django.shortcuts import render, redirect


##############################
### ORDER OF BUILDING THE APP
##############################
# the following is the order in which I recommend building out the application
# beyond making sure that your server is able to run, I generally recommend building out your full model layer first, as that will provide you the data you will often need to display one the views, and so that you will not need to jump back and forth between the model.py, view.py and templates
# once the model layer is done, which you can do independent of view.py and templates, that section is done,
# and you generally will not need to touch your model.py file anymore
# furthermore building out the model layer forces you to plan out your application more first, which is a good thing

##############################
### CREATE THE MODEL LAYER
##############################

# in Django we are using an ORM (object relational mapper), you can think of this as a virtual database
# this means that we have a layer of abstraction (the ORM) between our app and the SQL statements of the database
# we will first need to build this layer of abstraction in our models.py file by defining each model class
# and then we can interact with this ORM layer, and DJango will take care of writing the SQL queries for us
# based on the commands we give to the ORM

## PLAN YOUR ERD
# first plan out your ERD, you can either draw it up in SQL Workbench or just on a piece of paper
# after you have it all planned out you can then build the database through django

### CREATE THE ORM
# models.py
class User(models.Model):
  email = models.CharField(max_length=38)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  objects = UserManager() # (only needed if you need custom model methods such as validations)
  # By default objects = models.Manager() (it is inherited from the models.Model class, and is what allows us to do User.objects.all())
  # When we make the UserManager we subclassing models.Manager and we then set objects = that models.Manager subclass.

  # if you have this unicode code in place then when you print an object in the terminal it will display with the information
  # you have specified (useful for debugging)
  def __unicode__(self):
    return "id: " + str(self.id) + ", email: " + self.email

class Comment(models.Model):
  comment = models.TextField()
  user = models.ForeignKey(User, related_name="comments") # this creates the foreign key and relationship between Comments and Users table

class Book(models.Model):
  title = models.CharField(max_length=38)
  favoriting_users = models.ManyToManyField(User, related_name="favorited_books")

  def __unicode__(self):
    return "id: " + str(self.id) + ", title: " + self.title

# the many to many relationship above replaces the need for creating an individual joining table
# class UserBook(models.Model):
#   user = models.ForeignKey(User, related_name="user_books")
#   book = models.ForeignKey(Book, related_name="user_books") 

#   def __unicode__(self):
#     return "id: " + str(self.id) + ", user_id: " + str(self.user.id) + ", book_id: " + str(self.book.id)

## adding an object with a many to many relationship
book = Book.objects.get(id=1)
user.favorited_books.add(book)

### ADDING MODEL LEVEL VALIDATIONS
# be sure to also include "objects = UserManager()" in your model"
# models.py
class UserManager(models.Manager):
  def login(self, postData):
    # insert code
    return <insert something to return > 
    # Example: [True, <user_object>] if no errors
    # [False, errors_array] if there are errors

# user.py
user_hash = {
    "email" : request.POST['email']
}

# Calls the login method in the UserManager
# the argument user_hash gets passed into the UserManager as the parameter postData
user = User.objects.login(user_hash) 

### RUN MIGRATIONS
# after writing out your models in your model.py file you need to migrate them so that Django creates
# the sql tables for you using the models
# you should do this anytime you make a change to a model
python manage.py makemigrations
python manage.py migrate

### PYTHON SHELL / CREATE SEED DATA
# I recommend that you create seed data that you can display through the python shell, so that you can build out all 
# of your python data without having to concern yourself with forms and routing
# this also allows you to test your model layer and make sure everything you have coded works

$ python ./manage.py shell # this will open the interactive python shell
from apps.dojo_secrets.models import User # you will need to run this line first before you can access your user model class

# You can run whatever other ORM command you want (such as creating a user)
Course.objects.create(name="Python Course", description="learn python")
User.objects.all() # .all() commands are particularly useful for checking that all of your data is there and as you expect it to be

exit() # Use to exit the python shell 

### ORM QUERIES
# view.py (referencing the model through the ORM)
Course.objects.create(name="Python Course", description="learn python")
Course.objects.all() # equivalent of select statement for multiple entries
c = Course.objects.get(pk=id) # equivalent of a select statement for a single entry using the primary key
c.delete() # equivalent of delete statement

## use .get when there is one object, returns a single object
User.objects.get(id=1)
User.objects.get(first_name="mike")

## use .filter when there are multiple objects, returns queryset (array)
User.objects.filter(last_name="Thomas")

## use .exclude to exclude specific data
User.objects.exclude(last_name="Thomas")

## __ condition filter
User.objects.filter(first_name__startswith="S")
User.objects.exclude(first_name__contains="E")

## combinging queries
User.objects.filter(last_name__contains="o").exclude(first_name__contains="o")

### ORM with views.py 

## views.py - passing model data to template
def index(request):
  users = User.objects.filter(age__lt=70)
  context = {"users": users}
  return render(request, "users/index.html", context)

##############################
### Bcrypt
##############################
import bcrypt

## creating a user with a hashed_pw
hashed_pw = bcrypt.hashpw(postData['password'].encode('utf-8'), bcrypt.gensalt()) 
u = User.objects.create(email = postData['email'], password = hashed_pw)

## checking if a password matches
u = User.objects.get(email = "user_email@example.com")
stored_hash = u.password
input_hash = bcrypt.hashpw(postData['password'].encode(), stored_hash.encode())

if not input_hash == stored_hash:
  errors.append("Invalid Email/Password")


##############################
### Views.py and urls.py
##############################

### CREATE GET ROUTES AND METHODS
# I recommend creating your GET routes and methods first before making the POST routes
# Look at the wireframe of what you are going to be creating and make all the routes and methods 
# for each of the pages you are going to be displaying. I would also just put one word of html text into each just
# to make sure each GET route is working properly first.
# For GET routes you will be rendering a template at the end of the method

##Example
# urls.py
urlpatterns = [
  url(r'^$', views.index),
  url(r'^surveys/process$', views.surveys_process),   
  url(r'^success/(?P<id>\d+)$', views.success), #regex for matching against /success/1 and /success/2
]
# views.py
def index(request):
  return render(request, 'survey_form/index.html')

### Build out the html
# flesh out your html files so that they include all of your forms and fields etc, can use hard coded data first
# (see forms section below for syntax of building forms)

### Add template pass through data (if needed)
# this is data where you assign the value in your views.py and then pass it to the html file as a parameter of render
# (see Flask Templating section below)

### Add session display data (if needed)
# if you need to display session data, I recommend first setting the session data to a hardcoded number in your 
# views.py method and then display that session data in you html file using django template language, 
# and make sure that works before adding more complicated session data
# (see session section below)

### CREATE POST ROUTES AND METHODS
# the post routes handle your submitted form data, this includes creating, updating and deleting data
# you will usually be redirecting to another GET route after a post route. This means that after running all your 
# POST route code, you are sending a response to the client telling it to make another requset to another route 
# (usually a GET route) where you are going to render a template

## build the route and associated method first
# (will have the same format as the GET routes)

# check whether a request is a POST
if request.method == "POST":

# reading form data
request.POST['name']

# redirecting
return redirect("/result")

##############################
### Django Template Language
##############################
##Example
## views.py
def result(request):
  context = {
    "name": "shane"
  }
  return render(request, 'survey_form/show.html', context)
## show.html
# the dictionary context is passed into the template through the render method
# when it is passed in the dictionary is unpacked such that in the show.html you can run
Name: {{name}}
    
# in your html
{{some variable}} #Ex: <p>My name is {{name}}</p> 
{%some expression%} # can be used for if statements of for loops

### FOR AND IF 
# notice that for the Django templating language there is no : at the end of the for statement 
# notice also that you need to close it with an endfor
# the same is true of if statements
{% for a in array %} 
  arrayItemID: {{a.0.id}}<br>
  arrayItemEmail: {{a.0.email}}<br>
{% endfor %}  

{% if true %}
  # do some code 
{% endif %}

## reading session 
{{ request.session.gold }} # not {{ request.session['gold'] }}

## reading an array 
{{myArray.0}} # not {{myArray[0]}}

##############################
### Sessions
##############################
# sessions are stored in a dictionary format
# *Note - remember that to use a session in your django application, you need to first have migrated at least once

## Assigning data to a session
request.session['user_id'] = 5
request.session['fruits'] = [["pineapple", 5], ["orange", 3]]

# what the sesion data structure looks like
# session = {
#   "user_id" : 5
#   "fruits" : [
#     ["pineapple", 5], 
#     ["orange", 3]
#   ] 
# }

## clearing session data
request.session.clear()

## checking for NONE with a session
# prior to setting a value for a session key, the value defaults to None
# if you try to get the value when it doesn't exist (i.e. do "if session['counter'] == None:" when you have not assigned it yet) 
# Python will throw you an error, so you have to use session.get instead  
if request.session.get('gold') == None:


##############################
### Flash Messages
##############################
## in views.py
messages.error(request, "this is my error message") #this will add the error message string to the messages array, which is an array of flash messages
messages.success(request, "this is my success message") #this will add the error message string to the 

## in html
{% if messages %}
    {% for message in messages %}
      {{ message }}
    {% endfor %}
{% endif %}

##############################
### Forms
##############################
# the action points to the route in urls.py
<form action='/friends' method='post'> 
  {% csrf_token %} # need the csrf token as a security measure, and Django wont accept your form without it
  <label for="email">Email:<input type="text" name="email" id="email"></label>
</form>

# button
<input type="submit" value="update">

##############################
### Debugging
##############################
# embed allows you to add breakpoints in your code
$ pip install ipython # (terminal, w/ your enivironment up)
from IPython import embed # (add to the top of your .py file)
embed() # will create a breakpoint

# running the python shell so that you can build out your ORM layer
python ./manage.py shell
from apps.courses.models import Course
Course.objects.all()


##############################
### Flow
##############################
# http request comes in
# the url gets matched using regex according to the available routes as designated by urls.py
# the method specified in urls.py runs

# that method renders a template or redirects to another route
# if it is redirecting to another route, the server is actually sending a response back to the client (browser)
# telling it to make another request to another url path, which will usually then render a template to display a view 
# to the browser

# if there is a form on the view that is rendered, that form can be submitted
# the form submission will create a new http request that once again matches to a specific route in urls.py this time 
# the method it corresponds to is run - usually processing some data and making a query through the ORM
# this is usually followed with a redirect to another route





import kivy
from kivymd.app import MDApp
from kivy.uix.screenmanager import ScreenManager, Screen, FadeTransition
from kivy.lang import Builder
from kivy.core.window import Window
from kivy.clock import Clock
import sqlite3
import os.path
Window.size = (350,580)
_fixed_size = (350,580) #desired fix size
def reSize(*args):
   Window.size = _fixed_size
   return True
Window.bind(on_resize = reSize)

class jbonks(MDApp):

    def build(self):
        #create a database or connect
        conn = sqlite3.connect("user_signup.db")
        #create a cursor
        c = conn.cursor()
        #create a table
        c.execute("""CREATE TABLE if not exists customers(
        first_name text,
        middle_name text,
        last_name text,
        address text,
        email_address text,
        password text)
        """)

        conn.commit()
        conn.close()

        #creating the screen manager
        global screen_manager
        screen_manager = ScreenManager(transition = FadeTransition(clearcolor = (0,0,1,1)))
        #add the screens here / the kv files are the screens
        screen_manager.add_widget(Builder.load_file("jbonkers.kv"))
        screen_manager.add_widget(Builder.load_file("login.kv"))
        screen_manager.add_widget(Builder.load_file("signup.kv"))
        screen_manager.add_widget(Builder.load_file("home.kv"))
        return screen_manager

    def on_start(self): #the splash animation at the beginning
        Clock.schedule_once(self.login, 5)

    def login(self, *args): #calling the login screen after splace animation
        screen_manager.current = "login"

    def signup(self): #storing the data in the database (user_signup.db)
        # create a database or connect
        """conn = sqlite3.connect("user_signup.db")
        # create a cursor
        c = conn.cursor()
        # create a table
        #c.execute("INSERT INTO customers VALUES (first_name,middle_name,last_name,address,email_address,password) VALUES (?,?,?,?,?,?);")
        c.execute("INSERT INTO customers (first_name)",{
            "first": self.root.ids.fname.text,
        })
        conn.commit()
        conn.close()"""
    

if __name__ == "__main__":
    jbonks().run()
#now our appp has been created


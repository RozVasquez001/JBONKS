from kivy.core.text import LabelBase
from kivymd.app import MDApp
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.lang import Builder
from kivy.core.window import Window
from kivy.clock import Clock

Window.size = (350,580)

class jbonks(MDApp):

    def build(self):
        global screen_manager
        screen_manager = ScreenManager()
        screen_manager.add_widget(Builder.load_file("jbonkers.kv"))
        screen_manager.add_widget(Builder.load_file("login.kv"))
        return screen_manager

    def on_start(self):
        Clock.schedule_once(self.login, 1)

    def login(self, *args):
        screen_manager.current = "login"

if __name__ == "__main__":
    jbonks().run()
#now our appp has been created


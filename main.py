#Module use
from kivy.app import App
#for connecting to the KV File
from kivy.lang import Builder
#for showing text on screen after clicking button
from kivy.properties import StringProperty
#for multiple screen
from kivy.uix.screenmanager import Screen, ScreenManager
#for window configuration & Color
from kivy.core.window import Window

#Changing background
Window.clearcolor = 1,0,0,1

#Configure background
Window.size = (320 , 480)


#Signup
class FirstPage(Screen):
    my_text = StringProperty("")

    def on_press_button(self):
        self.my_text = "Registration Successfully"



#Login 
class SecondPage(Screen):
    pass

#Homepage
class ThirdPage(Screen):
    pass


class WindowManager(ScreenManager):
    pass



class JBONKS(App):
    def build(self):
        return kv

kv = Builder.load_file("JBONKS.kv")

if __name__ == "__main__":
    JBONKS().run()


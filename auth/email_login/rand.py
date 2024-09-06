import random

def generate_new_username(username):
    rand = random.randint(0, 36)
    strting = 'abcdefghijklmnopqrstuvwxyz1234567890'
    username += strting[rand]


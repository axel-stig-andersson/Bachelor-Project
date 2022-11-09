import email
from os import name
from pickle import NONE

import bcrypt
from main import db, Sneaker, User, CartedSneaker, Cart, Orderz
from main import User

db.drop_all()
db.create_all()

# men


# Testsson nedanför har lösenordet hej 

testsson = User(name = 'Peter', email = 'peter.mail', password_hash = "$2b$12$LRut0dbm1tM9RD.5Gx/z8OuI0LC2qu.PWp8Ll6QilV7ygIg24pZvq", memberSince = 2022)
testsson2 = User(name = 'Linus', email = 'linus.mail', password_hash = "$2b$12$LRut0dbm1tM9RD.5Gx/z8OuI0LC2qu.PWp8Ll6QilV7ygIg24pZvq", memberSince = 2022)


db.session.add(testsson)
db.session.add(testsson2)
db.session.commit()
exit() 

import email
from os import name
from pickle import NONE, TRUE

import bcrypt
from main import db, Sneaker, User, CartedSneaker, Cart, Orderz
from main import User

db.drop_all() 
db.create_all()

admin = User(name = 'Admin', email = 'admin.mail', password_hash = "$2b$12$LRut0dbm1tM9RD.5Gx/z8OuI0LC2qu.PWp8Ll6QilV7ygIg24pZvq", memberSince = 2022, is_admin = True)
testsson = User(name = 'Peter', email = 'peter.mail', password_hash = "$2b$12$LRut0dbm1tM9RD.5Gx/z8OuI0LC2qu.PWp8Ll6QilV7ygIg24pZvq", memberSince = 2022)
testsson2 = User(name = 'Linus', email = 'linus.mail', password_hash = "$2b$12$LRut0dbm1tM9RD.5Gx/z8OuI0LC2qu.PWp8Ll6QilV7ygIg24pZvq", memberSince = 2022)


petersFirst = Sneaker (model = 'peter1', size = '40', condition = 'New', brand = 'Nike'
            ,description = 'peters första' , colour = 'Blue', price = '100', 
              custGroup = 'male', seller_id = '2')
petersSecond = Sneaker(model = 'peter2', size = '41', condition = 'New', brand = 'Nike'
            ,description = 'peters andra' , colour = 'Green', price = '200', 
              custGroup = 'male', seller_id = '2')
petersThird = Sneaker(model = 'peter3', size = '42', condition = 'New', brand = 'Nike'
            ,description = 'peters tredje' , colour = 'Black', price = '300', 
              custGroup = 'male', seller_id = '2')
linusFirst = Sneaker(model = 'linus1', size = '43', condition = 'New', brand = 'Nike'
            ,description = 'linus första' , colour = 'Red', price = '400', 
              custGroup = 'male', seller_id = '3')

db.session.add(admin)
db.session.add(testsson)
db.session.add(testsson2)
db.session.add(petersFirst)
db.session.add(petersSecond) 
db.session.add(petersThird)
db.session.add(linusFirst)
db.session.commit()
exit()


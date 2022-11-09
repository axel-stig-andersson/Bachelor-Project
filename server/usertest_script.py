import email
from os import name
from pickle import NONE

import bcrypt
from main import db, Sneaker, User, CartedSneaker, Cart, Orderz
from main import User

db.drop_all() 
db.create_all()

#==============================TEST USERS===================================

testsson1 = User(name = 'Peter', email = 'peter@mail.com', password_hash = "$2b$12$LRut0dbm1tM9RD.5Gx/z8OuI0LC2qu.PWp8Ll6QilV7ygIg24pZvq", memberSince = 2022)
testsson2 = User(name = 'Linus', email = 'linus@mail.com', password_hash = "$2b$12$LRut0dbm1tM9RD.5Gx/z8OuI0LC2qu.PWp8Ll6QilV7ygIg24pZvq", memberSince = 2022)
testsson3 = User(name = 'Rut', email = 'rut@.mail.com', password_hash = "$2b$12$LRut0dbm1tM9RD.5Gx/z8OuI0LC2qu.PWp8Ll6QilV7ygIg24pZvq", memberSince = 2022)
testsson4 = User(name = 'Eva', email = 'eva@mail.com', password_hash = "$2b$12$LRut0dbm1tM9RD.5Gx/z8OuI0LC2qu.PWp8Ll6QilV7ygIg24pZvq", memberSince = 2022)


#=============================WOMEN SHOES===================================

women1 = Sneaker (model = 'Airforce', size = '37', condition = 'Used', brand = 'Nike'
            ,description = 'Selling my lovely sneakers, so cool' , colour = 'White', price = '300', 
              custGroup = 'female', seller_id = '3')
women2 = Sneaker(model = 'Energyfalcon', size = '39', condition = 'New', brand = 'Adidas'
            ,description = 'Wow, just wow.' , colour = 'Blue', price = '320', 
              custGroup = 'female', seller_id = '3')
women3 = Sneaker(model = 'AlphaEdge 4D', size = '38', condition = 'Poor', brand = 'Adidas'
            ,description = 'Condition may be poor but this pair i still adore' , colour = 'Black', price = '550', 
              custGroup = 'female', seller_id = '4')
women4 = Sneaker(model = 'Samba OG', size = '40', condition = 'New', brand = 'Adidas'
            ,description = 'Oldschool, clean, and bloody perfect' , colour = 'White', price = '470', 
              custGroup = 'female', seller_id = '4')
women5 = Sneaker(model = '550', size = '42', condition = 'Used', brand = 'New Balance'
            ,description = 'I would have paid alot more for these' , colour = 'White', price = '874', 
              custGroup = 'female', seller_id = '3')
women6 = Sneaker(model = '530', size = '39', condition = 'Used', brand = 'New Balance'
            ,description = 'May be used but not abused!' , colour = 'Red', price = '700', 
              custGroup = 'female', seller_id = '4')
women7 = Sneaker(model = 'Air Zoom', size = '36', condition = 'Poor', brand = 'Nike'
            ,description = 'Condition is awful but design is flawless' , colour = 'Black', price = '120', 
              custGroup = 'female', seller_id = '1')  
women8 = Sneaker(model = 'React Infinity 476', size = '39', condition = 'New', brand = 'Nike'
            ,description = 'Run! Just run!' , colour = 'Red', price = '600', 
              custGroup = 'female', seller_id = '2')           



#=================================MEN SHOES==========================================

men1 = Sneaker (model = 'Air Jordan 1000', size = '44', condition = 'Used', brand = 'Nike'
            ,description = 'I can fly, i am not afraid' , colour = 'White', price = '770', 
              custGroup = 'male', seller_id = '1')
men2 = Sneaker(model = 'Stan Smith', size = '45', condition = 'New', brand = 'Adidas'
            ,description = 'Clean, straight forward and beutiful', colour = 'Green', price = '640', 
              custGroup = 'male', seller_id = '2')
men3 = Sneaker(model = 'RapidRun', size = '42', condition = 'Poor', brand = 'Adidas'
            ,description = 'Condition may be poor but this pair i still adore' , colour = 'Black', price = '335', 
              custGroup = 'male', seller_id = '2')
men4 = Sneaker(model = 'AirForce Supreme', size = '43', condition = 'New', brand = 'Nike'
            ,description = 'Feel the force, join the movement', colour = 'Blue', price = '880', 
              custGroup = 'male', seller_id = '1')
men5 = Sneaker(model = '550', size = '46', condition = 'Used', brand = 'New Balance'
            ,description = 'Just in time production, quality for ever', colour = 'White', price = '640', 
              custGroup = 'male', seller_id = '3')
men6 = Sneaker(model = 'Space Hippie', size = '49', condition = 'New', brand = 'Nike'
            ,description = 'Huge pair! You might want to wear an extra pair of socks.' , colour = 'Red', price = '100', 
              custGroup = 'male', seller_id = '1')
men7 = Sneaker(model = 'Air Zoom', size = '42', condition = 'Poor', brand = 'Nike'
            ,description = 'Need to get rid of these, use them as "Krökskor"!' , colour = 'Black', price = '200', 
              custGroup = 'male', seller_id = '2')  
men8 = Sneaker(model = 'Superstar', size = '45', condition = 'Used', brand = 'Adidas'
            ,description = 'Buy these to make progress. Develop. Elevate. Become a superstar.' , colour = 'White', price = '700', 
              custGroup = 'male', seller_id = '4')



  

child1 = Sneaker (model = 'Jordans tiny', size = '33', condition = 'Used', brand = 'Nike'
            ,description = 'Start flying early' , colour = 'White', price = '235', 
              custGroup = 'child', seller_id = '1')
child2 = Sneaker(model = 'Stan Smith Youngster', size = '34', condition = 'New', brand = 'Adidas'
            ,description = 'Rule the school', colour = 'Green', price = '459', 
              custGroup = 'child', seller_id = '2')
child3 = Sneaker(model = 'Infant', size = '31', condition = 'Poor', brand = 'Adidas'
            ,description = 'Tested!' , colour = 'Black', price = '280', 
              custGroup = 'child', seller_id = '3')
child4 = Sneaker(model = 'AirForce Supreme Kids King', size = '35', condition = 'New', brand = 'Nike'
            ,description = 'Run Run Run!', colour = 'Blue', price = '600', 
              custGroup = 'child', seller_id = '4')
child5 = Sneaker(model = 'Adidas Crawler', size = '29', condition = 'Used', brand = 'Adidas'
            ,description = 'For the youngest', colour = 'Black', price = '120', 
              custGroup = 'child', seller_id = '3')
child6 = Sneaker(model = 'Space Hippie Tiny', size = '33', condition = 'Poor', brand = 'Nike'
            ,description = 'Really, really cute' , colour = 'Red', price = '310', 
              custGroup = 'child', seller_id = '2')
child7 = Sneaker(model = 'Air Zoom baby', size = '33', condition = 'New', brand = 'Nike'
            ,description = 'Need to get rid of these, use them as "lekskor"!' , colour = 'Black', price = '200', 
              custGroup = 'child', seller_id = '1')  
child8 = Sneaker(model = 'TinyStar Queen', size = '32', condition = 'Used', brand = 'Adidas'
            ,description = 'Become a superstar, but a young one' , colour = 'White', price = '540', 
              custGroup = 'child', seller_id = '4')
 

db.session.add(testsson1)
db.session.add(testsson2)
db.session.add(testsson3)
db.session.add(testsson4)
db.session.add(women1)
db.session.add(women2) 
db.session.add(women3)
db.session.add(women4)
db.session.add(women5)
db.session.add(women6)
db.session.add(women7)
db.session.add(women8)
db.session.add(men1)
db.session.add(men2)
db.session.add(men3)
db.session.add(men4)
db.session.add(men5)
db.session.add(men6)
db.session.add(men7)
db.session.add(men8)
db.session.add(child1)
db.session.add(child2)
db.session.add(child3)
db.session.add(child4)
db.session.add(child5)
db.session.add(child6)
db.session.add(child7)
db.session.add(child8)
db.session.commit()
exit()
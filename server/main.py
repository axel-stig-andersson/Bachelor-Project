from crypt import methods
from email.policy import default
import http

# from imp import reload
from pickle import TRUE
from turtle import back
import os
from os.path import exists


# from importlib.metadata import SelectableGroups
from flask import Flask, session
from flask import jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
import json
from sqlalchemy import ForeignKey, Integer, false
import stripe
from flask import Flask, render_template, jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity,
)


app = Flask(__name__, static_folder="../client", static_url_path="/")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "abc123"
db = SQLAlchemy(app)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)


@app.route("/")
def client():
    return app.send_static_file("client.html")


# stripe

# This is your test secret API key.
stripe.api_key = "sk_test_51KjKbEJUONbJrLV50tJvPlnOL7FiYUUHW8kFTrJ4CHPwvwWKCbDowvESEY7Q6kigMQdimVQvHuOU8iuNgmu0q2wD00zDEZRPmq"


def calculate_order_amount(user_id):
    total_price = 0
    current_cart = Cart.query.filter_by(owner=user_id).first()
    bought_sneakers = CartedSneaker.query.filter_by(cart_id=current_cart.id)
    for sneaker in bought_sneakers:
        print(total_price)
        total_price = total_price + sneaker.price
    return total_price


@app.route("/create-payment-intent", methods=["POST"])
def create_payment():
    try:
        data = json.loads(request.data)
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data["items"]) * 100,
            currency="sek",
            automatic_payment_methods={
                "enabled": True,
            },
        )
        return jsonify({"clientSecret": intent["client_secret"]})
    except Exception as e:
        return jsonify(error=str(e)), 403


# ==========================USER================================#
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    AVG_Rating = db.Column(db.Float, nullable=True)
    Number_Of_Ratings = 0
    password_hash = db.Column(db.String, nullable=False)
    memberSince = db.Column(db.Integer, nullable=False)
    sneakers = db.relationship("Sneaker", backref="user", lazy="select")
    cart = db.relationship("Cart", backref="user", lazy="select")
    sneakers_sold = db.Column(db.Integer, default=0)
    sneakers_bought = db.Column(db.Integer, default=0)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)


def __repr__(self):
    return "<User {}: {} {}".format(self.id, self.name, self.email, self.is_admin)


def serialize_user(self):

    return dict(
        id=self.id,
        name=self.name,
        email=self.email,
        memberSince=self.memberSince,
        is_admin=self.is_admin,
    )


def update_rating(self, Rating):
    Number_Of_Ratings = +1
    if self.AVG_Rating is None:
        self.AVG_Rating = Rating
    else:
        temp = self.AVG_Rating
        self.AVG_Rating = (Rating + temp) / (Number_Of_Ratings)


def set_password(self, password):
    self.password_hash = bcrypt.generate_password_hash(password).decode("utf8")


# ==========================USER================================#

# ==========================SNEAKER================================#
class Sneaker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    condition = db.Column(db.String, nullable=False)
    brand = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    colour = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    custGroup = db.Column(db.String, nullable=False)
    seller_id = db.Column(
        db.Integer, db.ForeignKey("user.id"), nullable=True
    )  # Ska vara False
    order_id = db.Column(db.Integer, db.ForeignKey("orderz.id"), nullable=True)
    is_shipped = db.Column(db.Boolean, default=False)
    is_delivered = db.Column(db.Boolean, default=False)


def __repr__(self):
    return "<Sneaker {}: {} {} {} {} {} {} {}".format(
        self.id,
        self.model,
        self.size,
        self.condition,
        self.brand,
        self.description,
        self.colour,
        self.price,
        self.custGroup,
        self.order_id,
        self.is_shipped,
        self.is_delivered,
    )


def serialize_sneaker(self, owner):
    return dict(
        id=self.id,
        model=self.model,
        size=self.size,
        condition=self.condition,
        brand=self.brand,
        description=self.description,
        colour=self.colour,
        price=self.price,
        order_id=self.order_id,
        seller=owner,
        custGroup=self.custGroup,
        is_shipped=self.is_shipped,
        is_delivered=self.is_delivered,
    )


def serialize_sneaker_without(self):
    return dict(
        id=self.id,
        model=self.model,
        size=self.size,
        condition=self.condition,
        price=self.price,
        custGroup=self.custGroup,
        seller_id=self.seller_id,
        order_id=self.order_id,
        brand=self.brand,
        is_shipped=self.is_shipped,
        is_delivered=self.is_delivered,
    )


# ==========================SNEAKER================================#


# ==========================CARTEDSNEAKER================================#


class CartedSneaker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    corresponding_sneaker = db.Column(db.Integer, nullable=False)
    model = db.Column(db.String, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    condition = db.Column(db.String, nullable=False)
    brand = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    colour = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    custGroup = db.Column(db.String, nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey("cart.id"), nullable=True)


def __repr__(self):
    return "<CartedSneaker {}: {} {} {} {} {} {} {} {}".format(
        self.id,
        self.corresponding_sneaker,
        self.model,
        self.size,
        self.condition,
        self.brand,
        self.description,
        self.colour,
        self.price,
        self.custGroup,
    )


def serialize_carted_sneaker(self):
    return dict(
        id=self.id,
        corresponding_sneaker=self.corresponding_sneaker,
        model=self.model,
        size=self.size,
        condition=self.condition,
        brand=self.brand,
        description=self.description,
        colour=self.colour,
        price=self.price,
        custGroup=self.custGroup,
    )


# ==========================CART================================#
class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    sneakers = db.relationship("CartedSneaker", backref="cart", lazy="select")


def __repr__(self):
    return "<Cart {}: {} {} ".format(self.id, self.owner, self.sneakers)


def serialize_cart(self):
    return dict(id=self.id, owner=self.owner, sneakers=self.sneakers)


# ===============================CART======================================#

# ==========================ORDER================================#
class Orderz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    shipping_address = db.Column(db.String, nullable=False)
    sneakerIsOrdered = db.relationship("Sneaker", backref="orderz", lazy="select")
    buyer_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)


def __repr__(self):
    return "<Orderz {}: {} {} {} {}".format(
        self.id,
        self.phone_number,
        self.city,
        self.zip_code,
        self.shipping_address,
        self.buyer_id,
    )


def serialize_order(self):
    return dict(
        zip_code=self.zip_code,
        shipping_address=self.shipping_address,
        city=self.city,
        phone_number=self.phone_number,
        buyer_id=self.buyer_id,
    )


# ==========================ORDER================================#


@app.route("/sign-up", methods=["POST"])
def signup():
    if request.method == "POST":
        data = request.get_json()
        user = User(
            name=data["name"], email=data["email"], memberSince=data["memberSince"]
        )
        set_password(user, data["password"])
        db.session.add(user)
        db.session.commit()
        return serialize_user(user)


@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        user = User.query.filter_by(email=data["email"]).first()
        if user == None:
            abort(401)
        else:

            if bcrypt.check_password_hash(user.password_hash, data["password"]):

                if Cart.query.filter_by(owner=user.id).first() is None:
                    sessionCart = Cart(owner=user.id)
                    db.session.add(sessionCart)
                    db.session.commit()

                access_token = create_access_token(identity=user.id)
                output_list = {"token": access_token, "user": serialize_user(user)}
                return jsonify(output_list)

            else:
                abort(401)


@app.route("/users/<int:user_id>", methods=["GET", "PUT", "DELETE"])
def user_id(user_id):
    if request.method == "PUT":
        user = User.query.filter_by(id=user_id).first()
        user.name = request.json.get("name", user.name)
        db.session.commit()
        return jsonify(serialize_user(user))
    elif request.method == "GET":
        user = User.query.filter_by(id=user_id).first()
        if user == None:
            abort(404)
        return jsonify(serialize_user(user))
    elif request.method == "DELETE":
        if User.query.filter_by(id=user_id).first() != None:
            db.session.delete(User.query.filter_by(id=user_id).first())
            db.session.commit()
            return {}
        return abort(404)


@app.route("/sneakers", methods=["GET", "POST"])
def sneakers():
    sneakers = []

    if request.method == "GET":
        sneaker_list = Sneaker.query.all()
        for i in sneaker_list:
            if i.seller_id is None:
                user = None
            else:
                user = serialize_user(User.query.get(i.seller_id))
            sneakers.append(serialize_sneaker(i, user))
        return jsonify(sneakers)
    elif request.method == "POST":
        if request.get_json(force=True).get("seller_id", False):
            sneakers = Sneaker(
                model=request.get_json()["model"],
                size=request.get_json()["size"],
                condition=request.get_json()["condition"],
                brand=request.get_json()["brand"],
                description=request.get_json()["description"],
                colour=request.get_json()["colour"],
                price=request.get_json()["price"],
                seller_id=request.get_json()["seller_id"],
                custGroup=request.get_json()["custGroup"],
            )

        else:
            sneakers = Sneaker(
                model=request.get_json()["model"],
                size=request.get_json()["size"],
                condition=request.get_json()["condition"],
                brand=request.get_json()["brand"],
                description=request.get_json()["description"],
                colour=request.get_json()["colour"],
                price=request.get_json()["price"],
                seller_id=None,
                custGroup=request.get_json()["custGroup"],
            )
        db.session.add(sneakers)
        db.session.commit()
        return jsonify(serialize_sneaker_without(sneakers))


@app.route("/sneakers/<int:sneaker_id>", methods=["GET", "PUT", "DELETE"])
def sneaker_int(sneaker_id):

    if request.method == "GET":
        sneaker = Sneaker.query.filter_by(id=sneaker_id).first_or_404()
        if sneaker.seller_id is None:
            user = None
        else:
            user = serialize_user(User.query.get(sneaker.seller_id))

        return jsonify(serialize_sneaker(sneaker, user))

    elif request.method == "PUT":
        sneaker = Sneaker.query.filter_by(id=sneaker_id).first_or_404()
        if request.get_json(force=True).get("seller_id", False):
            user = User.query.filter_by(
                id=request.get_json()["seller_id"]
            ).first_or_404()

        if request.get_json(force=True).get("model", False):
            setattr(sneaker, "model", request.get_json()["model"])
        if request.get_json(force=True).get("size", False):
            setattr(sneaker, "size", request.get_json()["size"])
        if request.get_json(force=True).get("condition", False):
            setattr(sneaker, "condition", request.get_json()["condition"])
        if request.get_json(force=True).get("brand", False):
            setattr(sneaker, "brand", request.get_json()["brand"])
        if request.get_json(force=True).get("description", False):
            setattr(sneaker, "description", request.get_json()["description"])
        if request.get_json(force=True).get("colour", False):
            setattr(sneaker, "colour", request.get_json()["colour"])
        if request.get_json(force=True).get("price", False):
            setattr(sneaker, "price", request.get_json()["price"])
        if request.get_json(force=True).get("seller_id", False):
            setattr(sneaker, "seller_id", request.get_json()["seller_id"])
        db.session.commit()

        return jsonify(serialize_sneaker_without(Sneaker.query.get(sneaker_id)))

    elif request.method == "DELETE":
        sneaker = Sneaker.query.filter_by(id=sneaker_id).first_or_404()
        Sneaker.query.filter_by(id=sneaker_id).delete()
        db.session.commit()

        return ("", http.HTTPStatus.OK)


# ============Lägga till Sneakers i Cart, genom att skapa en cartedsneaker som är en kopia av den riktiga.


@app.route(
    "/users/<int:user_id>/cart/sneakers/<int:sneaker_id>", methods=["POST", "DELETE"]
)
def cart(user_id, sneaker_id):

    sneaker = Sneaker.query.filter_by(id=sneaker_id).first_or_404()
    thiscart = Cart.query.filter_by(owner=user_id).first_or_404()

    if request.method == "POST":

        if (
            CartedSneaker.query.filter_by(
                cart_id=thiscart.id, corresponding_sneaker=sneaker_id
            ).first()
            is not None
        ):
            CartedSneaker.query.filter_by(
                cart_id=thiscart.id, corresponding_sneaker=sneaker_id
            ).delete()
            db.session.commit()
            return jsonify(0)
        else:
            CartSneaker = CartedSneaker(
                corresponding_sneaker=sneaker.id,
                model=sneaker.model,
                size=sneaker.size,
                condition=sneaker.condition,
                brand=sneaker.brand,
                description=sneaker.description,
                colour=sneaker.colour,
                price=sneaker.price,
                custGroup=sneaker.custGroup,
                cart_id=thiscart.id,
            )
            db.session.add(CartSneaker)
            db.session.commit()
            return jsonify(1)

    elif request.method == "DELETE":
        CartedSneaker.query.filter_by(
            cart_id=thiscart.id, corresponding_sneaker=sneaker_id
        ).delete()
        db.session.commit()
        return jsonify("Sneaker deleted from your cart!")


@app.route("/users/<int:user_id>/cart", methods=["GET"])
def user_cart(user_id):
    current_cart_products = []
    if request.method == "GET":
        myCart = Cart.query.filter_by(owner=user_id).first()
        myCart_sneakers = CartedSneaker.query.filter_by(cart_id=myCart.id)
        for x in myCart_sneakers:
            current_cart_products.append(serialize_carted_sneaker(x))
        return jsonify(current_cart_products)


UPLOAD_FOLDER = "../client/bilder_sneaker/"
UPLOAD_FOLDER2 = "../client/images/profilepictures/"
app.config["UPLOAD_FOLDER2"] = UPLOAD_FOLDER2
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/image/<int:sneaker_id>", methods=["POST"])
def upload_file(sneaker_id):
    if request.method == "POST":
        if "file" not in request.files:
            print("nope")
            return "there is no file in form!"
        image1 = request.files["file"]
        id_s = str(sneaker_id)
        path = os.path.join(app.config["UPLOAD_FOLDER"], "sneaker" + id_s + ".jpeg")
        image1.save(path)
        print(id)
        return jsonify("added sneaker")


@app.route(
    "/image/profilepictures/<int:user_id>",
    methods=["POST", "GET"],
)
def upload_file_user(user_id):
    id_s = str(user_id)
    path = os.path.join(app.config["UPLOAD_FOLDER2"], "user" + id_s + ".jpeg")

    if request.method == "POST":
        if "file" not in request.files:
            print("nope")
            return "there is no file in form!"
        image1 = request.files["file"]
        image1.save(path)
        print(id)
        return jsonify("added userpic")
    elif request.method == "GET":
        file_exists = exists(path)
        return jsonify(file_exists)


@app.route("/users/<int:user_id>/orderz", methods=["GET", "POST"])
def order_make(user_id):

    if request.method == "POST":
        current_cart = Cart.query.filter_by(owner=user_id).first()
        cart_sneak = CartedSneaker.query.filter_by(cart_id=current_cart.id)
        shoe_order = request.get_json()
        new_order = Orderz(
            city=shoe_order["city"],
            zip_code=shoe_order["zip_code"],
            shipping_address=shoe_order["shipping_address"],
            phone_number=shoe_order["phone_number"],
            buyer_id=user_id,
        )
        db.session.add(new_order)
        db.session.commit()
        this_order = Orderz.query.filter_by(buyer_id=user_id)
        for sneaky in cart_sneak:
            snook = Sneaker.query.filter_by(id=sneaky.corresponding_sneaker).first()
            snook.order_id = this_order[-1].id
        db.session.commit()
        return jsonify("Good purchase my leige")

    elif request.method == "GET":
        sneakers = []
        if user_id == 0:
            myOrders = Orderz.query
        else:
            myOrders = Orderz.query.filter_by(buyer_id=user_id)

        for orders in myOrders:
            sneaker_list = Sneaker.query.filter_by(order_id=orders.id)
            for sneak in sneaker_list:
                if sneak.seller_id is None:
                    user = None
                else:
                    user = serialize_user(User.query.get(sneak.seller_id))
                sneakers.append(serialize_sneaker(sneak, user))
        return jsonify(sneakers)


@app.route("/users/<int:user_id>/emptycart", methods=["DELETE", "GET"])
def empty_cart(user_id):
    current_cart = Cart.query.filter_by(owner=user_id).first()
    my_carted_sneakers = []
    bought_sneakers = CartedSneaker.query.filter_by(cart_id=current_cart.id)
    if request.method == "DELETE":
        for sneak in bought_sneakers:
            CartedSneaker.query.filter_by(
                corresponding_sneaker=sneak.corresponding_sneaker
            ).delete()
        db.session.commit()
        return "Empty cart empty heart"
    elif request.method == "GET":
        for sneak in bought_sneakers:
            sneak = serialize_carted_sneaker(sneak)
            my_carted_sneakers.append(sneak)
        return jsonify(my_carted_sneakers)


@app.route("/users/<int:user_id>/sneakers", methods=["GET"])
def my_sneakers(user_id):
    user_adds = Sneaker.query.filter_by(seller_id=user_id)
    if request.method == "GET":
        mySneaks = []
        for sneakers in user_adds:
            serSneak = serialize_sneaker_without(sneakers)
            mySneaks.append(serSneak)
        return jsonify(mySneaks)


@app.route("/users/<int:user_id>/sneakers/<int:sneaker_id>", methods=["DELETE"])
def delete_add(user_id, sneaker_id):
    if user_id == 0:
        user_adds = Sneaker.query
    else:
        user_adds = Sneaker.query.filter_by(seller_id=user_id)
    filtered = []
    if request.method == "DELETE":
        for i in user_adds:
            if i.id == sneaker_id:
                sneak = serialize_sneaker_without(i)
                filtered.append(sneak)
                db.session.delete(i)
                db.session.commit()

        if filtered:
            return jsonify(filtered)

        else:
            return "Du säljer inte den bro"


@app.route("/removefromcart/cartedsneakers/<int:carted_sneaker_id>", methods=["DELETE"])
def delete_cart_sneaker(carted_sneaker_id):
    if request.method == "DELETE":
        CartedSneaker.query.filter_by(id=carted_sneaker_id).delete()
    db.session.commit()
    return "Deleted from cart"


@app.route("/users/<int:user_id>/receipt", methods=["GET"])
def receipt(user_id):
    if request.method == "GET":
        sneakers = []
        myOrders = Orderz.query.filter_by(buyer_id=user_id)
        latest_order = myOrders[-1].id
        sneaker_list = Sneaker.query.filter_by(order_id=latest_order)
        for sneak in sneaker_list:
            if sneak.seller_id is None:
                user = None
            else:
                user = serialize_user(User.query.get(sneak.seller_id))
            sneakers.append(serialize_sneaker(sneak, user))
        return jsonify(sneakers)


@app.route("/orderz/<int:order_id>", methods=["GET"])
def order(order_id):
    if request.method == "GET":
        order = Orderz.query.filter_by(id=order_id).first()
        serorder = serialize_order(order)
        return jsonify(serorder)


@app.route("/shippedsneaker/<int:sneaker_id>", methods=["PUT", "POST"])
def shipped(sneaker_id):

    if request.method == "PUT":
        sneaker = Sneaker.query.filter_by(id=sneaker_id).first()
        sneaker.is_shipped = True
        print(sneaker.is_shipped)
        db.session.commit()
        return "Shipped!"

    if request.method == "POST":
        sneaker = Sneaker.query.filter_by(id=sneaker_id).first()
        sneaker.is_delivered = True
        db.session.commit()
    return "Delivered!"


if __name__ == "__main__":
    app.run(debug=True, port=5010)

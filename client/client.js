var host = 'http://127.0.0.1:5010'
var signedIn = false
var globalCust = "female"





function signedIN(){
    if (sessionStorage.getItem('auth') != null) {
        signedIn = sessionStorage.getItem('auth').length > 0;
        $("#btns_home_account").toggleClass('d-none', !signedIN);
        $("#btns_home_login").toggleClass('d-none',signedIN);
    }else{
        $("#btns_home_account").toggleClass('d-none', signedIN);
        $("#btns_home_login").toggleClass('d-none',!signedIN); 
    }
    
}

/*Hantera olika vyer som visas i container. Filip & Christoph */
$(document).ready(function () {


    $("#container").html($("#view_home").html());
    signedIN();

    $("#home").click(function (e) {
        e.preventDefault(); 
        $("#container").html($("#view_home").html());
        signedIN();  
        
    });

    $("#women").click(function (e) {
        e.preventDefault();
        $("#container").html($("#view_shop").html());
        hideAllWomens()
        globalCust = "female";
        filterSneakers(); 
        window.scrollTo(0, 0);       
    });

    $("#women_link").click(function (e) {
        e.preventDefault();
        $("#container").html($("#view_shop").html());
        hideAllWomens()
        globalCust = "female";
        filterSneakers();  
        window.scrollTo(0, 0);      
    });

    $("#men").click(function(e) {
        e.preventDefault();
        $("#container").html($("#view_shop").html());
        hideAllMen()
        globalCust = "male";
        filterSneakers();
        window.scrollTo(0, 0);
    });

    $("#men_link").click(function(e) {
        e.preventDefault();
        $("#container").html($("#view_shop").html());
        hideAllMen()
        globalCust = "male";
        filterSneakers();
        window.scrollTo(0, 0);
    });


    $("#kids").click(function(e) {
        e.preventDefault();
        $("#container").html($("#view_shop").html());
        hideAllKids()
        globalCust = "child"
        filterSneakers();
        window.scrollTo(0, 0);
    });

    $("#kids_link").click(function(e) {
        e.preventDefault();
        $("#container").html($("#view_shop").html());
        hideAllKids()
        globalCust = "child"
        filterSneakers();
        window.scrollTo(0, 0);
    });

    $("#the_team").click(function (e) {
        e.preventDefault();
        $("#container").html($("#view_team").html());
        window.scrollTo(0, 0);
    });

    $("#our_story").click(function (e) {
        e.preventDefault();
        $("#container").html($("#view_story").html());
        window.scrollTo(0, 0);
    });

    $("#contact_us").click(function (e) {
        e.preventDefault();
        $("#container").html($("#view_contactUs").html());
        window.scrollTo(0, 0);
    });

    $("#receipt").click(function (e) {
        e.preventDefault();
        $("#container").html($("#view_receipt").html());
        window.scrollTo(0, 0);
    });

    $("#shipping").click(function (e) {
        e.preventDefault();
        $("#container").html($("#view_shipping").html());
        window.scrollTo(0, 0);
    });

    $("#sustainability").click(function (e) {
        e.preventDefault();
        $("#container").html($("#view_sustainability").html());
        window.scrollTo(0, 0);
    });
    
    
});
 
function hideAllMen() {
    var link1 = document.getElementById('categoryWomensPic');
    link1.style.display = 'none'; //or
    link1.style.visibility = 'hidden';

    var link2 = document.getElementById('categoryKidsPic');
    link2.style.display = 'none'; //or
    link2.style.visibility = 'hidden';
}

function hideAllWomens() {
    var link1 = document.getElementById('categoryMensPic');
    link1.style.display = 'none'; //or
    link1.style.visibility = 'hidden';

    var link2 = document.getElementById('categoryKidsPic');
    link2.style.display = 'none'; //or
    link2.style.visibility = 'hidden';
}

function hideAllKids() {
    var link1 = document.getElementById('categoryWomensPic');
    link1.style.display = 'none'; //or
    link1.style.visibility = 'hidden';

    var link2 = document.getElementById('categoryMensPic');
    link2.style.display = 'none'; //or
    link2.style.visibility = 'hidden';
}

function showShippingView() {
    $("#container").html($("#view_shipping").html());
}

function showSustainabilityView() {
    $("#container").html($("#view_sustainability").html());
}

// test 

function showShoppingView() {
    $("#container").html($("#view_shop").html());
}

// test

function showRegisterView() {
    $("#container").html($("#view_register").html());
}

function showOurStoryView() {
    $("#container").html($("#view_story").html());
}


function showLogInView() {
    $("#container").html($("#view_login").html());
}

function showHome() {
    $("#container").html($("#view_home").html());
    signedIN() 
}

// HUAX stripe visning
function showCart() {
    createCart(); 
}
$("#stripe").click(function (e) {
    e.preventDefault();
    $("#container").html($("/stripe_checkout.html").html());
});
// HUAX stripe visning



function showAccount() {
    userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
    $.ajax({
        url: host + '/users/'+ userId,
        type: 'GET',
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        success: function (user) {
            $("#container").html($("#view_account").html());
            if (signedIn) {
                showSellerAds();
                document.getElementById("profile-name").innerHTML = user.name;
                document.getElementById("profile-program").innerHTML = user.education;
                document.getElementById("profile-grade").innerHTML = user.grade;
            }
        }
    })
}

function showSell() {
    console.log("!")
    if (sessionStorage.getItem('auth') != null) {
        $("#container").html($("#view_sell").html());
        console.log("!!") 
    } else {
        alert("du måste vara inloggad för att sälja ett föremål")
        $("#container").html($("#view_login").html());
        console.log("!!!")  
    }
    
}


function showTheTeam() {
    $("#container").html($("#view_team").html());
}

function showStripe() {
    userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
    initialize(userId)
    $("#container").html($("#view_stripe").html());
}


//Funktion för registrering
function signUp() {
    var pwd = checkPassword()
    
    date = new Date()
    $.ajax({
        url: host + '/sign-up',
        type: 'POST',
        contentType: "application/json",
        dataType: 'JSON',
        data: JSON.stringify({
            email: $("#inputSignUpEmail").val(), name: $("#inputSignUpName").val(), password: pwd, memberSince: parseInt(date.getFullYear())
        }),
        success: function (data) {
            showLogInView()
        }
    })
}

function checkPassword() {
    pwd1 = $("#passwordInput1").val()
    pwd2 = $("#inputSignUpPassword").val()

    if (pwd1 == pwd2) {
        return pwd1
    } else {
        showRegisterView()
        alert("Your passwords do not match - try again!");
        showRegisterView() 
    }
}


//Funktion för inloggning
function logIn() {
    $.ajax({
        url: host + '/login',
        type: 'POST',
        contentType: "application/json",
        dataType: 'JSON',
        data: JSON.stringify({
            email: $("#inputLogInEmail").val(), password: $("#inputLogInPassword").val()
        }),
        success: function (loginResponse) {
            sessionStorage.setItem('auth', JSON.stringify(loginResponse))
            showAccount()
            signedIn = true;
        }
    })
}

function logOut() {
    userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
    emptyCart(userId);
    sessionStorage.removeItem('auth')
    signedIn = false;
    showLogInView();
}

//Funktion för att avgöra om man ska visa login vyn eller account vyn
function loginVSAccount() {
    if (signedIn) {
        showAccount()
    } else {
        showLogInView()
    }
}

//Funktion för att redigera profil 
function editProfile() {
    var fd = new FormData();
    var files = $('#profilePicture')[0].files[0];
    fd.append('file', files)

    userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
    $.ajax({
        url: host + '/users/' + userId,
        type: 'PUT',
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        contentType: "application/json",
        dataType: 'JSON',
        data: JSON.stringify({
            name: $("#recipient-name").val()
        }),
        success: function (data) {
            $('.modal').remove();
            $('.modal-backdrop').remove();
            $('body').removeClass("modal-open");
            $("#container").empty()

            console.log("edit profile")
            $.ajax({
                url: host + '/image/profilepictures/' + userId,
                type: 'POST',
                processData: false, // important
                contentType: false, // important
                dataType: 'json',
                data: fd,
                success: function (data) {
                    showAccount();
                }
            })
        }
    })
}

function showProfilepic() {
    userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
    user_id = "0" //standard bild
    $.ajax({
        url: host + '/image/profilepictures/' + userId,
        type: 'GET',
        success: function (data) { 
            if (data){
                user_id = userId.toString() //om det finns en bild som heter user + "id"
            }
            $("#profile_pic").empty();
            var ppShown = '<img class="card-img-top" style="width:30%; height:width; margin-left: 35%; margin-top: 5%; margin-bottom: 0%; border-radius: 50%;" src="images/profilepictures/user' + user_id + '.jpeg" alt="..." />'
            console.log("ett")
            $("#profile_pic").append(ppShown);
            console.log("två")
        }
    })
    
    
}


//funktioner för att visa storlekar på sälj sidan
function menSizeSelect(){
    var selectElement = document.getElementById('sellSize');
    for (var size = 38; size <= 51 ; size++) {
        if(selectElement.value != null){
            selectElement.remove(size-38)
        }
        selectElement.add(new Option(size), size-38);
    }
    }
    
    function womenSizeSelect(){
        var selectElement = document.getElementById('sellSize');
        for (var size = 32; size <= 45 ; size++) {
            if(selectElement.value != null){
                selectElement.remove(size-32)
            }
            selectElement.add(new Option(size), size-32);
        }
    }
    
    function childSizeSelect(){
        var selectElement = document.getElementById('sellSize');
        for (var size = 20; size <= 33 ; size++) {
            if(selectElement.value != null){
                selectElement.remove(size-20)
            } 
            selectElement.add(new Option(size), size-20);
        }
    }

    function addingSneaker(){

        var fd = new FormData();
        var files = $('#sellImage1')[0].files[0];
        fd.append('file',files)
       
        userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
        $.ajax({
            url: host + '/sneakers',
            type: 'POST',
            headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
            contentType: "application/json",
            dataType: 'JSON',
            data: JSON.stringify({
               model: $("#sellModel").val(), size :$("#sellSize").val(), condition:$("#sellCondition").val(), brand:$("#sellBrand").val(), description:$("#sellDesc").val(), colour:$("#sellColour").val(), price:$("#sellPrice").val(),seller_id: userId, custGroup:$("input[type='radio'][name='genderRadio']:checked").val()
            }),
            success: function(data){
                alert("Your ad has been posted!")
                console.log("sko tillagd")
                $.ajax({
                    url: host + '/image/'+ data.id,
                    type: 'POST', 
                    processData: false, // important
                    contentType: false , // important
                    dataType : 'json',
                    data: fd,
                    success: function(data){
                        console.log("hej")
                        showAccount();
                    }
                })
            }
        })
    }



    function showSneakers(sneakers){
        $("#produktLista").empty();
                    sneakers.forEach((sneaker) => { 
                        if (sneaker.order_id == null) { 
                        bild_id=sneaker.id.toString()
                        var sneakerShown =  ' <div class="col mb-5"> <div class="card pb-0 color3" style="height: 50vh;"> <!-- Product image--><img class="card-img-top" style="height: 21vh;" src="bilder_sneaker/sneaker'+bild_id+'.jpeg" alt="..." /> <!-- Product details--><div style="height: 10vh;" class="card-body color3"> <div style="height: 10vh;" class="text-center"><!-- Product name--> <h5 style="height: 5vh;" class="fw-bolder textfont color6">'+ sneaker.brand +' '+ sneaker.model+'</h5> <!-- Product price--><p style="height: 10vh; padding-top: 30px" class="textfont color6">'+'Price: ' +sneaker.price+'<br>Color: ' +sneaker.colour+'<br>Size: ' +sneaker.size+'</p></div><!-- Product actions--><div id="add-btn-div"class="text-center textfont"><button type="button" class="btn btn-outline-dark color2 color1 addcart-button" id="addcart-button'+sneaker.id+'" onclick="addToCart('+sneaker.id+')" href="#">Add to cart</button>';
                        $("#produktLista").append(sneakerShown);
                        }
                    })
                    try{
                        userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
                    $.ajax({
                        url: host + '/users/' + userId + '/emptycart',
                        type: 'GET',
                        headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
                        success: function(cartedsneakers){
                            cartedsneakers.forEach((cartsneak) => { 
                                $("#addcart-button" + cartsneak.corresponding_sneaker + "").html("Remove");
                            })
                        }
            }) 
        } catch (e) {

    }
}


    
    function filterSneakers(){
        console.log(globalCust)
        $.ajax({
            url: host + '/sneakers', 
            type: 'GET',
            success: function(sneakers) {
                listCust = [];
                listBrand = [];
                listCondition = [];
                listSize = [];
                listPrice = [];
                listColor = [];
                sneakers.forEach((sneaker)=>{
                            if(sneaker.custGroup == globalCust ) {
                                listCust.push(sneaker)
                                go = false;
                            }
                });

                if ($("#brandFilter").val() != "All"){
                    listCust.forEach((sneaker)=>{
                                if(sneaker.brand == $("#brandFilter").val()) {
                                    listBrand.push(sneaker)
                                }
                    });
                }else{
                    listBrand = listCust 
                }

                if ($("#conditionFilter").val() != "All"){
                    listBrand.forEach((sneaker)=>{
                                if(sneaker.condition == $("#conditionFilter").val() ) {
                                    listCondition.push(sneaker)
                                }
                    });
                }else{
                    listCondition = listBrand
                }

                if ($("#sizeFilter").val() != "All"){
                    listCondition.forEach((sneaker)=>{
                        console.log("Sneaker: " + sneaker.size + " Filter: " + $("#sizeFilter").val())
                                if(sneaker.size == $("#sizeFilter").val() ) {
                                    listSize.push(sneaker)
                                }
                    });
                }else{
                    listSize = listCondition
                }

                
                    listSize.forEach((sneaker)=>{
                        console.log(typeof $("#filterPriceMin").val())
                        if ( $("#filterPriceMin").val() === ''){
                            min = 0;
                        }else{
                            min = parseInt($("#filterPriceMin").val())
                        }
                        if ($("#filterPriceMax").val() === ''){
                            max = Infinity;
                        }else{
                            max = parseInt($("#filterPriceMax").val())
                        }

                        console.log("Min: " + min + " Type:" + typeof min)
                        if(min <= sneaker.price && sneaker.price <= max ) {
                                    listPrice.push(sneaker)
                        }
                    });

                    if ($("#colorFilter").val() != "All"){
                        listPrice.forEach((sneaker)=>{
                                    if(sneaker.colour == $("#colorFilter").val() ) {
                                        listColor.push(sneaker)
                                    }
                        });
                    }else{
                        listColor= listPrice
                    }

                window.scrollTo(0, 0);  //ändra denna till (0,150) om vi vill scrolla ner efter filter

                sortSneakers(listColor);
                showSneakers(listColor);    
 

            } 
        })
    }

    function sortSneakers (sneakerList) {
        
         if($("#sortingFilter").val() == "HighestToLowest") {
            sneakerList.sort((a,b) => {
                return b.price - a.price;
            });
         }

        if($("#sortingFilter").val() == "LowestToHighest") {
            sneakerList.sort((a,b) => {
                return a.price - b.price; 
            });
        }

    }

    function showSellerAds(){
        $.ajax({
            url: host + '/sneakers',
            type: 'GET',
            success: function(sneakers) {
                sneakers.forEach((sneaker)=>{
                    bild_id=sneaker.id.toString() 
                    if (JSON.parse(sessionStorage.getItem('auth')).user.is_admin){
                        if(sneaker.seller != null && sneaker.order_id == null){
                        var sneakerShown = '<div class="sellerAds color2"><div class="sellerAdsDiv"><img class="sellerAdsImage" src="bilder_sneaker/sneaker'+bild_id+'.jpeg" alt="..." /></div><div id="sellerAdsDivRight"><p class="sellerAdsText color1 textfont">Brand: ' + sneaker.brand + '<br>Model: ' +sneaker.model + '<br>Size: ' + sneaker.size + '<br>Price: ' + sneaker.price + '</p><button type="button" class="btn btn-outline-dark mt-auto color3 color6" onclick="removeAdd('+sneaker.id+')" href="#">Remove ad</button></div></div>'
                        $("#annonsLista").append(sneakerShown); 
                    }
                    }else{
                        if(sneaker.seller != null && sneaker.order_id == null){
                            if(sneaker.seller.id == JSON.parse(sessionStorage.getItem('auth')).user.id) {
                            var sneakerShown = '<div class="sellerAds color2"><div class="sellerAdsDiv"><img class="sellerAdsImage" src="bilder_sneaker/sneaker'+bild_id+'.jpeg" alt="..." /></div><div id="sellerAdsDivRight"><p class="sellerAdsText color1 textfont">Brand: ' + sneaker.brand + '<br>Model: ' +sneaker.model + '<br>Size: ' + sneaker.size + '<br>Price: ' + sneaker.price + '</p><button type="button" class="btn btn-outline-dark mt-auto color3 color6" onclick="removeAdd('+sneaker.id+')" href="#">Remove ad</button></div></div>'
                            $("#annonsLista").append(sneakerShown);
                            }
                        }
                    }
                });
            }
        })
    }


    function addToCart(sneaker_id){
        
        userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
        $.ajax({
            url: host + '/sneakers/' + sneaker_id,
            type: 'GET',
            headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
            success: function(data){
                if (data.seller.id==userId) {
                    alert("You may not purchase your own sneaker")
                } else {
                $.ajax({
                    url: host + '/users/'+userId+'/cart/sneakers/'+sneaker_id,
                    type: 'POST',
                    headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
                    contentType: "application/json",
                    dataType: 'JSON',
                    data: JSON.stringify({
                       model: data.model, size : data.size, condition: data.condition, brand: data.brand, description: data.description, colour: data.colour, price: data.price, custGroup: data.custGroup
                    }),
                    success: function(data){
                        if (data==1){
                        $("#addcart-button" + sneaker_id + "").html("Remove");
                        } else {
                            $("#addcart-button" + sneaker_id + "").html("Add to cart");

                        }
                    }
                })
             
            } }
        })
    }

    function createCart() {
       var total_price = 0
    try { 
        userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
        $.ajax({
            url: host + '/users/' + userId + '/cart',
            type: 'GET',
            headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
            success: function(current_cart_products){
                for (cart_sneaks in current_cart_products) {
                    bild_id=current_cart_products[cart_sneaks].corresponding_sneaker.toString() 
                    console.log(current_cart_products[cart_sneaks].corresponding_sneaker)
                    $("#dynamicCart").append( 
                        "<div class='d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-2 px-3 rounded'>" +
                          "<div class='mr-1'><img class='rounded' src='bilder_sneaker/sneaker"+bild_id+".jpeg' width='70'>" +
                          "</div>" +
                         "<div class='d-flex flex-column align-items-center product-details'><span" +
                         "class=textfont>" +current_cart_products[cart_sneaks].brand + "</span>" +
                           "<div class='d-flex flex-row product-desc'>" +
                              "<div class='size mr-1'><span class='textfont'>Color:</span><span"+
                                "class='textfont'>&nbsp;" + current_cart_products[cart_sneaks].colour + "</span></div>"+
                              "<div class='color'><span class='textfont'>Size:</span><span"+
                                "class='textfont'>&nbsp;" + current_cart_products[cart_sneaks].size + "</span></div>"+
                            "</div>" +
                            "</div>" +
                          "<div>" + 
                          "<h5 class='textfont'>" + current_cart_products[cart_sneaks].price + " SEK</h5>" +
                          "</div>" +
                          "<div class='d-flex align-items-center'><i class='fa fa-trash mb-1 text-danger'></i>" +
                          "</div>" +
                          "<button type='button' class='btn btn-outline-dark mt-auto color3 color6' onclick='removeFromCart("+current_cart_products[cart_sneaks].id+" )' href='#'>Remove from cart</button> " +
                          "</div>"  
        );
        (total_price = total_price + current_cart_products[cart_sneaks].price)
     }
     $("#total_price").append( 
        "<h5 class='textfont color6'>Your total cost: " + total_price + " SEK</h5>" );
    }}
     );
     $("#container").html($("#view_cart").html()); 
    } catch (e) {
alert("Please login to shop")

    }
}
   

function addSneakersToOrder() {
    userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
        $.ajax({
            url: host + '/users/' + userId + '/orderz',
            type: 'POST',
            contentType: "application/json",
            async: false,
            dataType: 'JSON',
            data: JSON.stringify({
                city: $("#city").val(), 
                zip_code: $("#zip_code").val(), 
                shipping_address: $("#shipping_address").val(), 
                phone_number: $("#phone_number").val(), 
                buyer_id: userId
            }),
            success: function (data) {
                emptyCart(userId);
            }
        })
    }
    function emptyCart(userId) {
        userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
        $.ajax({
            url: host + '/users/' + userId + '/emptycart',
            type: 'DELETE',
            headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
            success: function(data){
         console.log("delete success")
    }
})

}
    
function showReceipt() {
     userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
     totPrice = 0; 
     $.ajax({
         url: host + '/users/' + userId + '/receipt',
         type: 'GET',
         headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
         success: function(order_products){
             for (sneaks in order_products) { 
                bild_id=order_products[sneaks].id.toString() 

                 $("#dynamicName").append( 
                    "<p class='textfont' style='margin-top:40px;'>"+order_products[sneaks].brand+" </p>"
                );
 
                $("#dynamicArticleNumber").append( 
                    "<p class='textfont' style='margin-top:40px;'> "+order_products[sneaks].id+"</p>"
                );
                $("#dynamicPrice").append( 
                    "<p class='textfont' style='margin-top:40px;'> "+order_products[sneaks].price+"</p>"

                 );
  $("#dynamicPic").append( 
    "<div class='mr-1'><img class='rounded' src='bilder_sneaker/sneaker"+bild_id+".jpeg' width='70' style='margin-top:15px;'>"

);
        totPrice = totPrice + order_products[sneaks].price
 }
 document.getElementById("order_number_text").innerHTML = "Order Number: " + order_products[0].order_id
 document.getElementById("total_price_text").innerHTML = "Total Price: " + totPrice
}  

     }) 
     $("#container").html($("#view_receipt").html());
    }

    function removeAdd(sneaker_id) {
        if(JSON.parse(sessionStorage.getItem('auth')).user.is_admin){
            userId = 0;
        }else{
            userId = JSON.parse(sessionStorage.getItem('auth')).user.id; 
        }
       
        $.ajax({
            url: host + '/users/' + userId + '/sneakers/'+sneaker_id,
            type: 'DELETE',
            headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
            success: function(data){
                showAccount();
         console.log("delete success")
    }
})

}

function showOrderHistory(){
    var sold_sneakers = 0;
    console.log(JSON.parse(sessionStorage.getItem('auth')).user.is_admin)
    if(JSON.parse(sessionStorage.getItem('auth')).user.is_admin){
        userId = 0;
    }else{
        userId = JSON.parse(sessionStorage.getItem('auth')).user.id; 
    } 

    $.ajax({
        url: host + '/users/' + userId + '/orderz',
        type: 'GET',
        headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
        success: function(ordered_sneakers){
            ordered_sneakers.forEach((sneaker)=>{
                bild_id=sneaker.id.toString()
                if (sneaker.is_shipped) { 
                    if (sneaker.is_delivered){
                    var sneakerShown = "<div class='sellerAds color2'><div class='sellerAdsDiv'><img class='sellerAdsImage' src='bilder_sneaker/sneaker"+bild_id+".jpeg' alt='...' /></div><div id='sellerAdsDivRight'><p class='sellerAdsText color1 textfont'>Brand: " + sneaker.brand + "<br>Model: " +sneaker.model + "<br>Size: " + sneaker.size + "<br>Price: " + sneaker.price + " <br>This matter is closed, enjoy your sneakers!</p></div></div>"
                    } else {
                    var sneakerShown = "<div class='sellerAds color2'><div class='sellerAdsDiv'><img class='sellerAdsImage' src='bilder_sneaker/sneaker"+bild_id+".jpeg' alt='...' /></div><div id='sellerAdsDivRight'><p class='sellerAdsText color1 textfont'>Brand: " + sneaker.brand + "<br>Model: " +sneaker.model + "<br>Size: " + sneaker.size + "<br>Price: " + sneaker.price + " <br>The package has been shipped! If there is any problem with the delivery, please contact us.  Order id: " + sneaker.order_id + " <button type='button'' class='btn btn-outline-dark mt-auto color3 color6' id='recieved'"+sneaker.id+" onclick=delivered("+sneaker.id+") href='#'>Recieved</button></p></div></div>"
                    }
                } else {
                    var sneakerShown = "<div class='sellerAds color2'><div class='sellerAdsDiv'><img class='sellerAdsImage' src='bilder_sneaker/sneaker"+bild_id+".jpeg' alt='...' /></div><div id='sellerAdsDivRight'><p class='sellerAdsText color1 textfont'>Brand: " + sneaker.brand + "<br>Model: " +sneaker.model + "<br>Size: " + sneaker.size + "<br>Price: " + sneaker.price + " <br>Bought. Order id: " + sneaker.order_id + "</p></div></div>"
                }
                    $("#annonsLista").append(sneakerShown);
               
                    })
                    document.getElementById("shoes_purchased_text").innerHTML = "Shoes purchased: " + ordered_sneakers.length;
                }
                
                 
            })

    $.ajax({

        url: host + '/users/' + userId + '/sneakers',
        type: 'GET',
        success: function(sneakers) {
            sneakers.forEach((sneaker)=>{
                bild_id=sneaker.id.toString()
                    if(sneaker.seller_id == JSON.parse(sessionStorage.getItem('auth')).user.id && sneaker.order_id != null) { 
                        if(sneaker.is_delivered) {       
                            var sneakerShown = "<div class='sellerAds color2'><div class='sellerAdsDiv'><img class='sellerAdsImage' src='bilder_sneaker/sneaker"+bild_id+".jpeg' alt='...' /></div><div id='sellerAdsDivRight'><p class='sellerAdsText color1 textfont'>Brand: " + sneaker.brand + "<br>Model: " +sneaker.model + "<br>Size: " + sneaker.size + "<br>Price: " + sneaker.price + " <br>This matter is closed, The buyer has recieved the sneakers!</p></div></div>"        
                        } else {
                            var sneakerShown = "<div class='sellerAds color2'><div class='sellerAdsDiv'><img class='sellerAdsImage' src='bilder_sneaker/sneaker"+bild_id+".jpeg' alt='...' /></div><div id='sellerAdsDivRight'><p class='sellerAdsText color1 textfont'>Brand: " + sneaker.brand + "<br>Model: " +sneaker.model + "<br>Size: " + sneaker.size + "<br>Price: " + sneaker.price + " <br>Sold. Order id: " + sneaker.order_id + "</p></div></div>"
                        }
                    $("#annonsLista").append(sneakerShown); 
                    sold_sneakers = sold_sneakers +1;
                    }
            });
            document.getElementById("shoes_sold_text").innerHTML = "Shoes sold: " + sold_sneakers; 
        }
    })

    $.ajax({
        url: host + '/users/'+ userId,
        type: 'GET',
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        success: function (user) {
                document.getElementById("account_view_name_text").innerHTML = user.name;
                document.getElementById("member_since_text").innerHTML = "Member since: " + user.memberSince;
             //   document.getElementById("shoes_purchased_text").innerHTML = "Shoes purchased: ordered_sneakers.size";
        }
    })
    $("#container").html($("#view_account").html());
    showProfilepic();
}

function removeFromCart(carted_sneaker_id) {
    userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
    $.ajax({
        url: host + '/removefromcart/cartedsneakers/'+carted_sneaker_id +'',
        type: 'DELETE',
        headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
        success: function(data){
            showCart();
}
})

}


function ordersToShip(){

    if(JSON.parse(sessionStorage.getItem('auth')).user.is_admin){
        userId = 0;
    }else{
        userId = JSON.parse(sessionStorage.getItem('auth')).user.id;
        
    } 
    user = JSON.parse(sessionStorage.getItem('auth')).user;

    $.ajax({

        url: host + '/users/' + userId + '/sneakers',
        type: 'GET',
        success: function(sneakers) {


            sneakers.forEach((sneaker)=>{

                $.ajax({
                    url: host + '/orderz/' + sneaker.order_id,
                    type: 'GET', 
                    success: function(order) {
                        bild_id=sneaker.id.toString()
                    if(sneaker.seller_id == JSON.parse(sessionStorage.getItem('auth')).user.id && sneaker.order_id != null) {                
                    var sneakerShown = "<div class='sellerAds color2'><div class='sellerAdsDiv'><img class='sellerAdsImage' src='bilder_sneaker/sneaker"+bild_id+".jpeg' alt='...' /></div><div id='sellerAdsDivRight'><p class='sellerAdsText color1 textfont'>Brand: " + sneaker.brand + "<br>Model: " +sneaker.model + "<br>Size: " + sneaker.size + "<br>Price: " + sneaker.price + " <br>Sold. Order id: " + sneaker.order_id + "<br>Adress: " + order.shipping_address + "<br>City: " + order.city + "<br>Zip code: " + order.zip_code + "<br>Phone: "+ order.phone_number + "<div class='form-check'>" +
                    "<input class='form-check-input' type='checkbox' onclick='checkBoxClick("+sneaker.id+")' style='accent-color: lightgreen;' value='' id='shipping_checkbox"+ sneaker.id +"' unchecked />" +
                    "<label class='form-check-label textfont color4' style='font-weight: bold;' id='shipping_checkbox_text"+ sneaker.id +"' for='form2Example31'> I have shipped this product </label>"+
                  "</div></p></div></div>"
                    $("#annonsLista").append(sneakerShown);   
                    if (sneaker.is_shipped) {
                  
                        $("#shipping_checkbox"+ sneaker.id +"").toggleClass('d-none',1); 
                        $("#shipping_checkbox_text"+ sneaker.id +"").html("Shipped");  
                    } 
                    if (sneaker.is_delivered) {
                        $("#shipping_checkbox_text"+ sneaker.id +"").html("Delivered");  
                    }
                   
                    
                    }    

                }     

                
                }
                ); 
                document.getElementById("account_view_name_text").innerHTML = user.name;
                document.getElementById("member_since_text").innerHTML = "Member since: " + user.memberSince;
                showProfilepic(userId)
                
             });
            
    }}); 

  
    $("#container").html($("#view_account").html());   

 
}  

function checkBoxClick(sneaker_id) {
    $("#shipping_checkbox"+ sneaker_id +"").toggleClass('d-none',1); 
    $("#shipping_checkbox_text"+ sneaker_id +"").html("Shipped");  

    $.ajax({
        url: host + '/shippedsneaker/' + sneaker_id,
        type: 'PUT',
        success: function(sneaker) { 
}})}

function delivered(sneaker_id) {
    $("#shipping_checkbox_text"+ sneaker_id +"").html("Delivered"); 
    $("#recieved"+sneaker_id+"").toggleClass('d-none',1);   

    $.ajax({
        url: host + '/shippedsneaker/' + sneaker_id,
        type: 'POST',
        success: function(sneaker) { 

    showOrderHistory()
}})}






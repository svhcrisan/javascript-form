(function() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const checkoutBtn = document.getElementById('checkout');


    // firstName
    firstName.addEventListener('change', function(event){
        let fname = checkName(firstName.value);
        let lname = checkName(lastName.value);
        let mail = validateEmail(email.value);
        console.log(firstName.value, fname);
        
        if (firstName.value === "" || !fname) {
            firstName.setAttribute("style", "border: 1px solid #F2314B;");
        } else {
            firstName.setAttribute("style", "border: 1px solid #777777;");
        }
        if(fname && lname && mail === true){
            checkoutBtn.disabled = false;
            document.getElementById('custom-error').style.display = "none";
        } else {
            document.getElementById('custom-error').style.display = "block";
        }
    });

    // lastName
    lastName.addEventListener('change', function(event){
        let fname = checkName(firstName.value);
        let lname = checkName(lastName.value);
        let mail = validateEmail(email.value);
        if (lastName.value === "" || !lname) {
            lastName.setAttribute("style", "border: 1px solid #F2314B");
            //lastName.style.color = "#F2314B";
        } else {
            lastName.setAttribute("style", "border: 1px solid #777777;");
        }
        if(fname && lname && mail === true){
            checkoutBtn.disabled = false;
            document.getElementById('custom-error').style.display = "none";
        } else {
            document.getElementById('custom-error').style.display = "block";
        }
    });

    // email 
    email.addEventListener('change', function(event){
        let fname = checkName(firstName.value);
        let lname = checkName(lastName.value);
        let mail = validateEmail(email.value);
        if (email.value === "" || !mail) {
            email.setAttribute("style", "border: 1px solid #F2314B;");
            email.style.color = "#F2314B;";
        } else {
            email.setAttribute("style", "border: 1px solid #777777;");
        }
        if(fname && lname && mail) {
            checkoutBtn.disabled = false;
            document.getElementById('custom-error').style.display = "none";
        } else {
            document.getElementById('custom-error').style.display = "block";
        }
    });

        // checkout btn
        checkoutBtn.addEventListener('click', function(){
        document.getElementsByClassName('modal')[0].innerHTML = `<center><h1> Checkout Complete! </h1></center>`;
    });

    // products actions
    // remove item
    let removeBtn = document.getElementsByClassName('remove-item');
    let updateRow = function(event) {
        event.preventDefault();
        let target = event.target;
        let targetPrice = target.parentElement.parentElement.children[4].innerHTML;
        deleteRow(target);
        updatePrice(targetPrice);        
    };

    //add click events for remove buttons
    for (let i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener('click', updateRow, false);
    }

    //add or remove
    const addButton = document.getElementsByClassName('add');
    const delButton = document.getElementsByClassName('remove');
    //add
    for (let i = 0; i < addButton.length; i++) {
        addButton[i].addEventListener('click', updateQuantity, false);
    }

    for (let i = 0; i < delButton.length; i++) {
        delButton[i].addEventListener('click', updateQuantity, false);
    }



})();

//help functions
function checkName(name) {
    let letters = /^[A-Za-z]+$/;
    if (name.match(letters)){
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const deleteRow = (target) => {
    target.parentElement.parentElement.remove();
}

const updatePrice = (targetPrice) => {
    let total = document.getElementsByClassName('total')[0];
    total.innerHTML = total.innerHTML - targetPrice;
}

function checkIfItem(number) {
    if(number < 1) {
        checkoutBtn.disabled = false;
    }
}

function updateQuantity(event) {
    let target = event.target;
    let quantity = target.parentElement.getElementsByClassName("quantity")[0];
    let unitPrice = target.parentElement.parentElement.getElementsByClassName("price")[0];
    let totalPrice = target.parentElement.parentElement.getElementsByClassName("price-total")[0];
    let totalPriceArray = document.getElementsByClassName("price-total");
    
    //let test = document.getElementsByClassName("price")[1];
    let totalTotal = document.getElementsByClassName("total")[0];
    let sum = 0;
    
    console.log(totalPriceArray);
    if(this.classList.contains("add")){
        quantity.innerHTML = Number(quantity.innerHTML) +1;
        totalPrice.innerHTML = (Number(quantity.innerHTML) * Number(unitPrice.innerHTML));
        for(let i = 0; i < totalPriceArray.length; i++) {
            
            sum += Number(totalPriceArray[i].innerHTML);
           
        }
        totalTotal.innerHTML = Number(sum);
    } else if (this.classList.contains("remove") && (Number(quantity.innerHTML)>1)){
        quantity.innerHTML = Number(quantity.innerHTML) -1;
        totalPrice.innerHTML = (Number(quantity.innerHTML) * Number(unitPrice.innerHTML));
        for(let i = 0; i < totalPriceArray.length; i++) {
            
            sum += Number(totalPriceArray[i].innerHTML);
            
        }
        totalTotal.innerHTML = Number(sum);
    }

}
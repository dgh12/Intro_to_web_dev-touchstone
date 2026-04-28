function Subscribe () {
    event.preventDefault();
    let email = event.target.email.value;
    show ("user " + email + " is subscribed");
    clear();
};
function contact_message () {
    event.preventDefault();
    show("Thank you for your message.");
    add_contact_info();
    clear();
};
function add_contact_info () {
    let elements = document.getElementsByClassName("about");
    let values = [];
    for (let x = 0; x < elements.length; x++) {
        const element = elements[x];
        values.push(element.value);
    }
    let json = JSON.stringify(values);
    sessionStorage.setItem(`contact ${values[0]}`, json);
};
function go_to_cart () {
    if (sessionStorage.getItem("home_book")) {
        let home_book = sessionStorage.getItem("home_book");
        let book = document.getElementById(`${home_book}`);
        let element1 = document.querySelector(`label[for = "${home_book}"]`);
        let element = element1.children[0].cloneNode(true);
        console.log(book.value);
        Book_submission(book.value, element);
        sessionStorage.removeItem("home_book");
    };
};
async function Book_submission (bookname, element) {
    let Book_elements = [];
    let book_elements = [];
    let Books = [];
    let msg = ""
    let home = false;
    if (sessionStorage.getItem('cartItems') != null) {
        let items = JSON.parse(sessionStorage.getItem("cartItems"));
        console.log(items)
        items.forEach(item => {
            book_elements.push(item);
        })
    };
    if (!element && !bookname) {
        event.preventDefault();
        let books = document.querySelectorAll('input[name="book"]');
        let element1;
        let element;
        books.forEach(checkbox => {
            if (checkbox.checked) {
                Books.push(checkbox.value);
                element1 = document.querySelector("label[for=\"" + checkbox.id + "\"]");
                element = element1.children[0].cloneNode(true);
                Book_elements.push(element);
            };
        });
        let book_str = "";
        book_length = Books.length;
        if (book_length == 0) {
            msg = "No new items added to the cart";
        } else if (book_length == 1) {
            book_str = String(Books[0])
            msg = `The item ${book_str} was added to the cart`;
        } else if (book_length == 2) {    
            book_str += Books[0] + " and " + Books[1];
            msg = `The items ${book_str} were added to the cart`;
        } else if (book_length > 2) {
            let book_num = 1;
            let book_num_arry = []
            Books.forEach(book => {
                book_num_arry.push(book_num);
                book_num ++;
            });
            book_num_arry.forEach(num => {
                let num_aug = num + 1;
                if ( num_aug == book_num) {
                    book_str += " and " + Books[num -1];
                } else {
                    book_str += " " + Books[num - 1] + ",";
                }
            });
            msg = `The items ${book_str} were added to the cart`;
        };
    } else if (!element) {
        sessionStorage.setItem("home_book", bookname);
        books();
    } else {
        msg = `The item ${bookname} was added to the cart`;
        Book_elements.push(element);
        Books.push(bookname);
        home = true;
    };
    for (let x = 0; x < Book_elements.length; x++) {
        let div_element = document.createElement("div");
        let h_element = document.createElement("h3");
        h_element.innerText = Books[x];
        div_element.classList.add("cart-book");
        div_element.appendChild(h_element);
        div_element.appendChild(Book_elements[x]);
        book_elements.push(String(div_element.outerHTML));
    }
    console.log(book_elements);
    sessionStorage.setItem("cartItems", JSON.stringify(book_elements));
    clear();
    let ans = await show(msg, "go to the cart?")
    if (home && ans) {
        open_cart(true);
    } else if (ans) {
        open_cart(false);   
    } else if (home && !ans ) {
        go_home();
    };
};
function go_home () {
    window.location.href = window.location.origin + "/Intro_to_web_dev-touchstone/index.html"
}
function books() {
    window.location.href = window.location.origin + "/Intro_to_web_dev-touchstone/books.html"
}
async function open_cart(home=false) {
    await populate_cart();
    cart_section = document.getElementsByClassName("cart-items")[0];
    cart_section.style.display = "flex";
    if (home) {
        element = document.getElementsByClassName("exit-cart")[0];
        element.removeEventListener("click", exit_cart);
        element.addEventListener("click", go_home);
    };
};
function exit_cart () {
    cart_section = document.getElementsByClassName("cart-items")[0];
    cart_section.style.display = "none";
};
function populate_cart() {
    let element = document.getElementsByClassName("items-in-cart");
    element[0].innerHTML = "";
    if (sessionStorage.getItem("cartItems")) {
        let cart_items_array = JSON.parse(sessionStorage.getItem("cartItems"));
        let cart_items = cart_items_array.join("");
        let parser = new DOMParser();
        if (cart_items) {
            html = parser.parseFromString(cart_items, "text/html");
            element[0].append(...html.body.childNodes);
            console.log(...html.body.childNodes);
        };
        document.getElementsByClassName("default-view")[0].style.display = "none";
    } else {
    document.getElementsByClassName("default-view")[0].style.display = "block";
    };
};
async function clear_cart () {
    show("Cart cleared");
    sessionStorage.removeItem("cartItems");
    await open_cart();
};
function process_order () {
    show("Thank you for your order");
    clear_cart()
};
function clear () {
    let inputs = document.querySelectorAll(".clear");
    let checkbox = document.querySelectorAll(".d-checkbox");
    if (inputs) {
        inputs.forEach(input => {
            input.value = "";
        });
    };
    if (checkbox) {
        checkbox.forEach(box => {
            box.checked = false;
        });
    }

};
function show(text, action) {
    if (action) {
        if (confirm(text + ". Do you want to " + action)){
        return true;
        };
    } else {    
        alert(text);
    };
};
function display(id) {
    let elements;
    elements = (document.getElementsByClassName(`${id}`));
    for (let x = 0; x < elements.length; x++) {
        const element = elements[x];
        console.log("display")
        if (element.className.includes("inline")) {
            element.style.display = "none";
            element.classList.remove("inline");
            element.classList.add("none");
        }else if (element.className.includes("none")) {
            element.style.display = "inline";
            element.classList.remove("none");
            element.classList.add("inline");
        };
    }
};

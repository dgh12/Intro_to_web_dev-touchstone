function Subscribe () {
    event.preventDefault();
    let email = event.target.email.value;
    alert ("user " + email + " is subscribed");
    clear();
};
function contact_message () {
    event.preventDefault();
    alert("Thank you for your message.");
    clear();
};
function Book_submission (bookname) {
    let Book_elements = [];
    if (!bookname) {
        event.preventDefault();
        let books = document.querySelectorAll('input[name="book"]');
        let Books = [];
        let element1 = "";
        let element = "";
        books.forEach(checkbox => {
            if (checkbox.checked) {
                Books.push(checkbox.value);
                element = document.querySelector("label[for=\"" + checkbox.id + "\"]");
                Book_elements.push(element.children[0]);
            };    
        });
        let book_str = "";
        book_length = Books.length;
        if (book_length == 0) {
            alert("No new items added to the cart")
        } else if (book_length == 1) {
            book_str = String(Books[0])
            alert ("The item " + book_str + " was added to the cart");
        } else if (book_length == 2) {    
            book_str += Books[0] + " and " + Books[1];
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
        Book_elements.forEach(book_element => {
            let element = document.createElement("div");
            element.classList.add("cart-book");
            element.appendChild(book_element);
        });
        };
        alert ("The items" + book_str + " were added to the cart");
    } else {
        alert("The item " + bookname + " was added to the cart.")
    }
    clear();
    open_cart(Book_elements);
};
function clear_cart () {
    alert("Cart cleared");
};
function process_order () {
    alert("Thank you for your order");
};
function clear() {
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

}

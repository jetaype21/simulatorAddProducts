class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById("product-list");
        const element = document.createElement("div");
        element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <p><b>Product Name:</b> ${product.name}</p>
                <p><b>Product Price:</b> ${product.price}</p>
                <p><b>Product Year:</b> ${product.year}</p>
                </div>
                <button class="btn btn-danger w-100" name="delete">Delete product</button>
        </div>`;

        productList.appendChild(element);
        this.resetForm();
    }

    resetForm() {
        document.getElementById("product-form").reset();
    }

    deleteProduct(element) {
        if (element.name === "delete") {
            element.parentNode.parentElement.remove();
            this.sendMessage("Product delete successfull", "warning");
        }
    }

    sendMessage(message, cssBg) {
        /* const msgHtml = `
        <div class="alert alert-${cssBg}">${message}</div>
        `; */

        const div = document.createElement('div')
        div.className = `alert alert-${cssBg} mt-4`
        //const app = document.querySelector("#app");
        div.appendChild(document.createTextNode(message))

        const container = document.querySelector('.container')
        const app = document.getElementById('app')
        container.insertBefore(div, app)

        setTimeout(()=> {
            document.querySelector('.alert').remove()
        }, 2000)
    }
}

//DOM Events
document.getElementById("product-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;

    const product = new Product(name, price, year);

    const ui = new UI();
    ui.addProduct(product);
    ui.sendMessage("Product add successfull", "info");
});

document.getElementById("product-list").addEventListener("click", (e) => {
    const ui = new UI();
    ui.deleteProduct(e.target);
});

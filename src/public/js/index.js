const socket = io();

// 
const form = document.querySelector('#form');
const cards = document.querySelector('#cards');

socket.on('products', products => {

    cards.innerHTML = ``;

    products = products.forEach(prod => {
            const div = document.createElement('div');
            div.classList = 'products';
            div.innerHTML += `
            <div class="product">
            <img src="${prod.img}" alt="Product image" class="product-image">
            <div class="product-details">
              <h2 class="product-title">${prod.title}</h2>
              <p class="product-description">${prod.description}</p>
              <ul class="product-info">
                <li><strong>Código:</strong> ${prod.code}</li>
                <li><strong>Precio:</strong> ${prod.price}</li>
                <li><strong>Stock:</strong> ${prod.stock}</li>
                <li><strong>ID:</strong> ${prod.id}</li>
              </ul>
              <button class="eliminar" id=${prod.id}>Eliminar</button>
            </div>
          </div>
          
            `;
            cards.appendChild(div);
    });
});


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const product = Object.fromEntries(new FormData(e.target));
    product.thumbnails = [];
    socket.emit("post", product);
});

cards.addEventListener("click", (e) => {
    socket.emit("delete", e.target.id);
});


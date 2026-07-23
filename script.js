// Número telefónico para recibir pedidos (Sustituir con el número real de tu tienda con código de país)
const TELEFONO_WHATSAPP = "1234567890"; 

const productos = [
  {
    id: 1,
    nombre: "PlayStation 5",
    categoria: "Consola de sobremesa",
    precioNum: 499.99,
    precio: "$499.99",
    descripcion: "Consola de última generación con SSD NVMe de alta velocidad, gráficos 4K y respuesta háptica revolucionaria.",
    especificaciones: ["Almacenamiento: 825 GB SSD", "Soporte 4K a 120 FPS", "Lector Blu-Ray Ultra HD"],
    imagen: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6523/6523167_bd.jpg"
  },
  {
    id: 2,
    nombre: "Xbox Series X",
    categoria: "Consola de sobremesa",
    precioNum: 499.99,
    precio: "$499.99",
    descripcion: "La consola de Microsoft más veloz y potente de la historia con 12 teraflops de potencia de procesamiento gráfico.",
    especificaciones: ["Almacenamiento: 1 TB NVMe SSD", "Arquitectura Xbox Velocity", "Quick Resume"],
    imagen: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&q=80"
  },
  {
    id: 3,
    nombre: "Nintendo Switch OLED",
    categoria: "Consola Portátil",
    precioNum: 349.99,
    precio: "$349.99",
    descripcion: "Disfruta de colores intensos y contraste alto en la pantalla OLED de 7 pulgadas donde sea que juegues.",
    especificaciones: ["Pantalla: OLED de 7 pulgadas", "Almacenamiento interno: 64 GB", "Puerto LAN por cable"],
    imagen: "https://tse4.mm.bing.net/th/id/OIP.0008Xn9YY058Uz4QvVpJVAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 4,
    nombre: "Mando DualSense PS5",
    categoria: "Accesorios",
    precioNum: 69.99,
    precio: "$69.99",
    descripcion: "Mando inalámbrico con retroalimentación háptica y gatillos adaptativos dinámicos.",
    especificaciones: ["Micrófono integrado", "Batería USB-C", "Sensor de movimiento 6 ejes"],
    imagen: "https://youget.pt/153888-large_default/mando-inalambrico-sony-dualsense-ps5-purpura-galactico.jpg"
  },
  {
    id: 5,
    nombre: "Headset Gamer Wireless",
    categoria: "Audio",
    precioNum: 89.99,
    precio: "$89.99",
    descripcion: "Audífonos inalámbricos optimizados para audio 3D en consolas y PC con cancelación activa de ruido.",
    especificaciones: ["Conexión inalámbrica 2.4GHz", "Batería: hasta 12h", "Cancelación de ruido"],
    imagen: "https://dlcdnwebimgs.asus.com/files/media/47bb7328-6b1a-4e87-b1e4-f89966cbf275/v1/img/gallery/3.jpg"
  },
  {
    id: 6,
    nombre: "Base de Carga Doble",
    categoria: "Accesorios",
    precioNum: 29.99,
    precio: "$29.99",
    descripcion: "Estación de carga acoplable para cargar hasta dos controles al mismo tiempo sin cables estorbosos.",
    especificaciones: ["Carga rápida (< 3 horas)", "Protección sobrecarga", "Indicadores LED"],
    imagen: "https://oportunidades-vip.com.ar/wp-content/uploads/2026/04/Base_Doble_De_Apoyo_Y_Carga_Para_Joysticks_Ps5_Controles_Gp5_D_935898-MLA96085080522_102025-O-1200x1200.webp"
  }
];

let carrito = [];

// Cargar catálogo de productos
function cargarProductos() {
  const container = document.getElementById('productGrid');
  container.innerHTML = '';

  productos.forEach(producto => {
    const cardHTML = `
      <div class="card" onclick="abrirModal(${producto.id})" style="cursor: pointer;">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="card-body">
          <h3 class="card-title">${producto.nombre}</h3>
          <p class="card-desc">${producto.descripcion}</p>
          <div class="card-footer">
            <span class="price">${producto.precio}</span>
            <button class="btn-buy" onclick="event.stopPropagation(); agregarAlCarrito(${producto.id})">+ Agregar</button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

// Lógica de Carrito de Compras
function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  const itemEnCarrito = carrito.find(item => item.id === idProducto);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarritoUI();
  toggleDrawer(true);
}

function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter(item => item.id !== idProducto);
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');

  cartItems.innerHTML = '';
  let total = 0;
  let totalCount = 0;

  if (carrito.length === 0) {
    cartItems.innerHTML = '<p style="text-align:center; color: var(--color-text-muted); margin-top:2rem;">El carrito está vacío</p>';
  } else {
    carrito.forEach(item => {
      total += item.precioNum * item.cantidad;
      totalCount += item.cantidad;

      cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${item.imagen}" alt="${item.nombre}">
          <div class="cart-item-details">
            <h4>${item.nombre}</h4>
            <p>${item.cantidad} x $${item.precioNum.toFixed(2)}</p>
          </div>
          <button class="remove-item" onclick="eliminarDelCarrito(${item.id})">&times;</button>
        </div>
      `;
    });
  }

  cartCount.textContent = totalCount;
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function toggleDrawer(open) {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (open) {
    drawer.classList.add('open');
    overlay.classList.add('active');
  } else {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
  }
}

// Lógica de Modal de Detalles
function abrirModal(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;

  document.getElementById('modalImg').src = producto.imagen;
  document.getElementById('modalTitle').textContent = producto.nombre;
  document.getElementById('modalCategory').textContent = producto.categoria;
  document.getElementById('modalDesc').textContent = producto.descripcion;
  document.getElementById('modalPrice').textContent = producto.precio;

  const specsContainer = document.getElementById('modalSpecs');
  specsContainer.innerHTML = '';
  producto.especificaciones.forEach(spec => {
    const li = document.createElement('li');
    li.textContent = spec;
    specsContainer.appendChild(li);
  });

  document.getElementById('modalBuyBtn').onclick = () => {
    agregarAlCarrito(producto.id);
    document.getElementById('productModal').style.display = 'none';
  };

  document.getElementById('productModal').style.display = 'flex';
}

// Procesar compra y generar Ticket
function procesarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  toggleDrawer(false);

  // Llenar Ticket
  const ticketProducts = document.getElementById('ticketProducts');
  ticketProducts.innerHTML = '';
  let total = 0;
  let mensajeWhatsApp = "🎮 *NUEVO PEDIDO - ReStart Consoles*\n\n";

  carrito.forEach(item => {
    const subtotal = item.precioNum * item.cantidad;
    total += subtotal;

    ticketProducts.innerHTML += `
  <div class="receipt-row">
    <span class="item-name">${item.cantidad}x ${item.nombre}</span>
    <span>$${subtotal.toFixed(2)}</span>
  </div>
`;

    mensajeWhatsApp += `• ${item.cantidad}x ${item.nombre} - $${subtotal.toFixed(2)}\n`;
  });

  const fecha = new Date().toLocaleDateString();
  document.getElementById('ticketDate').textContent = fecha;
  document.getElementById('ticketTotalAmount').textContent = `$${total.toFixed(2)}`;

  mensajeWhatsApp += `\n*TOTAL: $${total.toFixed(2)}*\n\n¡Hola! Me gustaría concretar el pago de este pedido.`;

  // Configurar enlace de WhatsApp
  const urlWhatsApp = `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensajeWhatsApp)}`;
  document.getElementById('whatsappBtn').onclick = () => {
    window.open(urlWhatsApp, '_blank');
  };

  // Mostrar modal de Ticket y vaciar carrito local
  document.getElementById('ticketModal').style.display = 'flex';
  carrito = [];
  actualizarCarritoUI();
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();

  // Listeners Carrito
  document.getElementById('cartBtn').onclick = () => toggleDrawer(true);
  document.getElementById('closeCart').onclick = () => toggleDrawer(false);
  document.getElementById('cartOverlay').onclick = () => toggleDrawer(false);
  document.getElementById('checkoutBtn').onclick = procesarCompra;

  // Listeners Modales
  document.getElementById('closeModal').onclick = () => {
    document.getElementById('productModal').style.display = 'none';
  };
  document.getElementById('closeTicketModal').onclick = () => {
    document.getElementById('ticketModal').style.display = 'none';
  };
});

// ==========================================
// LÓGICA DEL CARRUSEL AUTOMÁTICO
// ==========================================
let slideIndex = 0;
let carouselTimer;

function showSlides(n) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');

  if (slides.length === 0) return;

  if (n >= slides.length) { slideIndex = 0; }
  if (n < 0) { slideIndex = slides.length - 1; }

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

function nextSlide() {
  slideIndex++;
  showSlides(slideIndex);
  resetCarouselTimer();
}

function prevSlide() {
  slideIndex--;
  showSlides(slideIndex);
  resetCarouselTimer();
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
  resetCarouselTimer();
}

function resetCarouselTimer() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000); // Cambia automáticamente cada 5 segundos
}

// Inicializar el carrusel en el evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  showSlides(slideIndex);
  resetCarouselTimer();

  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
  }
});
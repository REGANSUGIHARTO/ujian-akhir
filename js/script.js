// Data produk
const productsData = [
    {
        id: 1,
        name: "Cervelo S5",
        category: "sepeda",
        price: 85000000,
        oldPrice: 95000000,
        image: "image/products/1.jfif",
        description: "Sepeda balap aerodinamis dengan teknologi terkini. Frame carbon yang ringan namun kokoh, desain untuk kecepatan maksimal. Cocok untuk balap dan endurance riding.",
        specs: [
            "Material: Carbon Frame",
            "Groupset: Shimano Dura-Ace Di2",
            "Wheelset: Reserve 52/63",
            "Weight: 7.2 kg",
            "Size: 48, 51, 54, 56, 58, 61"
        ],
        rating: 4.8,
        stars: 5
    },
    {
        id: 2,
        name: "Trek Madone SLR 9",
        category: "sepeda",
        price: 75000000,
        oldPrice: 85000000,
        image: "image/products/1.2.webp",
        description: "Sepeda balap dengan teknologi IsoSpeed untuk kenyamanan ekstra. Desain aerodinamis yang memecah angin dengan sempurna.",
        specs: [
            "Material: 800 Series OCLV Carbon",
            "Groupset: SRAM Red eTap AXS",
            "Wheelset: Bontrager Aeolus RSL 75",
            "Weight: 7.5 kg",
            "Size: 50, 52, 54, 56, 58, 60"
        ],
        rating: 4.2,
        stars: 4
    },
    {
        id: 3,
        name: "Cafox Carbon Frame",
        category: "frame",
        price: 15000000,
        oldPrice: 18000000,
        image: "image/products/2.1.jfif",
        description: "Frame carbon berkualitas tinggi dengan geometri agresif untuk performa maksimal. Cocok untuk balap dan training.",
        specs: [
            "Material: Toray T800 Carbon",
            "BB Standard: BB86",
            "Headset: Integrated 1-1/8\" - 1-1/4\"",
            "Weight: 980g (Size 54)",
            "Warranty: 5 Years"
        ],
        rating: 4.9,
        stars: 5
    },
    {
        id: 4,
        name: "Elves Carbon Frame",
        category: "frame",
        price: 12000000,
        oldPrice: 15000000,
        image: "image/products/2.2.webp",
        description: "Frame carbon dengan teknologi internal routing dan desain yang elegan. Ringan dan responsif.",
        specs: [
            "Material: Toray T700 Carbon",
            "BB Standard: BB86",
            "Headset: Integrated",
            "Weight: 1050g (Size 54)",
            "Warranty: 3 Years"
        ],
        rating: 4.0,
        stars: 4
    },
    {
        id: 5,
        name: "Shimano Dura-Ace",
        category: "part",
        price: 25000000,
        oldPrice: 28000000,
        image: "image/products/3.1.webp",
        description: "Groupset elektronik terbaru dengan shifting yang presisi dan responsif. Teknologi Di2 untuk performa maksimal.",
        specs: [
            "Type: Electronic Groupset",
            "Speeds: 12-speed",
            "Brake Type: Hydraulic Disc",
            "Crankset: 52/36T",
            "Cassette: 11-30T"
        ],
        rating: 4.7,
        stars: 5
    },
    {
        id: 6,
        name: "SRAM Red eTap",
        category: "part",
        price: 22000000,
        oldPrice: 25000000,
        image: "image/products/3.2.webp",
        description: "Groupset wireless dengan teknologi AXS. Shifting yang smooth dan reliable tanpa kabel.",
        specs: [
            "Type: Wireless Electronic",
            "Speeds: 12-speed",
            "Brake Type: Hydraulic Disc",
            "Crankset: 50/37T",
            "Cassette: 10-28T"
        ],
        rating: 4.3,
        stars: 4
    },
    {
        id: 7,
        name: "Zipp 808 Firecrest",
        category: "wheels",
        price: 35000000,
        oldPrice: 40000000,
        image: "image/products/4.1.webp",
        description: "Wheelset carbon deep section untuk aerodinamika maksimal. Cocok untuk time trial dan triathlon.",
        specs: [
            "Material: Carbon Fiber",
            "Depth: 80mm",
            "Rim Width: 27mm",
            "Weight: 1550g (pair)",
            "Hubs: Zipp Cognition"
        ],
        rating: 4.8,
        stars: 5
    },
    {
        id: 8,
        name: "Mavic Cosmic Pro",
        category: "wheels",
        price: 18000000,
        oldPrice: 22000000,
        image: "image/products/4.2.webp",
        description: "Wheelset alloy-carbon dengan performa tinggi. Keseimbangan sempurna antara berat dan kekuatan.",
        specs: [
            "Material: Alloy-Carbon Composite",
            "Depth: 45mm",
            "Rim Width: 25mm",
            "Weight: 1650g (pair)",
            "Hubs: Mavic Speed Release"
        ],
        rating: 4.1,
        stars: 4
    }
];

// State aplikasi
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let searchResults = [];
let selectedPaymentMethod = null;

// Format harga ke IDR
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
document.querySelector('#hamburger-menu').onclick = (e) => {
    navbarNav.classList.toggle('active');
    e.preventDefault();
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const searchResultsContainer = document.querySelector('.search-results');

document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    if (searchForm.classList.contains('active')) {
        searchBox.focus();
    }
    e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    if (shoppingCart.classList.contains('active')) {
        updateCartDisplay();
    }
    e.preventDefault();
};

// Klik di luar elemen untuk menutup
document.addEventListener('click', function(e) {
    const hm = document.querySelector('#hamburger-menu');
    const sb = document.querySelector('#search-button');
    const sc = document.querySelector('#shopping-cart-button');
    const ab = document.querySelector('#auth-button');

    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
        searchResultsContainer.innerHTML = '';
    }

    if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});

// Search functionality
searchBox.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    searchResultsContainer.innerHTML = '';

    if (query.length < 2) return;

    searchResults = productsData.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    if (searchResults.length === 0) {
        searchResultsContainer.innerHTML = '<div class="search-result-item">Produk tidak ditemukan</div>';
        return;
    }

    searchResults.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <div class="search-price">${formatPrice(product.price)}</div>
            </div>
        `;
        
        resultItem.addEventListener('click', function() {
            // Scroll ke produk
            const productElement = document.querySelector(`[data-id="${product.id}"]`);
            
            if (productElement) {
                // Close search
                searchForm.classList.remove('active');
                searchBox.value = '';
                searchResultsContainer.innerHTML = '';
                
                // Scroll ke produk
                window.scrollTo({
                    top: productElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Highlight produk
                productElement.style.boxShadow = '0 0 0 3px var(--primary)';
                setTimeout(() => {
                    productElement.style.boxShadow = '';
                }, 2000);
            }
        });
        
        searchResultsContainer.appendChild(resultItem);
    });
});

// Authentication Modal
const authModal = document.getElementById('auth-modal');
const authButton = document.getElementById('auth-button');
const closeAuth = document.getElementById('close-auth');
const goToRegister = document.getElementById('go-to-register');
const goToLogin = document.getElementById('go-to-login');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const tabButtons = document.querySelectorAll('.tab-btn');

// Open auth modal
authButton.addEventListener('click', function(e) {
    e.preventDefault();
    authModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// Close auth modal
closeAuth.addEventListener('click', function(e) {
    e.preventDefault();
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Switch between login and register tabs
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const tab = this.dataset.tab;
        
        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Show active form
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        
        if (tab === 'login') {
            loginForm.classList.add('active');
        } else {
            registerForm.classList.add('active');
        }
    });
});

// Go to register
goToRegister.addEventListener('click', function(e) {
    e.preventDefault();
    tabButtons[0].classList.remove('active');
    tabButtons[1].classList.add('active');
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

// Go to login
goToLogin.addEventListener('click', function(e) {
    e.preventDefault();
    tabButtons[1].classList.remove('active');
    tabButtons[0].classList.add('active');
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simple validation
    if (!email || !password) {
        showNotification('Mohon isi semua field');
        return;
    }
    
    // Simulate login (in real app, this would be API call)
    currentUser = {
        email: email,
        name: email.split('@')[0],
        loggedIn: true
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update UI
    authButton.innerHTML = '<i data-feather="user-check"></i>';
    feather.replace();
    
    // Close modal
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    showNotification('Login berhasil! Selamat datang kembali.');
});

// Register form submission
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Mohon isi semua field yang wajib', 'warning');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Password dan konfirmasi password tidak cocok', 'warning');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password minimal 6 karakter', 'warning');
        return;
    }
    
    // Simulate registration (in real app, this would be API call)
    currentUser = {
        name: name,
        email: email,
        phone: phone,
        loggedIn: true
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update UI
    authButton.innerHTML = '<i data-feather="user-check"></i>';
    feather.replace();
    
    // Switch to login tab
    tabButtons[1].classList.remove('active');
    tabButtons[0].classList.add('active');
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
    
    // Clear form
    registerForm.reset();
    
    showNotification('Pendaftaran berhasil! Silakan login.');
});

// Add to cart functionality
document.addEventListener('click', function(e) {
    // Add to cart from product card
    if (e.target.closest('.add-to-cart')) {
        e.preventDefault();
        
        if (!currentUser || !currentUser.loggedIn) {
            showNotification('Silakan login terlebih dahulu untuk menambahkan ke keranjang', 'warning');
            authModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            return;
        }
        
        const productCard = e.target.closest('.product-card');
        const productId = parseInt(productCard.dataset.id);
        addToCart(productId);
    }
    
    // Add to cart from modal
    if (e.target.closest('.add-to-cart-modal')) {
        e.preventDefault();
        
        if (!currentUser || !currentUser.loggedIn) {
            showNotification('Silakan login terlebih dahulu untuk menambahkan ke keranjang', 'warning');
            authModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            return;
        }
        
        const productId = parseInt(e.target.closest('.add-to-cart-modal').dataset.id);
        addToCart(productId);
        
        // Close modal
        const modal = e.target.closest('.modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Remove from cart
    if (e.target.closest('.remove-item')) {
        e.preventDefault();
        const cartItem = e.target.closest('.cart-item');
        const productId = parseInt(cartItem.dataset.id);
        removeFromCart(productId);
    }
    
    // Decrease quantity
    if (e.target.closest('.decrease-quantity')) {
        e.preventDefault();
        const cartItem = e.target.closest('.cart-item');
        const productId = parseInt(cartItem.dataset.id);
        updateQuantity(productId, -1);
    }
    
    // Increase quantity
    if (e.target.closest('.increase-quantity')) {
        e.preventDefault();
        const cartItem = e.target.closest('.cart-item');
        const productId = parseInt(cartItem.dataset.id);
        updateQuantity(productId, 1);
    }
    
    // View product details
    if (e.target.closest('.item-detail-button')) {
        e.preventDefault();
        const productId = e.target.closest('.item-detail-button').dataset.id;
        showProductModal(productId);
    }
});

function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    
    if (!product) return;
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    
    // Show notification
    showNotification(`"${product.name}" ditambahkan ke keranjang`, 'success');
}

function removeFromCart(productId) {
    const product = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
    
    if (product) {
        showNotification(`"${product.name}" dihapus dari keranjang`, 'info');
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity < 1) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Keranjang belanja kosong</p><p class="empty-cart-text">Tambahkan produk untuk memulai belanja</p></div>';
        cartTotalPrice.textContent = formatPrice(0);
        return;
    }
    
    let total = 0;
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.dataset.id = item.id;
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-detail">
                <h4>${item.name}</h4>
                <div class="item-price">${formatPrice(item.price)}</div>
                <div class="item-quantity">
                    <button class="quantity-btn decrease-quantity">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase-quantity">+</button>
                </div>
            </div>
            <i data-feather="trash-2" class="remove-item"></i>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotalPrice.textContent = formatPrice(total);
    feather.replace();
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Set color based on type
    if (type === 'warning') {
        notification.style.background = 'var(--warning)';
        notification.style.color = '#000';
    } else if (type === 'info') {
        notification.style.background = 'var(--secondary)';
    } else {
        notification.style.background = 'var(--primary)';
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Product modals
function showProductModal(productId) {
    const product = productsData.find(p => p.id === parseInt(productId));
    if (!product) return;
    
    // Create modal if it doesn't exist
    let modal = document.getElementById(`product-modal-${productId}`);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal product-modal';
        modal.id = `product-modal-${productId}`;
        modal.innerHTML = `
            <div class="modal-container">
                <a href="#" class="close-icon"><i data-feather="x"></i></a>
                <div class="modal-content">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-content">
                        <h3>${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-specs">
                            <h4>Spesifikasi:</h4>
                            <ul>
                                ${product.specs.map(spec => `<li>${spec}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="product-stars">
                            ${Array.from({length: 5}, (_, i) => 
                                `<i data-feather="star" class="${i < product.stars ? 'star-full' : ''}"></i>`
                            ).join('')}
                            <span class="rating-text">(${product.rating}/5)</span>
                        </div>
                        <div class="product-price">
                            <div class="current-price">${formatPrice(product.price)}</div>
                            <div class="old-price">${formatPrice(product.oldPrice)}</div>
                        </div>
                        <a href="#" class="btn add-to-cart-modal" data-id="${product.id}">
                            <i data-feather="shopping-cart"></i><span>Tambahkan ke Keranjang</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    feather.replace();
    
    // Close modal when clicking X or outside
    const closeBtn = modal.querySelector('.close-icon');
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close all modals when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ===== BAGIAN PEMBAYARAN YANG DIPERBAIKI =====

// Payment modal elements
const paymentModal = document.getElementById('payment-modal');
const closePayment = document.getElementById('close-payment');
const paymentMethods = document.querySelectorAll('.payment-method');
const processPaymentBtn = document.getElementById('process-payment');

// Checkout functionality
document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        showNotification('Keranjang belanja kosong', 'warning');
        return;
    }
    
    if (!currentUser || !currentUser.loggedIn) {
        showNotification('Silakan login terlebih dahulu untuk checkout', 'warning');
        authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        return;
    }
    
    // Close cart
    shoppingCart.classList.remove('active');
    
    // Show payment modal
    paymentModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Reset form
    resetPaymentForm();
    
    // Update order summary
    updatePaymentSummary();
});

// Reset payment form
function resetPaymentForm() {
    selectedPaymentMethod = null;
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-phone').value = '';
    document.getElementById('customer-address').value = '';
    document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
    document.getElementById('payment-details').innerHTML = '';
    document.getElementById('payment-details').classList.remove('active');
    
    // If user is logged in, pre-fill with user data
    if (currentUser && currentUser.loggedIn) {
        if (currentUser.name) {
            document.getElementById('customer-name').value = currentUser.name;
        }
        if (currentUser.phone) {
            document.getElementById('customer-phone').value = currentUser.phone;
        }
    }
}

// Update payment summary
function updatePaymentSummary() {
    const summaryContainer = document.getElementById('payment-summary');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    // Clear summary
    summaryContainer.innerHTML = '';
    
    // Add items
    cart.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-qty">${item.quantity}x</div>
            <div class="item-price">${formatPrice(item.price * item.quantity)}</div>
        `;
        summaryContainer.appendChild(summaryItem);
    });
    
    // Update totals
    document.getElementById('summary-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('summary-tax').textContent = formatPrice(tax);
    document.getElementById('summary-total').textContent = formatPrice(total);
}

// Payment method selection
paymentMethods.forEach(method => {
    method.addEventListener('click', function() {
        // Update selected method
        paymentMethods.forEach(m => m.classList.remove('active'));
        this.classList.add('active');
        selectedPaymentMethod = this.dataset.method;
        
        // Show payment details based on method
        showPaymentDetails(selectedPaymentMethod);
    });
});

// Show payment details based on selected method
function showPaymentDetails(method) {
    const detailsContainer = document.getElementById('payment-details');
    detailsContainer.innerHTML = '';
    detailsContainer.classList.remove('active');
    
    if (!method) return;
    
    let detailsHTML = '';
    
    switch(method) {
        case 'bank-transfer':
            detailsHTML = `
                <h5>Instruksi Transfer Bank</h5>
                <div class="bank-details">
                    <p><strong>Bank:</strong> BCA (Bank Central Asia)</p>
                    <p><strong>Nomor Rekening:</strong> 1234 5678 9012</p>
                    <p><strong>Atas Nama:</strong> HomeBike Store</p>
                    <p class="note">Lakukan transfer sesuai total yang tertera. Upload bukti transfer setelah pembayaran.</p>
                </div>
            `;
            break;
            
        case 'gopay':
            detailsHTML = `
                <h5>Instruksi GoPay</h5>
                <div class="gopay-details">
                    <p>1. Buka aplikasi Gojek</p>
                    <p>2. Pilih GoPay</p>
                    <p>3. Scan QR code di bawah:</p>
                    <div class="qr-placeholder">
                        <p>[QR Code akan ditampilkan setelah konfirmasi]</p>
                    </div>
                    <p>4. Konfirmasi pembayaran</p>
                </div>
            `;
            break;
            
        case 'ovo':
            detailsHTML = `
                <h5>Instruksi OVO</h5>
                <div class="ovo-details">
                    <p>1. Buka aplikasi OVO</p>
                    <p>2. Pilih Transfer</p>
                    <p>3. Masukkan nomor: <strong>0812 3456 7890</strong></p>
                    <p>4. Masukkan nominal sesuai total</p>
                    <p>5. Konfirmasi pembayaran</p>
                </div>
            `;
            break;
            
        case 'credit-card':
            detailsHTML = `
                <h5>Detail Kartu Kredit</h5>
                <div class="credit-card-form">
                    <div class="input-group">
                        <i data-feather="credit-card"></i>
                        <input type="text" id="card-number" placeholder="Nomor Kartu" required>
                    </div>
                    <div class="input-group-row">
                        <div class="input-group">
                            <i data-feather="calendar"></i>
                            <input type="text" id="card-expiry" placeholder="MM/YY" required>
                        </div>
                        <div class="input-group">
                            <i data-feather="lock"></i>
                            <input type="text" id="card-cvv" placeholder="CVV" required>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    detailsContainer.innerHTML = detailsHTML;
    detailsContainer.classList.add('active');
    feather.replace();
}

// Process payment
processPaymentBtn.addEventListener('click', function() {
    // Validate customer information
    const customerName = document.getElementById('customer-name').value.trim();
    const customerPhone = document.getElementById('customer-phone').value.trim();
    const customerAddress = document.getElementById('customer-address').value.trim();
    
    if (!customerName || !customerPhone || !customerAddress) {
        showNotification('Mohon lengkapi semua data pelanggan', 'warning');
        return;
    }
    
    // Validate phone number
    const phoneRegex = /^[0-9+\-\s]+$/;
    if (!phoneRegex.test(customerPhone) || customerPhone.replace(/\D/g, '').length < 10) {
        showNotification('Format nomor telepon tidak valid', 'warning');
        return;
    }
    
    if (!selectedPaymentMethod) {
        showNotification('Pilih metode pembayaran terlebih dahulu', 'warning');
        return;
    }
    
    // Validate payment method specific details
    if (selectedPaymentMethod === 'credit-card') {
        const cardNumber = document.getElementById('card-number')?.value?.trim() || '';
        const cardExpiry = document.getElementById('card-expiry')?.value?.trim() || '';
        const cardCvv = document.getElementById('card-cvv')?.value?.trim() || '';
        
        if (!cardNumber || !cardExpiry || !cardCvv) {
            showNotification('Mohon lengkapi detail kartu kredit', 'warning');
            return;
        }
        
        // Simple card validation
        if (cardNumber.replace(/\s/g, '').length !== 16) {
            showNotification('Nomor kartu harus 16 digit', 'warning');
            return;
        }
        
        // Validate expiry date
        const [month, year] = cardExpiry.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        if (!month || !year || month < 1 || month > 12 || 
            year < currentYear || (year == currentYear && month < currentMonth)) {
            showNotification('Tanggal kadaluarsa tidak valid', 'warning');
            return;
        }
        
        // Validate CVV
        if (cardCvv.length < 3 || cardCvv.length > 4) {
            showNotification('CVV harus 3-4 digit', 'warning');
            return;
        }
    }
    
    // Simulate payment processing
    const processBtn = document.getElementById('process-payment');
    const originalText = processBtn.innerHTML;
    processBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses Pembayaran...';
    processBtn.disabled = true;
    
    // Store customer data
    const customerData = {
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
        paymentMethod: selectedPaymentMethod
    };
    
    setTimeout(() => {
        // Close payment modal
        paymentModal.style.display = 'none';
        
        // Show receipt with customer data
        showReceipt(customerData);
        
        // Reset button
        processBtn.innerHTML = originalText;
        processBtn.disabled = false;
        
        // Clear form
        resetPaymentForm();
    }, 2000);
});

// Close payment modal
closePayment.addEventListener('click', function(e) {
    e.preventDefault();
    paymentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Receipt functionality
const receiptModal = document.getElementById('receipt-modal');
const closeReceipt = document.getElementById('close-receipt');
const closeReceiptBtn = document.getElementById('close-receipt-btn');
const printReceiptBtn = document.getElementById('print-receipt');

// Helper function to get payment method name
function getPaymentMethodName(method) {
    const methods = {
        'bank-transfer': 'Transfer Bank',
        'gopay': 'GoPay',
        'ovo': 'OVO',
        'credit-card': 'Kartu Kredit'
    };
    return methods[method] || method;
}

// Receipt functionality - Updated to include customer data
function showReceipt(customerData) {
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    // Update receipt date and number
    const now = new Date();
    document.getElementById('receipt-date').textContent = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Generate transaction number
    const transNum = `TRX-${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}-${Math.floor(Math.random() * 10000).toString().padStart(4,'0')}`;
    document.getElementById('receipt-number').textContent = transNum;
    
    // Update customer information in receipt
    if (customerData) {
        document.getElementById('receipt-customer-name').textContent = customerData.name;
        document.getElementById('receipt-customer-phone').textContent = customerData.phone;
        document.getElementById('receipt-customer-address').textContent = customerData.address;
        document.getElementById('receipt-payment-method').textContent = getPaymentMethodName(customerData.paymentMethod);
    }
    
    // Update receipt items
    const receiptItems = document.querySelector('.receipt-items');
    receiptItems.innerHTML = '';
    
    cart.forEach(item => {
        const receiptItem = document.createElement('div');
        receiptItem.className = 'receipt-item';
        receiptItem.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-qty">${item.quantity}x</div>
            <div class="item-price">${formatPrice(item.price * item.quantity)}</div>
        `;
        receiptItems.appendChild(receiptItem);
    });
    
    // Update totals
    document.getElementById('receipt-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('receipt-tax').textContent = formatPrice(tax);
    document.getElementById('receipt-total').textContent = formatPrice(total);
    
    // Show receipt modal
    receiptModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Scroll to top of receipt
    receiptModal.scrollTop = 0;
}

closeReceipt.addEventListener('click', function(e) {
    e.preventDefault();
    closeReceiptModal();
});

closeReceiptBtn.addEventListener('click', function() {
    closeReceiptModal();
});

function closeReceiptModal() {
    receiptModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear cart after successful purchase
    if (cart.length > 0) {
        cart = [];
        updateCartCount();
        updateCartDisplay();
        showNotification('Pembelian berhasil! Terima kasih telah berbelanja di HomeBike.', 'success');
    }
}

printReceiptBtn.addEventListener('click', function() {
    // Create a printable version
    const printContent = document.querySelector('.modal-container').cloneNode(true);
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <html>
            <head>
                <title>Struk Pembelian HomeBike</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        color: #000;
                    }
                    .receipt-header {
                        text-align: center;
                        margin-bottom: 20px;
                        border-bottom: 2px solid #8c00b3;
                        padding-bottom: 10px;
                    }
                    .receipt-header h3 {
                        color: #8c00b3;
                        margin-bottom: 10px;
                    }
                    .receipt-items {
                        margin: 20px 0;
                    }
                    .receipt-item {
                        display: flex;
                        justify-content: space-between;
                        padding: 5px 0;
                        border-bottom: 1px dashed #ccc;
                    }
                    .receipt-total {
                        background: #f5f5f5;
                        padding: 15px;
                        border-radius: 5px;
                        margin: 20px 0;
                    }
                    .total-row {
                        display: flex;
                        justify-content: space-between;
                        margin: 5px 0;
                    }
                    .grand-total {
                        font-weight: bold;
                        font-size: 1.2em;
                        color: #8c00b3;
                        border-top: 2px solid #ccc;
                        padding-top: 10px;
                        margin-top: 10px;
                    }
                    .receipt-footer {
                        text-align: center;
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 2px solid #ccc;
                        font-size: 0.9em;
                        color: #666;
                    }
                    @media print {
                        body {
                            margin: 0;
                            padding: 10px;
                        }
                    }
                </style>
            </head>
            <body>
                ${printContent.innerHTML}
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
});

// Contact form
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;
    const message = document.getElementById('contact-message').value;
    
    if (!name || !email || !phone || !message) {
        showNotification('Mohon isi semua field', 'warning');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Format email tidak valid', 'warning');
        return;
    }
    
    // Validate phone number (simple validation)
    const phoneRegex = /^[0-9+\-\s]+$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
        showNotification('Format nomor telepon tidak valid', 'warning');
        return;
    }
    
    // Simulate sending message
    showNotification('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
    this.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Replace feather icons
    feather.replace();
    
    // Update cart count on load
    updateCartCount();
    
    // Update auth button if user is logged in
    if (currentUser && currentUser.loggedIn) {
        authButton.innerHTML = '<i data-feather="user-check"></i>';
        feather.replace();
    }
    
    // Update product cards with proper prices and stars
    document.querySelectorAll('.product-card').forEach(card => {
        const productId = parseInt(card.dataset.id);
        const product = productsData.find(p => p.id === productId);
        
        if (product) {
            // Update stars
            const starsContainer = card.querySelector('.product-stars');
            if (starsContainer) {
                starsContainer.innerHTML = Array.from({length: 5}, (_, i) => 
                    `<i data-feather="star" class="${i < product.stars ? 'star-full' : ''}"></i>`
                ).join('');
            }
            
            // Update price with proper structure
            const priceContainer = card.querySelector('.product-price');
            if (priceContainer) {
                priceContainer.innerHTML = `
                    <div class="current-price">${formatPrice(product.price)}</div>
                    <div class="old-price">${formatPrice(product.oldPrice)}</div>
                `;
            }
        }
    });
    
    // Replace feather icons again after dynamic content
    feather.replace();
    
    // Add CSS for empty cart
    const style = document.createElement('style');
    style.textContent = `
        .empty-cart {
            text-align: center;
            padding: 2rem;
            color: #666;
        }
        
        .empty-cart-text {
            font-size: 1rem;
            margin-top: 0.5rem;
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
});

// Buy Now button
document.querySelector('.hero .cta').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: document.getElementById('products').offsetTop - 100,
        behavior: 'smooth'
    });
});

// Update product icons on mobile to always be visible
function updateProductIconsForMobile() {
    if (window.innerWidth <= 450) {
        document.querySelectorAll('.product-icons').forEach(icons => {
            icons.style.opacity = '1';
            icons.style.transform = 'translateY(0)';
        });
    } else {
        document.querySelectorAll('.product-icons').forEach(icons => {
            icons.style.opacity = '';
            icons.style.transform = '';
        });
    }
}

// Call on load and resize
updateProductIconsForMobile();
window.addEventListener('resize', updateProductIconsForMobile);
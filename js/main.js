const products = [
    {
        id: "ca-phe-buon-ma-thuot",
        name: "Cà phê Buôn Ma Thuột",
        category: "ca-phe",
        price: 180000,
        origin: "Đắk Lắk",
        stock: 20,
        image: "images/ca-phe-buon-ma-thuot.jpg"
    },
    {
        id: "ca-phe-robusta",
        name: "Cà Phê Robusta Đăk Lăk",
        category: "ca-phe",
        price: 170000,
        origin: "Đắk Lắk",
        stock: 15,
        image: "images/Cà Phê Đăk Lăk.jpg"
    },
    {
        id: "hat-tieu-dak-lak",
        name: "Hạt Tiêu Đăk Lăk",
        category: "gia-vi",
        price: 150000,
        origin: "Đắk Lắk",
        stock: 30,
        image: "images/hạt tiêu đăk lăk.jpg"
    },
    {
        id: "mac-ca-say",
        name: "Hạt Mắc Ca Sấy",
        category: "mac-ca",
        price: 200000,
        origin: "Đắk Lắk",
        stock: 25,
        image: "images/Hạt Mắc Ca Sấy.jpg"
    },
    {
        id: "mat-ong-rung",
        name: "Mật Ong Rừng Tây Nguyên",
        category: "mat-ong",
        price: 250000,
        origin: "Đắk Lắk",
        stock: 12,
        image: "images/mat-ong-rung-tay-nguyen.jpg"
    },
    {
        id: "bo-sap-dak-lak",
        name: "Bơ Sáp Đắk Lắk",
        category: "trai-cay",
        price: 85000,
        origin: "Đắk Lắk",
        stock: 40,
        image: "images/bo-sap-dak-lak.jpg"
    },
    {
        id: "tieu-dak-nong",
        name: "Tiêu Đắk Nông",
        category: "gia-vi",
        price: 120000,
        origin: "Đắk Nông",
        stock: 18,
        image: "images/tieu-dak-nong.jpg"
    },
    {
        id: "tho-cam-tay-nguyen",
        name: "Thổ Cẩm Tây Nguyên",
        category: "tho-cam",
        price: 350000,
        origin: "Đắk Lắk",
        stock: 10,
        image: "images/tho-cam-tay-nguyen.jpg"
    }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector("#product-list, .product-list");
    const categoryFilter = document.getElementById("category-filter");
    const filterForm = document.getElementById("filter-form");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const searchResultsDropdown = document.getElementById("search-results-dropdown");

    function renderProducts(items) {
        if (!productList) return;
        if (items.length === 0) {
            productList.innerHTML = `
                <div class="no-products-found" style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: var(--color-muted); background: var(--color-surface); border-radius: var(--radius-lg); border: 1px dashed var(--color-border);">
                    <p style="font-size: 1.1rem; margin-bottom: 8px; font-weight: 600; color: var(--color-primary);">Không tìm thấy sản phẩm nào!</p>
                    <p style="font-size: 0.95rem;">Vui lòng thử chọn danh mục khác hoặc thay đổi từ khóa tìm kiếm.</p>
                </div>
            `;
            return;
        }
        productList.innerHTML = items.map(product => `
            <article class="product product-card" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-content">
                    <h3>${product.name}</h3>
                    <p class="origin">Xuất xứ: ${product.origin}</p>
                    <p class="price">Giá: ${product.price.toLocaleString("vi-VN")} đ</p>
                    <p class="stock">Tình trạng: ${product.stock > 0 ? `Còn hàng (${product.stock})` : 'Hết hàng'}</p>
                    <div class="product-actions">
                        <button data-id="${product.id}" type="button" class="btn btn-secondary btn-add-cart">Thêm vào giỏ hàng</button>
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline">Xem chi tiết</a>
                    </div>
                </div>
            </article>
        `).join('');
    }

    function applyFilters() {
        let checkedCategories = [];
        if (filterForm) {
            const checkedInputs = filterForm.querySelectorAll('input[name="category"]:checked');
            checkedCategories = Array.from(checkedInputs).map(cb => cb.value);
        }

        let selectedCategory = categoryFilter ? categoryFilter.value : "all";
        let keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";

        let filtered = products.filter(product => {
            let matchesCategory = true;
            if (checkedCategories.length > 0) {
                matchesCategory = checkedCategories.includes(product.category);
            } else if (selectedCategory !== "all") {
                matchesCategory = (product.category === selectedCategory);
            }

            let matchesKeyword = (!keyword || 
                product.name.toLowerCase().includes(keyword) || 
                product.origin.toLowerCase().includes(keyword));

            return matchesCategory && matchesKeyword;
        });

        if (productList) renderProducts(filtered);
    }

    // Xử lý sự kiện form lọc ở Sidebar
    if (filterForm) {
        filterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            applyFilters();
        });

        filterForm.addEventListener("change", () => {
            const checkedInputs = Array.from(filterForm.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
            if (categoryFilter) {
                if (checkedInputs.length === 1) {
                    categoryFilter.value = checkedInputs[0];
                } else {
                    categoryFilter.value = "all";
                }
            }
            applyFilters();
        });
    }

    // Xử lý sự kiện bộ lọc theo Select Dropdown
    if (categoryFilter) {
        categoryFilter.addEventListener("change", () => {
            const val = categoryFilter.value;
            if (filterForm) {
                const checkboxes = filterForm.querySelectorAll('input[name="category"]');
                checkboxes.forEach(cb => {
                    cb.checked = (val === "all" ? false : cb.value === val);
                });
            }
            applyFilters();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            applyFilters();
            renderSearchDropdown(searchInput.value.trim().toLowerCase());
        });

        if (searchBtn) {
            searchBtn.addEventListener("click", applyFilters);
        }
    }

    // Kiểm tra URL parameters khi vừa tải trang
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const searchParam = urlParams.get('search');

    if (categoryParam) {
        if (categoryFilter) categoryFilter.value = categoryParam;
        if (filterForm) {
            const targetCb = filterForm.querySelector(`input[name="category"][value="${categoryParam}"]`);
            if (targetCb) targetCb.checked = true;
        }
    }

    if (searchParam && searchInput) {
        searchInput.value = searchParam;
    }

    if (productList) {
        applyFilters();
    }

    function renderSearchDropdown(keyword) {
        if (!searchResultsDropdown) return;
        if (!keyword) {
            searchResultsDropdown.innerHTML = '';
            searchResultsDropdown.classList.remove('active');
            return;
        }

        const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
        if (filtered.length === 0) {
            searchResultsDropdown.innerHTML = `<div class="no-search-results">Không tìm thấy sản phẩm nào cho "${keyword}"</div>`;
        } else {
            searchResultsDropdown.innerHTML = filtered.map(item => `
                <a href="product-detail.html?id=${item.id}" class="search-item-result">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="search-item-info">
                        <span class="search-item-title">${item.name}</span>
                        <span class="search-item-price">${item.price.toLocaleString("vi-VN")} đ</span>
                    </div>
                </a>
            `).join('');
        }
        searchResultsDropdown.classList.add('active');
    }

    function updateCartUI() {
        const cartCountElements = document.querySelectorAll("#cart-count");
        const totalItemsCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCountElements.forEach(el => {
            el.textContent = totalItemsCount;
        });

        const cartContainers = document.querySelectorAll("#cart-items-container");
        cartContainers.forEach(container => {
            if (cart.length === 0) {
                container.innerHTML = `<p class="empty-cart-msg">Giỏ hàng đang trống. Hãy chọn sản phẩm để mua sắm!</p>`;
                return;
            }

            let totalPrice = 0;
            const tableRowsHtml = cart.map((item, index) => {
                const qty = item.quantity || 1;
                const itemTotal = item.price * qty;
                totalPrice += itemTotal;
                return `
                    <tr>
                        <td>
                            <div class="cart-product-cell">
                                <img src="${item.image}" alt="${item.name}">
                                <div>
                                    <strong>${item.name}</strong>
                                    <br><small style="color: var(--color-muted);">Xuất xứ: ${item.origin}</small>
                                </div>
                            </div>
                        </td>
                        <td>${item.price.toLocaleString("vi-VN")} đ</td>
                        <td>
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <button type="button" class="cart-qty-btn" data-action="dec" data-index="${index}">-</button>
                                <span>${qty}</span>
                                <button type="button" class="cart-qty-btn" data-action="inc" data-index="${index}">+</button>
                            </div>
                        </td>
                        <td><strong>${itemTotal.toLocaleString("vi-VN")} đ</strong></td>
                        <td>
                            <button type="button" class="cart-remove-btn" data-action="remove" data-index="${index}" title="Xóa sản phẩm">🗑️</button>
                        </td>
                    </tr>
                `;
            }).join('');

            container.innerHTML = `
                <div class="cart-table-wrapper">
                    <table class="cart-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRowsHtml}
                        </tbody>
                    </table>
                </div>
                <div class="cart-summary">
                    <span>Tổng cộng: <span class="cart-badge">${totalItemsCount} sản phẩm</span></span>
                    <div>
                        <span>Tổng tiền thanh toán: </span>
                        <span class="cart-total-price">${totalPrice.toLocaleString("vi-VN")} đ</span>
                    </div>
                </div>
            `;
        });
    }

    document.addEventListener("click", function (event) {
        const addBtn = event.target.closest(".btn-add-cart") || (event.target.tagName === "BUTTON" && event.target.dataset.id ? event.target : null);
        if (addBtn) {
            const productId = addBtn.dataset.id || addBtn.getAttribute("data-id");
            if (productId) {
                const product = products.find(item => item.id == productId);
                if (product) {
                    const existing = cart.find(item => item.id == productId);
                    if (existing) {
                        existing.quantity = (existing.quantity || 1) + 1;
                    } else {
                        cart.push({ ...product, quantity: 1 });
                    }
                    updateCartUI();
                    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
                }
            }
            return;
        }

        if (event.target.dataset.action) {
            const action = event.target.dataset.action;
            const index = parseInt(event.target.dataset.index, 10);
            if (!isNaN(index) && cart[index]) {
                if (action === "inc") {
                    cart[index].quantity = (cart[index].quantity || 1) + 1;
                } else if (action === "dec") {
                    cart[index].quantity = (cart[index].quantity || 1) - 1;
                    if (cart[index].quantity <= 0) {
                        cart.splice(index, 1);
                    }
                } else if (action === "remove") {
                    cart.splice(index, 1);
                }
                updateCartUI();
            }
        }
    });

    const orderForms = document.querySelectorAll("#order-form");
    orderForms.forEach(orderForm => {
        orderForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const customerNameInput = orderForm.querySelector("#customer-name") || document.querySelector("#customer-name");
            const phoneInput = orderForm.querySelector("#phone") || document.querySelector("#phone");
            const addressInput = orderForm.querySelector("#address") || document.querySelector("#address");

            const customerName = customerNameInput ? customerNameInput.value.trim() : "";
            const phone = phoneInput ? phoneInput.value.trim() : "";
            const address = addressInput ? addressInput.value.trim() : "";

            if (customerName.length < 3) {
                alert("Họ tên phải có ít nhất 3 ký tự.");
                return;
            }

            if (!/^[0-9]{10}$/.test(phone)) {
                alert("Số điện thoại phải gồm đúng 10 chữ số.");
                return;
            }

            if (address.length < 10) {
                alert("Địa chỉ phải có ít nhất 10 ký tự.");
                return;
            }

            if (cart.length === 0) {
                alert("Giỏ hàng phải có ít nhất 1 sản phẩm.");
                return;
            }

            alert(`Đặt hàng thành công!\nCảm ơn khách hàng ${customerName} (${phone}).\nĐơn hàng sẽ được giao tới: ${address}`);
            cart = [];
            updateCartUI();
            orderForm.reset();
        });
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm && contactForm.id !== "order-form") {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cảm ơn bạn đã gửi yêu cầu liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
            contactForm.reset();
        });
    }
});





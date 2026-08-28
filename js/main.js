document.addEventListener('DOMContentLoaded', () => {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = '✅';
        if (type === 'info') icon = 'ℹ️';
        if (type === 'warning') icon = '⚠️';

        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-hide');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3200);
    }

    document.body.addEventListener('click', (event) => {
        const target = event.target;
        const btn = target.closest('button, .btn');

        if (!btn) return;

        const btnText = btn.textContent.trim().toLowerCase();

        if (btnText.includes('mua hàng') || btnText.includes('thêm vào giỏ hàng') || btnText.includes('đặt mua')) {
            event.preventDefault();

            let productName = '';
            const card = btn.closest('.product, .product-card, .product-detail-info, main');
            
            if (card) {
                const titleEl = card.querySelector('h2, h3');
                if (titleEl) {
                    productName = titleEl.textContent.trim();
                }
            }

            if (productName) {
                if (btnText.includes('giỏ hàng')) {
                    showToast(`Đã thêm "${productName}" vào giỏ hàng thành công!`, 'success');
                } else {
                    showToast(`Cảm ơn bạn! Đã nhận yêu cầu đặt mua "${productName}".`, 'success');
                }
            } else {
                showToast('Đã thêm sản phẩm vào giỏ hàng thành công!', 'success');
            }
        }
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nameInput = contactForm.querySelector('#fullname');
            const name = nameInput ? nameInput.value.trim() : '';

            showToast(`Cảm ơn ${name || 'bạn'} đã gửi liên hệ! Chúng tôi sẽ phản hồi sớm nhất.`, 'success');
            contactForm.reset();
        });
    }

    const filterForm = document.getElementById('filter-form');
    const productItems = document.querySelectorAll('.product[data-category]');

    if (filterForm && productItems.length > 0) {
        function applyFilter() {
            const checkedBoxes = filterForm.querySelectorAll('input[name="category"]:checked');
            const selectedCategories = Array.from(checkedBoxes).map(cb => cb.value);

            let visibleCount = 0;

            productItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (selectedCategories.length === 0 || selectedCategories.includes(itemCategory)) {
                    item.style.display = 'flex';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            return visibleCount;
        }

        filterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const count = applyFilter();
            showToast(`Đã lọc danh sách sản phẩm! Tìm thấy ${count} sản phẩm phù hợp.`, 'info');
        });

        filterForm.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                applyFilter();
            });
        });
    }
});

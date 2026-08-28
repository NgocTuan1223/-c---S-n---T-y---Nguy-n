/* ==========================================================================
   Đặc Sản Tây Nguyên - JavaScript Xử Lý Thông Báo Mua Hàng
   File: js/main.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo Container chứa các thông báo Toast Notification
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    /**
     * Hàm hiển thị thông báo Toast Notification mượt mà
     * @param {string} message - Nội dung thông báo
     * @param {string} type - Loại thông báo (success, info, warning)
     */
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = '✅';
        if (type === 'info') icon = 'ℹ️';
        if (type === 'warning') icon = '⚠️';

        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Tự động ẩn và xóa sau 3.5 giây
        setTimeout(() => {
            toast.classList.add('toast-hide');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3200);
    }

    // 2. Bắt sự kiện bấm nút "Mua hàng" hoặc "Thêm vào giỏ hàng"
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        const btn = target.closest('button, .btn');

        if (!btn) return;

        const btnText = btn.textContent.trim().toLowerCase();

        // Xử lý sự kiện khi bấm nút Mua hàng hoặc Thêm vào giỏ hàng
        if (btnText.includes('mua hàng') || btnText.includes('thêm vào giỏ hàng') || btnText.includes('đặt mua')) {
            event.preventDefault();

            // Tìm tên sản phẩm trong thẻ chứa (.product, .product-card, .product-detail-info)
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

    // 3. Bắt sự kiện gửi Form Liên Hệ (Contact Form)
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
});

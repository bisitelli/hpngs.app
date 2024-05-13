const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup'); // Added dot before the class name
const iconClose = document.querySelector('.icon-close');
const seeMore = document.querySelector('seemorebtn');
let previousPage = '';

function backHome() {
    window.location.href = previousPage || 'index.html';
}

function trending() {
    window.location.href = 'discover.html';
}

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Check if btnPopup exists before adding event listener
if (btnPopup) {
    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
    });
}

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    backHome();
});


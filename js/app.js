// Mobile Navigation Toggle with Animation
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth Scroll for Internal Links with Adjustments
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation with Enhanced Email Check
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && !emailField.value.includes('@')) {
            e.preventDefault();
            alert('Please enter a valid email address.');
        } else if (emailField && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailField.value)) {
            e.preventDefault();
            alert('Please enter a valid email address format.');
        }
    });
});

// Contact Form Submission
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevent default form submission

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Send the form data to the server
        fetch('http://localhost:3000/submit-contact-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.text())
        .then(data => alert(data))  // Alert the response from the server
        .catch(error => alert('Error: ' + error));  // Catch and alert any errors
    });
}

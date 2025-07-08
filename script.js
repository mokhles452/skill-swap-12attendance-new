// DOM Elements
const loginForm = document.getElementById('loginForm');
const successMessage = document.getElementById('successMessage');
const robot = document.querySelector('.robot');
const speechBubble = document.querySelector('.robot-speech-bubble');

const robotMessages = [
    "Hello! Need help with login?",
    "Welcome to Skill Swap!",
    "Having trouble? I'm here to help!",
    "Ready to track your attendance?",
    "Let's get you logged in!",
    "Customer service at your disposal!"
];

let currentMessageIndex = 0;

// Initialize EmailJS
(function() {
    emailjs.init("WE7IlwlOohCrphA7j"); // استبدل بمفتاحك العام من EmailJS
})();

document.addEventListener('DOMContentLoaded', function() {
    initializeRobotInteraction();
    initializeFormHandling();
    startRobotMessageRotation();
});

function initializeRobotInteraction() {
    robot.addEventListener('click', function() {
        showRobotMessage();
        animateRobotClick();
    });

    robot.addEventListener('mouseenter', function() {
        pauseRobotAnimation();
    });

    robot.addEventListener('mouseleave', function() {
        resumeRobotAnimation();
    });
}

function showRobotMessage() {
    const randomMessage = robotMessages[Math.floor(Math.random() * robotMessages.length)];
    speechBubble.querySelector('p').textContent = randomMessage;

    speechBubble.style.opacity = '1';
    speechBubble.style.transform = 'translateY(0)';

    setTimeout(() => {
        speechBubble.style.opacity = '0';
        speechBubble.style.transform = 'translateY(10px)';
    }, 3000);
}

function animateRobotClick() {
    robot.style.transform = 'scale(1.2)';
    setTimeout(() => {
        robot.style.transform = 'scale(1)';
    }, 200);
}

function pauseRobotAnimation() {
    robot.style.animationPlayState = 'paused';
}

function resumeRobotAnimation() {
    robot.style.animationPlayState = 'running';
}

function startRobotMessageRotation() {
    setInterval(() => {
        speechBubble.querySelector('p').textContent = robotMessages[currentMessageIndex];
        currentMessageIndex = (currentMessageIndex + 1) % robotMessages.length;
    }, 8000);
}

function initializeFormHandling() {
    loginForm.addEventListener('submit', handleFormSubmit);

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
        input.addEventListener('input', handleInputChange);
    });
}

function handleInputFocus(event) {
    const inputGroup = event.target.closest('.input-group');
    inputGroup.style.transform = 'translateX(5px)';
    inputGroup.style.transition = 'transform 0.3s ease';
}

function handleInputBlur(event) {
    const inputGroup = event.target.closest('.input-group');
    inputGroup.style.transform = 'translateX(0)';
}

function handleInputChange(event) {
    const input = event.target;
    if (input.value.length > 0) {
        input.style.borderBottomColor = '#28a745';
    } else {
        input.style.borderBottomColor = '#ddd';
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const loginData = {
        username: formData.get('username'),
        user_id: formData.get('userId'),
        today_target: formData.get('todayTarget'),
        user_agent: navigator.userAgent,
        timestamp: new Date().toLocaleString()
    };

    const submitButton = loginForm.querySelector('.login-btn');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Logging in...';
    submitButton.disabled = true;

    try {
        // إرسال البيانات عبر EmailJS
        await emailjs.send("service_jm7sn2l", "template_5xy71hw", {
            from_name: loginData.username,
            user_id: loginData.user_id,
            today_target: loginData.today_target,
            message: `New attendance login:\n\nUsername: ${loginData.username}\nUser ID: ${loginData.user_id}\nToday's Target: ${loginData.today_target}\n\nUser Agent: ${loginData.user_agent}\nTimestamp: ${loginData.timestamp}`
        });

        showSuccessMessage();
        loginForm.reset();
        celebrateWithRobot();

    } catch (error) {
        console.error('Email sending error:', error);
        showErrorMessage('Login failed. Please try again.');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

function showSuccessMessage() {
    successMessage.classList.remove('hidden');
    setTimeout(() => {
        closeSuccessMessage();
    }, 5000);
}

function closeSuccessMessage() {
    successMessage.classList.add('hidden');
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <h3>Error</h3>
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

function celebrateWithRobot() {
    robot.style.animation = 'none';
    robot.style.transform = 'scale(1.3) rotate(10deg)';

    setTimeout(() => {
        robot.style.transform = 'scale(1.3) rotate(-10deg)';
    }, 200);

    setTimeout(() => {
        robot.style.transform = 'scale(1.3) rotate(0deg)';
    }, 400);

    setTimeout(() => {
        robot.style.transform = 'scale(1)';
        robot.style.animation = 'robotBounce 6s ease-in-out infinite';
    }, 600);

    speechBubble.querySelector('p').textContent = 'Welcome aboard! 🎉';
    speechBubble.style.opacity = '1';
    speechBubble.style.transform = 'translateY(0)';

    setTimeout(() => {
        speechBubble.style.opacity = '0';
        speechBubble.style.transform = 'translateY(10px)';
    }, 4000);
}

document.documentElement.style.scrollBehavior = 'smooth';
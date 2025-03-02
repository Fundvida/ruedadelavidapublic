document.querySelector('.close-btn').addEventListener('click', function() {
    hideNotification();
});

function showNotification(message) {
    var notification = document.getElementById('notification');
    document.getElementById('notification-message').textContent = message;

    // Show the notification
    notification.classList.add('show');

    // After 5 seconds, hide the notification
    setTimeout(function() {
        hideNotification();
    }, 5000);
}

function hideNotification() {
    var notification = document.getElementById('notification');
    notification.classList.remove('show');
}

// Test it:
//showNotification('This is a test notification!');

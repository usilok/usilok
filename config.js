// config.js
(function(){
    // XOR-ключ (0x5A = 90)
    const KEY = 90;
    
    // Зашифрованный токен
    const encToken = "w8/Jy8fLz8nLx8nLx8nLx8nLx8nLx8nLx8nLx8nLx8nLx8nLx8nLx8nLx8nLx8nLx8nLx8nLx8nLw8nLx8nLx8nLx8nLx8nLx8nLw8nLx8nLx8nLx8nLw8nLx8nLw8nLx8nLx8nLw8nLx8nLw8nLx8nLw==";
    // Зашифрованный chat_id
    const encChat = "w8/Jy8fLz8nLx8nLw8nLx8nLw8nLx8nLw8nLw==";
    
    function decrypt(encoded, key) {
        const binary = atob(encoded);
        let result = '';
        for (let i = 0; i < binary.length; i++) {
            result += String.fromCharCode(binary.charCodeAt(i) ^ key);
        }
        return result;
    }
    
    window.BOT_TOKEN = decrypt(encToken, KEY);
    window.CHAT_ID = decrypt(encChat, KEY);
})();

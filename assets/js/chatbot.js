// FDK Chatbot Widget
(function() {
    var chatOpen = false;
    var messages = [];

    // Create widget HTML
    var widget = document.createElement('div');
    widget.id = 'fdk-chat-widget';
    widget.innerHTML = `
        <button id="fdk-chat-toggle" aria-label="Otwórz czat">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/><path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>
        </button>
        <div id="fdk-chat-window" style="display:none">
            <div id="fdk-chat-header">
                <div style="display:flex;align-items:center;gap:10px">
                    <img src="assets/img/logo-dark.png" alt="FDK" height="28" onerror="this.style.display='none'">
                    <div>
                        <div style="font-weight:700;font-size:14px">Firma Dla Każdego</div>
                        <div style="font-size:11px;opacity:0.7">Asystent AI • Online</div>
                    </div>
                </div>
                <button id="fdk-chat-close" aria-label="Zamknij czat">&times;</button>
            </div>
            <div id="fdk-chat-messages">
                <div class="fdk-msg fdk-bot">Dzień dobry! Jestem asystentem Fundacji Firma Dla Każdego. W czym mogę pomóc?</div>
            </div>
            <form id="fdk-chat-form">
                <input type="text" id="fdk-chat-input" placeholder="Napisz wiadomość..." autocomplete="off">
                <button type="submit" aria-label="Wyślij">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#00BBFF"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(widget);

    // Styles
    var style = document.createElement('style');
    style.textContent = `
        #fdk-chat-widget { position:fixed; bottom:20px; right:20px; z-index:9998; font-family:'Montserrat',Arial,sans-serif; }
        #fdk-chat-toggle { width:60px; height:60px; border-radius:50%; background:#00BBFF; border:none; cursor:pointer; box-shadow:0 4px 15px rgba(0,187,255,0.4); display:flex; align-items:center; justify-content:center; transition:transform 0.2s,box-shadow 0.2s; }
        #fdk-chat-toggle:hover { transform:scale(1.1); box-shadow:0 6px 20px rgba(0,187,255,0.5); }
        #fdk-chat-window { position:absolute; bottom:75px; right:0; width:370px; max-width:calc(100vw - 40px); height:500px; max-height:calc(100vh - 120px); background:#fff; border-radius:16px; box-shadow:0 10px 40px rgba(0,0,0,0.15); display:flex; flex-direction:column; overflow:hidden; }
        #fdk-chat-header { background:linear-gradient(135deg,#1a1e23,#292d33); color:#fff; padding:16px; display:flex; justify-content:space-between; align-items:center; }
        #fdk-chat-close { background:none; border:none; color:#fff; font-size:24px; cursor:pointer; padding:0 4px; opacity:0.7; }
        #fdk-chat-close:hover { opacity:1; }
        #fdk-chat-messages { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px; }
        .fdk-msg { max-width:85%; padding:10px 14px; border-radius:12px; font-size:14px; line-height:1.5; word-wrap:break-word; }
        .fdk-bot { background:#f0f4f8; color:#333; align-self:flex-start; border-bottom-left-radius:4px; }
        .fdk-user { background:#00BBFF; color:#fff; align-self:flex-end; border-bottom-right-radius:4px; }
        .fdk-typing { align-self:flex-start; background:#f0f4f8; padding:12px 18px; border-radius:12px; }
        .fdk-typing span { display:inline-block; width:8px; height:8px; background:#aaa; border-radius:50%; margin:0 2px; animation:fdkBounce 1.4s infinite; }
        .fdk-typing span:nth-child(2) { animation-delay:0.2s; }
        .fdk-typing span:nth-child(3) { animation-delay:0.4s; }
        @keyframes fdkBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        #fdk-chat-form { display:flex; padding:12px; border-top:1px solid #eee; gap:8px; }
        #fdk-chat-input { flex:1; border:1px solid #ddd; border-radius:24px; padding:10px 16px; font-size:14px; outline:none; font-family:inherit; }
        #fdk-chat-input:focus { border-color:#00BBFF; }
        #fdk-chat-form button[type=submit] { background:none; border:none; cursor:pointer; padding:4px; }
        @media(max-width:480px) { #fdk-chat-window { width:calc(100vw - 20px); right:-10px; bottom:70px; height:calc(100vh - 100px); } }
    `;
    document.head.appendChild(style);

    // Toggle
    document.getElementById('fdk-chat-toggle').addEventListener('click', function() {
        chatOpen = !chatOpen;
        document.getElementById('fdk-chat-window').style.display = chatOpen ? 'flex' : 'none';
        this.style.display = chatOpen ? 'none' : 'flex';
        if (chatOpen) document.getElementById('fdk-chat-input').focus();
    });

    document.getElementById('fdk-chat-close').addEventListener('click', function() {
        chatOpen = false;
        document.getElementById('fdk-chat-window').style.display = 'none';
        document.getElementById('fdk-chat-toggle').style.display = 'flex';
    });

    // Send message
    document.getElementById('fdk-chat-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var input = document.getElementById('fdk-chat-input');
        var text = input.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user');
        messages.push({ role: 'user', content: text });
        input.value = '';

        // Show typing indicator
        var typing = document.createElement('div');
        typing.className = 'fdk-typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        var msgContainer = document.getElementById('fdk-chat-messages');
        msgContainer.appendChild(typing);
        msgContainer.scrollTop = msgContainer.scrollHeight;

        // Call API
        fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: messages })
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            typing.remove();
            var reply = data.reply || 'Przepraszam, wystąpił błąd. Proszę spróbować ponownie lub skontaktować się z nami: +48 575 594 500.';
            addMessage(reply, 'bot');
            messages.push({ role: 'assistant', content: reply });
        })
        .catch(function() {
            typing.remove();
            addMessage('Przepraszam, nie udało się połączyć. Proszę o kontakt: +48 575 594 500 lub kontakt@firmadlakazdego.pl.', 'bot');
        });
    });

    function addMessage(text, type) {
        var div = document.createElement('div');
        div.className = 'fdk-msg fdk-' + type;
        // Simple markdown: **bold** and newlines
        var html = text
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        div.innerHTML = html;
        var container = document.getElementById('fdk-chat-messages');
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }
})();

(function() {
  /* ---------- Inject HTML ---------- */
  const htmlContent = `
    <div id="chatBubble">
      <img src="https://i.imgur.com/4DB1BHj.png" alt="Chat bubble">
    </div>
    <div id="bubbleArrow"></div>
    <div id="bubblePopup">
      <div class="popup-arrow"></div>
      <div id="popupContent">
        <span id="popupMessage">Hello! 👋 Welcome to Priyo Pay. How can I help you today?</span>
        <button id="popupCloseBtn" aria-label="Close popup">×</button>
      </div>
    </div>
    <div id="chatWidget">
      <div class="chat-header">
        <img src="https://i.imgur.com/4DB1BHj.png" alt="Priyo Pay logo">
        <span id="chatCloseBtn" aria-label="Close chat">×</span>
      </div>
      <div class="chat-tabs">
        <button id="tabChatBtn" class="chat-tab active" aria-selected="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15c0 1.1-.9 2-2 2H7l-4 4V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10z"/>
          </svg>
          Chat
        </button>
        <button id="tabHelpBtn" class="chat-tab" aria-selected="false">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v.01M12 13c.64 0 1.2-.4 1.6-1 .4-.6.4-1.3.1-1.9-.3-.6-.8-1-1.4-1.2-.6-.2-1.2-.1-1.7.2-.5.3-.9.8-1.1 1.4"/>
          </svg>
          Help
        </button>
      </div>
      <div id="tabChat">
        <div id="chatBody"></div>
        <div id="typingIndicator">Priyo is typing...</div>
      </div>
      <div id="tabHelp">
        <div class="help-content">
          <p>Open the help center</p>
          <p>Clicking Help opens our full helpdesk in a new tab.</p>
          <button id="openHelpBtn">Open Help Center</button>
        </div>
      </div>
      <div class="chat-footer" aria-hidden="false">
        <input id="chatInput" type="text" placeholder="Type your message..." aria-label="Type your message">
        <button id="sendBtn" aria-label="Send message">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  /* ---------- Inject CSS ---------- */
  const cssContent = `
    body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    #chatBubble {
      position: fixed; bottom: 20px; right: 20px; width: 56px; height: 56px; border-radius: 50%;
      background-color: #E60023; display: flex; justify-content: center; align-items: center;
      cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 9999; user-select: none;
      animation: pulse 2s infinite; transition: transform 0.3s ease;
    }
    #chatBubble img { width: 58px; height: 58px; user-select: none; pointer-events: none; }
    @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(230, 0, 35, 0.7); } 50% { box-shadow: 0 0 12px 10px rgba(230, 0, 35, 0.3); } }
    #bubbleArrow {
      position: fixed; bottom: calc(20px + 56px + 8px); right: 20px; width: 56px; height: 20px;
      pointer-events: none; opacity: 0; transition: opacity 0.25s ease, transform 0.25s ease; z-index: 10002;
      transform-origin: center bottom;
    }
    #bubbleArrow::before {
      content: ""; position: absolute; left: 50%; transform: translateX(-50%) rotate(0deg); bottom: 0;
      border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 16px solid #E60023;
      width: 0; height: 0;
    }
    #bubbleArrow.show { opacity: 1; transform: translateY(-4px); animation: bounce 2.5s infinite ease-in-out; }
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
    #chatWidget {
      position: fixed; bottom: 110px; right: 20px; width: 360px; height: 560px; background-color: #fff;
      border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); display: none; flex-direction: column;
      overflow: hidden; z-index: 10003; user-select: none; animation: slideUp 0.4s ease forwards;
    }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    .chat-header {
      background: #000; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center;
      border-radius: 20px 20px 0 0; flex-shrink: 0; position: relative;
    }
    .chat-header img { width: 120px; user-select: none; }
    #chatCloseBtn { color: #fff; font-size: 26px; cursor: pointer; user-select: none; }
    #chatCloseBtn:hover { color: #ff4d4d; transform: scale(1.15); transition: color 0.25s ease, transform 0.25s ease; }
    #bubblePopup {
      position: fixed; bottom: calc(20px + 56px + 6px); right: calc(20px + 64px); max-width: 260px;
      background: #E60023; color: white; border-radius: 12px; padding: 12px 14px; box-shadow: 0 6px 22px rgba(0,0,0,0.25);
      font-size: 14px; font-weight: 600; display: block; align-items: center; justify-content: space-between;
      z-index: 10004; user-select: none; opacity: 0; transform: translateY(8px) scale(0.98); pointer-events: none;
      transition: opacity 0.35s cubic-bezier(.2,.9,.2,1), transform 0.35s cubic-bezier(.2,.9,.2,1);
    }
    #bubblePopup.show { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
    .popup-arrow {
      position: absolute; bottom: -8px; right: 22px; width: 0; height: 0;
      border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #E60023;
    }
    #popupContent { display: flex; align-items: center; width: 100%; }
    #popupMessage { flex: 1; margin-right: 10px; }
    #popupCloseBtn { background: transparent; border: none; color: white; font-size: 18px; cursor: pointer; line-height: 1; padding: 0; font-weight: 700; }
    #popupCloseBtn:hover { color: #ff9999; }
    .chat-tabs { display: flex; justify-content: center; gap: 12px; background: #000; padding: 8px 10px; border-radius: 0 0 20px 20px; flex-shrink: 0; }
    .chat-tab {
      flex: 1; max-width: 110px; padding: 8px 14px; border-radius: 25px; background: #222; color: #fff; font-weight: 600;
      display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;
      transition: transform 0.2s ease, background-color 0.2s ease;
    }
    .chat-tab:hover { transform: scale(1.05); background: #444; }
    .chat-tab.active { background: #E60023; }
    .chat-tab.active:hover { background: #ff1a3c; }
    #tabChat, #tabHelp { padding: 10px; flex: 1 1 auto; overflow: hidden; display: none; box-sizing: border-box; }
    #tabChat { display: block; }
    #chatBody { height: 100%; display: flex; flex-direction: column; gap: 6px; overflow-y: auto; padding: 12px; box-sizing: border-box; scroll-behavior: smooth; }
    .chat-footer { display: flex; gap: 10px; padding: 10px; align-items: center; background: #f2f2f2; border-radius: 0 0 20px 20px; flex-shrink: 0; box-sizing: border-box; position: relative; }
    .chat-footer[aria-hidden="true"] { visibility: hidden; pointer-events: none; opacity: 0; display: none; }
    .chat-footer[aria-hidden="false"] { visibility: visible; pointer-events: auto; opacity: 1; display: flex; }
    #chatInput { flex: 1; padding: 10px 14px; border-radius: 25px; border: 1px solid #ccc; font-size: 14px; outline: none; box-sizing: border-box; }
    #sendBtn { width: 42px; height: 42px; border-radius: 50%; background: #E60023; border: none; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
    .message { display: flex; align-items: flex-start; gap: 10px; }
    .message.user { justify-content: flex-end; text-align: right; }
    .message-text { max-width: 75%; padding: 10px 16px; border-radius: 20px; white-space: pre-wrap; word-wrap: break-word; }
    .message.bot .message-text { background: #f0f0f0; color: #000; border-bottom-left-radius: 0; }
    .message.user .message-text { background: #E60023; color: #fff; border-bottom-right-radius: 0; }
    .avatar { width: 32px; height: 32px; border-radius: 50%; background-size: cover; background-position: center; flex-shrink: 0; }
    .avatar.bot { background-image: url('https://i.imgur.com/4DB1BHj.png'); }
    #typingIndicator { font-style: italic; color: #666; font-size: 13px; display: none; margin-top: 6px; }
    @media (max-width: 480px) {
      #chatWidget { width: 95vw; height: 60vh; right: 2.5vw; bottom: 80px; }
      #bubblePopup { right: 12px; bottom: calc(20px + 56px + 10px); max-width: 70vw; }
    }
  `;

  /* ---------- Inject HTML and CSS into DOM ---------- */
  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  document.body.appendChild(container);

  const style = document.createElement('style');
  style.textContent = cssContent;
  document.head.appendChild(style);

  /* ---------- Sound & Notification Helpers ---------- */
  function playBeep(frequency = 440, duration = 200, volume = 0.2) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration / 1000);
    oscillator.stop(audioCtx.currentTime + duration / 1000);
  }

  function playGentleSound() {
    playBeep(880, 150, 0.1);
  }

  function playAlertSound() {
    playBeep(440, 300, 0.3);
  }

  function showDesktopNotification(messageText) {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      const notification = new Notification("Priyo Pay", {
        body: messageText,
        icon: "https://i.imgur.com/4DB1BHj.png"
      });
      notification.onclick = () => window.focus();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }

  /* ---------- Grab DOM Elements ---------- */
  const chatBubble = document.getElementById('chatBubble');
  const chatWidget = document.getElementById('chatWidget');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const tabChatBtn = document.getElementById('tabChatBtn');
  const tabHelpBtn = document.getElementById('tabHelpBtn');
  const tabContents = {
    chat: document.getElementById('tabChat'),
    help: document.getElementById('tabHelp')
  };
  const chatBody = document.getElementById('chatBody');
  const chatFooter = document.getElementById('chatFooter');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const typingIndicator = document.getElementById('typingIndicator');
  const bubbleArrow = document.getElementById('bubbleArrow');
  const bubblePopup = document.getElementById('bubblePopup');
  const popupCloseBtn = document.getElementById('popupCloseBtn');
  const openHelpBtn = document.getElementById('openHelpBtn');

  let isChatOpen = false;
  let activeTab = 'chat';
  let welcomeShown = false;

  /* ---------- Helpers ---------- */
  function adjustChatPadding() {
    try {
      const footerHeight = chatFooter.offsetHeight || 56;
      chatBody.style.paddingBottom = (footerHeight + 8) + 'px';
      tabContents.chat.style.paddingBottom = '0px';
      tabContents.help.style.paddingBottom = '0px';
    } catch (e) {
      console.error('Error adjusting chat padding:', e);
    }
  }

  function scrollToBottom(behavior = 'auto') {
    if (!chatBody) return;
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior });
  }

  function showFooter() {
    chatFooter.setAttribute('aria-hidden', 'false');
    chatFooter.style.visibility = 'visible';
    chatFooter.style.pointerEvents = 'auto';
    chatFooter.style.opacity = '1';
    chatFooter.style.display = 'flex';
  }

  function hideFooter() {
    chatFooter.setAttribute('aria-hidden', 'true');
    chatFooter.style.visibility = 'hidden';
    chatFooter.style.pointerEvents = 'none';
    chatFooter.style.opacity = '0';
    chatFooter.style.display = 'none';
  }

  /* ---------- Open/Close Functions ---------- */
  function openWidget() {
    chatWidget.style.display = 'flex';
    isChatOpen = true;
    switchTo('chat');
    bubbleArrow.classList.add('show');
    if (bubblePopup.classList.contains('show')) {
      bubblePopup.classList.remove('show');
      bubblePopup.addEventListener('transitionend', function onEnd() {
        bubblePopup.style.display = 'none';
        bubblePopup.removeEventListener('transitionend', onEnd);
      }, { once: true });
    }
    adjustChatPadding();
    setTimeout(() => {
      try { chatInput.focus(); } catch(e) { console.error('Error focusing input:', e); }
      scrollToBottom('auto');
      if (!welcomeShown) {
        addMessage("Hello! 👋 Welcome to Priyo Pay. How can I help you today?", 'bot');
        welcomeShown = true;
      }
    }, 120);
  }

  function closeWidget() {
    chatWidget.style.display = 'none';
    isChatOpen = false;
    bubbleArrow.classList.remove('show');
  }

  /* ---------- Tab Switching ---------- */
  function switchTo(tab) {
    if (tab === activeTab) return;
    activeTab = tab;
    [tabChatBtn, tabHelpBtn].forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    if (tab === 'chat') {
      tabChatBtn.classList.add('active');
      tabChatBtn.setAttribute('aria-selected', 'true');
    }
    if (tab === 'help') {
      tabHelpBtn.classList.add('active');
      tabHelpBtn.setAttribute('aria-selected', 'true');
    }
    tabContents.chat.style.display = (tab === 'chat') ? 'block' : 'none';
    tabContents.help.style.display = (tab === 'help') ? 'block' : 'none';
    if (tab === 'chat') {
      showFooter();
      adjustChatPadding();
      setTimeout(() => {
        try { chatInput.focus(); } catch(e) { console.error('Error focusing input:', e); }
        scrollToBottom('smooth');
      }, 80);
    } else {
      hideFooter();
      try { chatInput.blur(); } catch(e) { console.error('Error blurring input:', e); }
    }
  }

  /* ---------- Help Tab Action ---------- */
  const HELP_URL = 'https://help.priyo.com/en/';
  tabHelpBtn.addEventListener('click', () => {
    window.open(HELP_URL, '_blank');
    switchTo('help');
  });
  tabHelpBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tabHelpBtn.click();
    }
  });

  if (openHelpBtn) {
    openHelpBtn.addEventListener('click', () => {
      window.open(HELP_URL, '_blank');
    });
    openHelpBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openHelpBtn.click();
      }
    });
  }

  tabChatBtn.addEventListener('click', () => switchTo('chat'));
  tabChatBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      switchTo('chat');
    }
  });

  /* ---------- Bubble Click Toggles Widget ---------- */
  chatBubble.addEventListener('click', () => {
    if (isChatOpen) closeWidget(); else openWidget();
  });
  chatBubble.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      chatBubble.click();
    }
  });
  chatCloseBtn.addEventListener('click', closeWidget);

  /* ---------- Messaging ---------- */
  function addMessage(text, sender = 'bot') {
    const div = document.createElement('div');
    div.className = 'message ' + (sender === 'user' ? 'user' : 'bot');
    const avatar = document.createElement('div');
    avatar.className = 'avatar ' + (sender === 'user' ? 'user' : 'bot');
    const txt = document.createElement('div');
    txt.className = 'message-text';
    txt.textContent = text;
    div.appendChild(avatar);
    div.appendChild(txt);
    chatBody.appendChild(div);
    scrollToBottom('smooth');
    if (sender === 'bot') {
      if (isChatOpen) {
        playGentleSound();
      } else {
        playAlertSound();
        showDesktopNotification(text);
      }
    }
  }

  sendBtn.addEventListener('click', async () => {
    const t = chatInput.value.trim();
    if (!t || activeTab !== 'chat') return;
    addMessage(t, 'user');
    chatInput.value = '';
    typingIndicator.style.display = 'block';
    await new Promise(r => setTimeout(r, 900));
    addMessage(`You said: "${t}"`, 'bot');
    typingIndicator.style.display = 'none';
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && activeTab === 'chat') {
      e.preventDefault();
      sendBtn.click();
    }
  });

  /* ---------- Ensure Scroll Pinned to Bottom on Mutations ---------- */
  const obs = new MutationObserver(() => {
    if (isChatOpen && activeTab === 'chat') scrollToBottom('auto');
  });
  obs.observe(chatBody, { childList: true, subtree: true });

  /* ---------- Responsiveness Adjustments ---------- */
  window.addEventListener('resize', () => {
    adjustChatPadding();
    if (isChatOpen && activeTab === 'chat') setTimeout(() => scrollToBottom('auto'), 120);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && isChatOpen && activeTab === 'chat') {
      adjustChatPadding();
      requestAnimationFrame(() => scrollToBottom('smooth'));
    }
  });

  /* ---------- Popup Logic ---------- */
  window.addEventListener('load', () => {
    bubblePopup.style.display = 'block';
    setTimeout(() => {
      bubblePopup.classList.add('show');
    }, 300);
  });

  popupCloseBtn.addEventListener('click', () => {
    bubblePopup.classList.remove('show');
    bubblePopup.addEventListener('transitionend', function onEnd() {
      bubblePopup.style.display = 'none';
      bubblePopup.removeEventListener('transitionend', onEnd);
    }, { once: true });
  });

  /* ---------- Initial Setup ---------- */
  adjustChatPadding();
  switchTo('chat');
  chatBubble.style.display = 'flex';

  window.addEventListener('load', () => {
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  });
})();
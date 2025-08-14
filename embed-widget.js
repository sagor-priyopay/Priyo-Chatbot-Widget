(function(){
  // 1️⃣ Load CSS dynamically
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://rawcdn.githack.com/sagor-priyopay/Priyo-Chatbot-Widget/main/styles.css';
  document.head.appendChild(link);

  // 2️⃣ Add a container div dynamically
  var container = document.createElement('div');
  container.id = 'priyo-chat-widget-container';

  // Instead of pasting full HTML, just create a placeholder
  container.innerHTML = '<div id="chatWidgetPlaceholder"></div>';

  document.body.appendChild(container);

  // 3️⃣ Load JS dynamically
  var script = document.createElement('script');
  script.src = 'https://rawcdn.githack.com/sagor-priyopay/Priyo-Chatbot-Widget/main/script.js';
  document.body.appendChild(script);
})();

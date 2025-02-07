function sendMessage(){
	const userInput = document.getElementById('user-input').value.trim();

    if (userInput === "") return;

    const chatBox = document.getElementById('chat-box');
    // append user message
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    fetch("chatbot.php", {
    	method: 'POST',
    	headers: {'Content-Type': 'application/json'},
    	body: JSON.stringify({message: userInput})
    }).then(respose=> respose.json())
      .then(data => {
      	const botMessage = document.createElement('div');
      	botMessage.className = 'bot-message';
        botMessage.textContent = data.error ? `Bot: ${data.error}`:  `Bot: ${data.response}`;
       chatBox.appendChild(botMessage);
       document.getElementById('user-input').value='';
       chatBox.scrollTop = chatBox.scrollHeight;
    }).catch(error=> {
    	const errorMessage = document.createElement('div');
      	errorMessage.className = 'bot-message';
        errorMessage.textContent = 'Bot: Failed to fetch  respose.';
       chatBox.appendChild(errorMessage);
    });
}
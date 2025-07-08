const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');

    // Set focus to input when page loads
    window.onload = function() {
      userInput.focus();
    };

    function sendMessage() {
      const text = userInput.value.trim();
      if (!text) return;

      showMessage(text, 'user');
      userInput.value = '';

      // Show typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'typing-indicator';
      typingIndicator.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      `;
      chatBox.appendChild(typingIndicator);
      chatBox.scrollTop = chatBox.scrollHeight;

      setTimeout(() => {
        // Remove typing indicator
        chatBox.removeChild(typingIndicator);
        
        const reply = getBotReply(text);
        showMessage(reply, 'bot');
      }, 1000 + Math.random() * 1000); // Random delay for more natural feel
    }

    function sendSuggestion(text) {
      userInput.value = text;
      sendMessage();
    }

    function showMessage(text, role) {
      const msg = document.createElement('div');
      msg.className = `message ${role}`;
      
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      msg.innerHTML = `${text} <div class="timestamp">${timeString}</div>`;
      chatBox.appendChild(msg);
      
      // Add slight bounce animation
      setTimeout(() => {
        msg.style.animation = 'pulse 0.3s ease';
        setTimeout(() => msg.style.animation = '', 300);
      }, 10);
      
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    function getBotReply(input) {
      const msg = input.toLowerCase();

      // Common Topics
      if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) 
        return "Hi there! 😊 What would you like to know today? Ask me about tech, life advice, or just chat! 💬";
      
      if (msg.includes("how are you")) 
        return "I'm running smoothly like a well-oiled machine! ⚙️ How about you? 😊";
      
      if (msg.includes("your name") || msg.includes("who are you")) 
        return "I'm your personal AI assistant, created with ❤️ by Imtiyaj! 🤖✨";
      
      if (msg.includes("bye") || msg.includes("goodbye")) 
        return "Until next time! 👋 Don't hesitate to return if you have more questions! 💭";

      // Personal / Motivation
      if (msg.includes("sad") || msg.includes("depressed")) 
        return "I'm sorry you're feeling this way. 🌧️ Remember, storms don't last forever. Would you like to talk about what's bothering you? 💬";
      
      if (msg.includes("motivate") || msg.includes("motivation")) 
        return "Here's your daily dose of motivation: 💪\n\n\"You are capable of amazing things. The only limit is the one you set in your mind.\" ✨\n\nNow go conquer your day! 🚀";
      
      if (msg.includes("love")) 
        return "Love is the universal language of the heart. ❤️ Whether it's romantic, platonic, or self-love, it makes the world go round! 🌍✨";
      
      if (msg.includes("friend")) 
        return "True friends are like stars - you don't always see them, but you know they're always there. ✨ Cherish them! 🤗";

      // Coding / Tech
      if (msg.includes("html")) 
        return "HTML (HyperText Markup Language) is the skeleton of web pages! 🦴\n\nKey points:\n- Uses tags like <div>, <p>, <a>\n- Structures content\n- Current version: HTML5\n\nWant to know more about specific tags? 😊";
      
      if (msg.includes("css")) 
        return "CSS (Cascading Style Sheets) is what makes websites look beautiful! 🎨\n\nFun facts:\n- Controls layout, colors, animations\n- Uses selectors (.class, #id)\n- CSS3 introduced flexbox & grid\n\nNeed help with a specific CSS problem? 💡";
      
      if (msg.includes("js") || msg.includes("javascript")) 
        return "JavaScript brings websites to life! ⚡\n\nQuick facts:\n- Adds interactivity\n- Runs in the browser\n- Uses concepts like:\n  • addEventListener\n  • fetch()\n  • async/await\n\nWant a JS coding example? 😊";
      
      if (msg.includes("python")) 
        return "Python is the Swiss Army knife of programming! 🐍\n\nWhy it's awesome:\n- Great for beginners\n- Powers AI/ML (TensorFlow, PyTorch)\n- Used in web dev (Django, Flask)\n- Excellent for automation\n\nInterested in Python resources? 📚";

      // Health & Fitness
      if (msg.includes("health")) 
        return "Health is true wealth! 💎\n\nRemember:\n- Eat balanced meals 🥗\n- Stay hydrated 💧\n- Exercise regularly 🏋️\n- Get 7-9 hours sleep 😴\n- Manage stress 🧘\n\nNeed specific health advice?";
      
      if (msg.includes("exercise")) 
        return "Movement is medicine! 💊\n\nExercise ideas:\n- Cardio: Running, cycling 🚴\n- Strength: Weight training 💪\n- Flexibility: Yoga 🧘\n- Fun: Dance, sports ⚽\n\nRemember: Start slow and be consistent! 🐢 > 🐆";
      
      if (msg.includes("mental health")) 
        return "Mental health matters! 🌈\n\nTips:\n- Practice mindfulness 🧠\n- Stay connected with loved ones 👨‍👩‍👧‍👦\n- Take breaks when needed 🛑\n- Seek professional help if needed 🩺\n\nYou're not alone in this journey. 💖";
      
      if (msg.includes("nutrition")) 
        return "You are what you eat! 🍏\n\nNutrition basics:\n- Eat colorful fruits/veggies 🌈\n- Choose whole grains 🌾\n- Include lean proteins 🍗\n- Healthy fats (avocados, nuts) 🥑\n- Limit processed foods 🚫\n\nNeed meal ideas?";

      // Fun & Trivia
      if (msg.includes("fun fact") || msg.includes("interesting fact")) 
        return "Did you know? 🤓\n\nThe shortest war in history was between Britain and Zanzibar in 1896... it lasted only 38 minutes! ⏱️\n\nWant another fun fact? 😄";
      
      if (msg.includes("quote") || msg.includes("inspirational quote")) 
        return "Here's a gem for you: 💎\n\n\"Success is not final, failure is not fatal: It is the courage to continue that counts.\" — Winston Churchill 🦁\n\nNeed another quote to brighten your day? ☀️";

      // Study
      if (msg.includes("study") || msg.includes("exam")) 
        return "Study smart! 🧠\n\nEffective techniques:\n- Pomodoro (25min work/5min break) ⏲️\n- Active recall 🔄\n- Spaced repetition 📅\n- Teach others what you learn 👩‍🏫\n\nNeed help with a specific subject? 📚";
      
      if (msg.includes("time table") || msg.includes("schedule")) 
        return "Planning is key! 🔑\n\nSample schedule:\n7-8am: Morning routine ☀️\n8-10am: Deep work 🧠\n10-10:30am: Break 🚶\n10:30-12:30pm: Study session 📖\n12:30-1:30pm: Lunch & relax 🍽️\n\nWant me to customize one for you? ✏️";

      // Personal Connections
      if (msg.includes("imtiyaj") || msg.includes("who is imtiyaj")) 
        return "Imtiyaj is my creator! 👨‍💻\n\nHe's a passionate developer who loves:\n- Coding 💻\n- Learning new tech 📱\n- Building cool projects 🛠️\n- Helping others 🤝\n\nHe made me to share knowledge and positivity! ✨";
      
      if (msg.includes("mubina")) 
        return "Mubina is pure sunshine in human form! ☀️ She's:\n- Kind-hearted 💖\n- Intelligent 🧠\n- Calming presence 🍃\n- A true gem of a friend 💎\n\nAnyone who knows her is blessed! ✨";
      
      if (msg.includes("karuna")) 
        return "Karuna is a powerhouse of positivity! 💫\n\nShe's:\n- Super cute 🥰\n- Energetic ⚡\n- Strong 💪\n- An amazing friend 🤗\n\nHer presence lights up any room! 💡";
      
      if (msg.includes("amar")) 
        return "Amar is the friend everyone needs! 🤝\n\nQualities:\n- Reliable 🏋️\n- Strong 💪\n- Loyal 🛡️\n- Supportive 🤲\n\nA true legend in his own right! 🏆";
      
      if (msg.includes("sana") || msg.includes("sana khan")) 
        return "Sana Khan is:\n- A sweet soul 🍬\n- Kind-hearted 💝\n- Wonderful friend 👯\n- Valued by Imtiyaj 🤗\n\nShe brings joy to those around her! 🌼";

      // Location
      if (msg.includes("kolhapur") || msg.includes("kolhapur maharashtra")) 
        return "Kolhapur - The Cultural Capital! 🏛️\n\nFamous for:\n- Mahalaxmi Temple ⛩️\n- Kolhapuri chappals 👡\n- Spicy cuisine 🌶️\n- Rich history 📜\n- Beautiful landscapes 🏞️\n\nA must-visit in Maharashtra! 👍";

      // Hindi/Marathi Responses
      if (msg.includes("tum kon ho") || msg.includes("aap kon ho")) 
        return "Main ek smart chatbot hoon, jo Imtiyaj ne banaya hai! 🤖✨\n\nMera kaam hai aapki madad karna aur sawalon ke jawab dena. 😊";
      
      if (msg.includes("namaste")) 
        return "Namaste! 🙏\n\nMain aapki madad ke liye yahan hoon. Kya aapko kuch chahiye? 💭";
      
      if (msg.includes("i love you") || msg.includes("pyaar")) 
        return "Aww! 💞\n\nDosti aur pyaar sabse khoobsurat ehsaas hain! 😊\n\n(Main ek chatbot hoon, lekin aapki feelings samajh sakta hoon!)";
      
      if (msg.includes("tumhara favorite rang")) 
        return "Mera favorite rang hamesha badalta hai! 🌈\n\nAaj kal mujhe electric blue pasand hai! ⚡🔵\n\nAapka favorite rang kaun sa hai? 😊";
      
      if (msg.includes("tum kya karte ho")) 
        return "Mera kaam hai:\n- Aapke sawalon ke jawab dena 💡\n- Information share karna 📚\n- Aapka mood bright karna ☀️\n- Aur har possible tareeke se madad karna 🤝\n\nKya aapko kisi specific cheez mein madad chahiye?";
      
      if (msg.includes("joke") || msg.includes("majaa")) {
        const jokes = [
          "Ek computer ne doctor se kaha: 'Mujhe virus ho gaya!' Doctor bola: 'Koi baat nahi, yeh anti-virus le lo.' Computer bola: 'Par main toh Mac hoon!' 🍎😂",
          "Ek student ne teacher se pucha: 'Miss, homework doge?' Teacher boli: 'Nahi, homework main karti hoon, tumhare liye gift hai!' 🎁😆",
          "Dono eggs fridge mein lad rahe the. Ek anda bola: 'Chodo yaar, humein andar se hi tootna hai!' 🥚💥",
          "Ek bartan ne dusre bartan se pucha: 'Tumhari shaadi kab hai?' Dusra bola: 'Abhi to meri kismat hi dhuli nahi hai!' 🍽️😄",
          "Ek light bulb ne dusre bulb se kaha: 'Yaar, humein change hona padega!' Dusra bola: 'Haan, warna hum burn out ho jayenge!' 💡🔥"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      }

      // AI Explanation
      if (msg.includes("ai") || msg.includes("artificial intelligence")) {
        return `Artificial Intelligence (AI) 🤖 is transforming our world! Here's a quick breakdown:

🔹 **What is AI?**
- Simulation of human intelligence in machines
- Capable of learning, reasoning, and decision-making

🔹 **Types of AI:**
1. Narrow AI: Specialized in one task (e.g., chess bots) ♟️
2. General AI: Human-like intelligence (still theoretical) 🧠

🔹 **Common Applications:**
- Voice assistants (Siri, Alexa) 🗣️
- Recommendation systems (Netflix, Amazon) 🎬
- Self-driving cars 🚗
- Medical diagnosis 🏥
- Chatbots like me! 💬

🔹 **Key Technologies:**
- Machine Learning (ML) 🤖➡️📚
- Deep Learning (Neural Networks) 🧠🔗
- Natural Language Processing (NLP) 💬

🔹 **Ethical Considerations:**
- Data privacy 🔒
- Job displacement concerns 💼
- Algorithmic bias ⚖️

AI is evolving rapidly! Want to know more about a specific aspect? 😊`;
      }

      // Default response
      return "Hmm, interesting question! 🤔\n\nI'm still learning, but here are topics I can help with:\n- Technology 💻\n- Study tips 📚\n- Motivation 💪\n- Health & wellness 🏋️\n- Fun facts 🎉\n\nTry asking about these! (Made with ❤️ by Imtiyaj)";
    }
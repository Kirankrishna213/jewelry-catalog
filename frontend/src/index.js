/* Base Styles */
:root {
  --gold: #D4AF37;
  --dark-gold: #996515;
  --light-gold: #F0E68C;
  --bg-color: #f9f5f0;
  --text-color: #333;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Playfair Display', serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
}

/* Loading States */
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.spinner {
  border: 5

html {
  scroll-behavior: smooth;
}
h1 {
  text-align: center;
  font-family: "Lucida Handwriting", cursive, sans-serif;
  font-size: 2rem;
  margin-bottom: 20px;
  word-spacing: 10px;
  color: #92a1c3;
  background: white;
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

body {
  background: linear-gradient(135deg, #ffd3dd, #ffe9f0);
  margin: 0;
  padding: 40px 20px;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-wrapper {
  position: relative;
}

video {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border: 4px solid #92a1c3;
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

#countdown {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 10px black;
  pointer-events: none;
}

button {
  margin-top: 20px;
  padding: 12px 35px;
  font-size: 16px;
  border: none;
  border-radius: 9px;
  background: #92a1c3;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
  background: #7a8eb8;
  transform: scale(1.05);
}

#preview {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background: white;
  padding: 15px;
  border-radius: 12px;
  border: 3px solid #92a1c3;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

#preview img {
  width: 160px;
  background: white;
  padding: 12px 12px 25px 12px;
  border: 2px solid #eee;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  object-fit: cover;
}

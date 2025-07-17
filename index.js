const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Multer config: store uploaded files in 'uploads/' temporarily
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists or create it
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Snap-Buy Backend is Running');
});

// Image upload route
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // File metadata
  const { filename, path: filePath } = req.file;
  res.status(200).json({
    message: 'Image uploaded successfully',
    filename,
    filePath
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

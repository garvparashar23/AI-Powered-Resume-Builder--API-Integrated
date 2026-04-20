// [HOTFIX] Ensure latest Env vars are loaded over old terminal instances 
require('dotenv').config({ override: true });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const logger = require('./utils/logger'); // [NEW] Winston logger

const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const aiRoutes = require('./routes/aiRoutes'); // existing openai routes
const intelligenceRoutes = require('./routes/intelligenceRoutes'); // [NEW] Core intelligence routes
const adminRoutes = require('./routes/adminRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: '*' })); // Allow all for development

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging with Morgan + Winston
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info('MongoDB Connected'))
  .catch(err => logger.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai/tools', aiRoutes); // shifted existing simple AI builder to /tools
app.use('/api/ai', intelligenceRoutes); // mount new intelligence routes here
app.use('/api/admin', adminRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

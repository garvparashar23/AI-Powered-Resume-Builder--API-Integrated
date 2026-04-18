const User = require('../models/User');
const Resume = require('../models/Resume');
const logger = require('../utils/logger');

const getSystemMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();
    
    // Aggregation for Average ATS Score and global downloads
    const resumeStats = await Resume.aggregate([
      {
         $group: {
            _id: null,
            avgScore: { $avg: '$analytics.atsScore' },
            totalDownloads: { $sum: '$analytics.downloads' }
         }
      }
    ]);
    
    // Token usage overall
    const tokenStats = await User.aggregate([
       {
          $group: {
             _id: null,
             totalTokens: { $sum: '$tokensUsed' }
          }
       }
    ]);

    // Top recent users
    const recentUsers = await User.find({}).sort({ createdAt: -1 }).limit(5).select('-password');

    res.json({
       metrics: {
          totalUsers,
          totalResumes,
          avgAtsScore: resumeStats[0] ? Math.round(resumeStats[0].avgScore) : 0,
          totalDownloads: resumeStats[0] ? resumeStats[0].totalDownloads : 0,
          totalTokensUsed: tokenStats[0] ? tokenStats[0].totalTokens : 0
       },
       recentUsers
    });
  } catch (error) {
    logger.error('Error fetching admin metrics:', error);
    res.status(500).json({ message: 'Error retrieving system metrics' });
  }
};

module.exports = { getSystemMetrics };

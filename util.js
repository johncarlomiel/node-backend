const fs = require('fs').promises;

const deleteFile = async (path) => {
    try {
        await fs.unlink(path);
        console.log(`successfully deleted ${path}`);
      } catch (error) {
        console.error('there was an error:', error.message);
      }
};


module.exports = { 
    deleteFile
}
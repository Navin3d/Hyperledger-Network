const fs = require('fs');
const path = require('path');

function deleteNodeModules(rootDir) {
  // Read the contents of the directory
  const files = fs.readdirSync(rootDir);

  files.forEach((file) => {
    const filePath = path.join(rootDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file === 'node_modules') {
        // If the directory is a 'node_modules' folder, delete it
        console.log(`Deleting: ${filePath}`);
        deleteFolderRecursive(filePath);
      } else {
        // If the directory is not 'node_modules', recursively call the function
        deleteNodeModules(filePath);
      }
    }
  });
}

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);

      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursive call for directories
        deleteFolderRecursive(curPath);
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });

    // Delete folder
    fs.rmdirSync(folderPath);
    console.log(`Deleted: ${folderPath}`);
  }
}

// Specify the root directory where you want to start deleting 'node_modules' folders
const rootDirectory = path.resolve(__dirname);

deleteNodeModules(rootDirectory);

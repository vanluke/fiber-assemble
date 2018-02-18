import fs from 'fs';

const addPrefix = name => `js${name}`;

const readStats = (filePath) => {
  try {
    const statFile = fs.readFileSync(filePath, 'utf8');
    const statsData = JSON.parse(statFile);
    return [addPrefix(statsData.manifest),
      addPrefix(statsData.vendor),
      addPrefix(statsData.polyfills),
      addPrefix(statsData.main),
    ];
  } catch (e) {
    return [];
  }
};

export {readStats};

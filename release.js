const fs = require('fs');
const VERSION = '0.1.1';
try {
  const releseNote = fs.readFileSync('./release-notes.md', 'utf8');
  const releaseDate = new Date().toISOString();
  const versionObj = {
    version: VERSION + '-' + releaseDate,
    releaseDate: releaseDate,
    releaseNotes: releseNote
  };
  fs.writeFileSync('./public/version.json', JSON.stringify(versionObj));
} catch (err) {
  console.log(err);
}

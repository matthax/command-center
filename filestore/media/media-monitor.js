const path = require('path');
const watch = require('watch');

const media_extensions = ['.mp3', '.mp4'];
const isMedia = (file) => {
  return media_extensions.indexOf(path.extname(file).toLocaleLowerCase()) >= 0;
};
console.log(__dirname);
watch.createMonitor(__dirname, { 
  ignoreDotFiles: true,
  filter: isMedia,
}, (monitor) => {
  monitor.on('created', (file, stat) => {
    console.log('created file', file);
  });
  monitor.on('changed', (file, current, previous) => {
    console.log('changed file', file);
  });
  monitor.on('removed', (file, stat) => {
    console.log('removed file', file);
  });
  process.once('beforeExit', () => {
    console.log('closing monitor');
    monitor.stop();
  });
})
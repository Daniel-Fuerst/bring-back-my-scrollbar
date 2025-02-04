function loadConfig() {
  browser.storage.sync.get('blacklistDomains').then((result) => {
    if (result.blacklistDomains && Array.isArray(result.blacklistDomains)) {
      const configText = result.blacklistDomains.join('\n');
      document.getElementById('configInput').value = configText;
    }
  }).catch((error) => {
    console.error('Could not load config! | ', error);
  });
}

document.getElementById('configForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const input = document.getElementById('configInput').value;
  const stringList = input.split('\n').map(item => item.trim()).filter(item => item.length > 0);

  browser.storage.sync.set({ blacklistDomains: stringList }).then(() => {
    alert('Konfiguration gespeichert!');
  }).catch((error) => {
    console.error('Fehler beim Speichern der Konfiguration:', error);
  });
});

loadConfig();


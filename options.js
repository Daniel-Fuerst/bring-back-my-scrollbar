// Funktion zum Laden der gespeicherten Konfiguration
function loadConfig() {
  browser.storage.sync.get('blacklistDomains').then((result) => {
    if (result.blacklistDomains && Array.isArray(result.blacklistDomains)) {
      // Wenn gespeicherte Konfiguration existiert, ins Textfeld einfügen
      const configText = result.blacklistDomains.join('\n');  // Array in einen Text mit Zeilenumbrüchen umwandeln
      document.getElementById('configInput').value = configText;
    }
  }).catch((error) => {
    console.error('Fehler beim Laden der Konfiguration:', error);
  });
}

// Event Listener für das Formular
document.getElementById('configForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Eingabewert aus dem Textfeld holen
  const input = document.getElementById('configInput').value;

  // Die Eingabe in ein Array von Strings umwandeln
  const stringList = input.split('\n').map(item => item.trim()).filter(item => item.length > 0);

  // Die Konfiguration speichern
  browser.storage.sync.set({ blacklistDomains: stringList }).then(() => {
    alert('Konfiguration gespeichert!');
  }).catch((error) => {
    console.error('Fehler beim Speichern der Konfiguration:', error);
  });
});

// Laden der gespeicherten Konfiguration, wenn die Seite geladen wird
loadConfig();


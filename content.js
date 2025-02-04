doScroll="yes";

browser.storage.sync.get('blacklistDomains').then((result) => {
  if (result.blacklistDomains && Array.isArray(result.blacklistDomains)) {
    for (i in result.blacklistDomains) {
      if (window.location.hostname.includes(result.blacklistDomains[i])) {
        doScroll="no";
      }
    }
  }
  if (doScroll=="yes") {
    var r="html,body{overflow:auto !important;}";
    var s=document.createElement("style");
    s.type="text/css";
    s.appendChild(document.createTextNode(r));
    document.body.appendChild(s);
  }
}).catch((error) => {
    alert('Fehler beim Abrufen der Konfiguration: ' + error);
});

void 0;


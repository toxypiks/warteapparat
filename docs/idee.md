# Info
- coding of a warteschlangen app
# Minimal Viable Product
- Frontend mit Anzeige der aktuellen Nummer
- Backend mit Logik um neue Nummern auszugeben und nach bestimmter Zeit die Anzeige im Frontend hochzuzählen
## Optional Features
- Frontend mit Nutzerlogin und Anzeige gezogener Nummer
# Used Technologies
- Frontend: HTML,JavaScript
- Backend: Python Flask, Endpoints (get,update,post,delete),
## Optional Technologies:
- Datenbank mit postgres, psychopg2 
# Backlog
  - Ordner mit HTML Skript mit README.md,
  - wie zustand(state in flask zwischen endpoints halten?
- documentation in Bildchen
  - use case diagram
  - sequenzdiagram vom Ablauf
- anstatt onclick Atribute im html , mit einer init funktion im javascript:
  - getElementById("") -set onclick
  Beispiel 
  document.getElementById('server_ping').onclick = function(){
      dooropen_api.ping();
  }
- getNumber state ausgeben
- neben bisher stateabfrage
- stateabfrage+hochzählen
- busfaherEndpoint 
  - zweite statevariable
  - wenn gecalled 5 hochzählen auf zweite Bariable, aber die darf nicht höher sein als die erste
    - nur maximale (solcange kleiner als erstes state)
# History
- Projekt aufsetzen
- Projektstruktur erstellen
- javascript das elemet veränder (button klicked -> zahl anzeigen in <div>)
- Pythonscript welches Flask benutzt um mit HTML verbunden zu sein
- flask get -endpoint methode
- curl - test aufruf bauen
- xhttp request implementieren und flask endpoint callen
- der wert in dem input neben button anzeigen
- in python flask mal random werte zurück geben (wert generieren mit format zu string umwandeln)
- globaler Zustand in Flask umsetzen (python package multiprocessing.Value)

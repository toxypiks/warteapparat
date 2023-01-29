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
- Documentation:
  Schema Front/Backend interaction (simple)
  - curl aufruf zum testen (Bild malen)
- Debugconsole im HTML
  - Funktion um zeilen hinzuzufügen ("debugprint("Error")")
- Naming 
  - 1.state was macht der?
    - zählt requests (immer wenn Zettel gezogen wird)
  - 2. state was macht der?
    - repäsentiert der wieviel aktuel abgeholt wurd 
	- "taken_items"
- interne zuordnung IDs (zahlen per request) und einer Tabelle-> abgeholt
  - neue Endpoints 
     mit nem Post -> Update?? 
	 dictionary mit Id : true und false	
	 - get für alle ids im dictionary + zustand
	 - können wir ausgeben in unserer debugprint
- kleine Pizza im Frontend (maybe) ;)
- wie könnte man das mit `python warteapparat_backend.py`
  - starten, sodass der shell befehl zum flask starten im Python skript ausgeführt wird
- python package 
  - Requirements setup.py
# Ausblick
- Anbindung Datenbank


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
- function zum BackendStatehochzählen im Frontend
- Bind event handler an DOM Elemets via javascript
- Second state Variable (wieviel Leute abgeholt wurden)
  - weitere Endpoints "BussfahrerEndpoint" - hol jetzt 5 Leute ab
  - POst request mittels JSon

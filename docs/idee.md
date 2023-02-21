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
# Structure of Application
```
leute stehen an                 Anzeige(server)        Busfahrer,Pizzalieferant
neue Nummer                      zeigt State an               ich nehm leute mit
                    state: order_state               state:deliver_state
 get_number <-------->                            <------>
```
# Backlog
- wieviel sind noch in der datenbank auf ORDERED ?
  - funktion dafür implementieren im backend
    - zum testen auch im frontend
- endpoint
  - der checked ob Einträge die auf Ordered sind älter sind als eine Zeit t
    - wenn das so ist setze diese auf Invalid
- können wir sowas wie ne konfiguration mit einbauen
  - python backend.py my.config
    - Beispiel: https://github.com/majorx234/python-flask-restx-game-ratings
      - environment.py
- documentation in Bildchen
  - use case diagram
  - sequenzdiagram vom Ablauf
- Documentation:
  Schema Front/Backend interaction (simple)
  - curl aufruf zum testen (Bild malen)

- for near Zukunft
  - eigentlich brauhcen wir zwei frontends
    - eins für die Benutzer
	- eins für Pizzabäcker

- Naming 
  - 1.state was macht der?
    - zählt requests (immer wenn Zettel gezogen wird)
  - 2. state was macht der?
    - repäsentiert der wieviel aktuel abgeholt wurd 
	- "taken_items"
- kleine Pizza im Frontend (maybe) ;)
- wie könnte man das mit `python warteapparat_backend.py`
  - starten, sodass der shell befehl zum flask starten im Python skript ausgeführt wird
- python package 
  - Requirements setup.py
- was ist mit Menschen nicht abgeholt haben, nummer verbummelt???
  - mechanismus der, wenn 1min(parameter) nicht abgeholt, nummer invalid
  - ```
1 2 3 4 5 6
T I T F F F -> wie lang is schlange? schlange ist 3 lang
```
  - F -Ordered
    T -Picked up
	I -hats verschlafen
    - wieviele "ordered" sind noch im dict? 
  - zeitliche Abfolge mit Futures, Multitastking
    - oder man macht zweiten thread der checkt wer is über die Zeit und dann invalid macht
    - 3 zustände kann man mit enum machen (orderer, picked_up, invalid) 

# Ausblick
- Anbindung Datenbank
- Wartzeit estimation, wie lange dauerts bis zur Pizza


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
- Debugconsole im HTML
  - Funktion um zeilen hinzuzufügen ("debugprint("Error")")
- interne zuordnung IDs (zahlen per request) und einer Tabelle-> abgeholt
  - neue Endpoints 
     mit nem Post -> Update?? 
	 dictionary mit Id : true und false	
  - get für alle ids im dictionary + zustand
  - können wir ausgeben in unserer debugprint
- Ordner mit HTML Skript mit README.md,
  - HTML_frontend
- wie zustand(state in flask zwischen endpoints halten?
  - multiprocesssing.Value
- curl aufruf zum testen:
  `curl --request GET http://127.0.0.1:5000/state`
  `curl -H "Content-Type: application/json" --request POST -d '{"2nd_state":2}' "http://localhost:5000/post_sec_state"`
  `curl --request GET http://127.0.0.1:5000/add_sec_state`
  `curl --request GET http://127.0.0.1:5000/get_sec_state`	

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

- package system python
  -oldschool setup.py
  - newschool toml-dateien
- können wir sowas wie ne konfiguration mit einbauen
  - python backend.py my.config
    - Beispiel: https://github.com/majorx234/python-flask-restx-game-ratings
      - environment.py
- endpoint
  - Funktion zum invalidieren um Parameter t erweitern
- tabellenkopf automatisiert erstellen
  - input ist array: [id,timestampe, state]
    - for loop die das macht
- history 
  - oben das neuste
  - nicht einfach anhängen(append)
    - DOM baum (first next sibling)
- im Pizzabäcker frontend
  - globale zeux wieder raus
  - ich habe n viele pizzas
    -erste funktion
      - gib mir kronologisch die ältesten orders
      - Ausgabe er IDs im Frontend-Console
	    - plus button -> button click ruft zweite funktion auf
		  - beim button erstellen des button funktions dranhängen
		    - lambda funktion, die uuid der pizza mit hat
			-  var myfunctio = () => { return pickup(121234) };
			   - hat festen parameter uuid
			- get elemetbyid.onclick = myfunction;
	- zweite funktion: (ein parameter uuid)
	   - bsp function pickup(uuid)
       - setze diese auf picked Up

- documentation in Bildchen
  - use case diagram
  - sequenzdiagram vom Ablauf
- Documentation:
  Schema Front/Backend interaction (simple)
  - curl aufruf zum testen (Bild malen)

- Naming 
  - 1.state was macht der?
    - zählt requests (immer wenn Zettel gezogen wird)
  - 2. state was macht der?
    - repäsentiert der wieviel aktuel abgeholt wurd 
	- "taken_items"
- kleine Pizza im Frontend (maybe) ;)
- python package 
  - Requirements setup.py
- zeitliche Abfolge mit Futures, Multitastking
  - oder man macht zweiten thread der checkt wer is über die Zeit und dann invalid macht
  - 3 zustände kann man mit enum machen (orderer, picked_up, invalid)
- Einführung eines dritten Fronends für Kunden

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
- Einführung eines Pizzabäckerfrontends
- neue Funktion die checktob Orders nicht abgeholt wurden
  - Order wird nach 5 minuten invalidiert
- funktion um anzahl der orderer  ORDERED zu ermitteln ?
  - funktion dafür im backend
    - zum testen auch im frontend
- starten des backends mit `python warteapparat_backend.py`
  - flask app
- alle rückgaben im backend müssen json sein,
  -  Reponse Objekt (application/json)
  - passend dazu im fron end
- httpGet und httpPost bekommen handler_functionen übergeben
  - wenn get/post daten zurückliefern -> this.responseText
  - handler_function(this.responseText) ausgeführt

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
- Projekt aufsetzen
  - Projektstruktur erstellen
  - Ordner mit HTML Skript mit README.md,
    - javascript das elemet veränder (button klicked -> zahl anzeigen in <div>)
  - Pythonscript welches Flask benutzt um mit HTML verbunden zu sein
    - flask get -endpoint methode
	- curl - test aufruf bauen
	- jetzt mittels html und javascript aufurfren (xhttp request)
	
	function serveGetRequest(endpoint) {
      var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         alert(this.responseText);
      }
    };
    var endpoint = "http://127.0.0.1:5000/";
    xhttp.open("GET", endpoint, true);
    xhttp.send(null);
}
  - button click -> request funktion aufgerufen -> gibt wert von get request zurück -> anzeige mit alert
  - der wert in dem input neben button anzeigen
  - in python flask mal random werte zurück geben (wert generieren mit format zu string machen "{}".format(wert))
  - wie zustand(state in flask zwischen endpoints halten?
beispiel: (so gehts nicht)
state = 0
app = Flask(__name__)

@app.route("/")
def get_a_number():
    state += 1
    return "10"

@app.route("/state")
def get_the_state():
    return "{}".format(state)

- documentation in Bildchen
  - use case diagram
  - sequenzdiagram vom Ablauf

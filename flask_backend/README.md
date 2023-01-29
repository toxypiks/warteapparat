# Install
- clone repo and go into folder
- create virtual environment:
  - `python3 -m venv env`
- install dependencies:
  - `pip install -r requirements.txt`
# Usage
- start virtual environment:
  - `source env/bin/activate`
- start flask:
  - `flask --app warteapparat_backend run`
- test flask endpoint:
  - `curl http://127.0.0.1:5000`

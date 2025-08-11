from flask import Flask, request, jsonify
import json
from flask_cors import CORS  # <-- import this

app = Flask(__name__)
CORS(app)  # <-- enable CORS for all routes

LOG_FILE = 'click_log.log'

@app.route('/log', methods=['POST'])
def log_click():
    click_data = request.get_json()
    if not click_data:
        return jsonify({"success": False, "error": "No data received"}), 400

    try:
        with open(LOG_FILE, 'a') as f:
            f.write(json.dumps(click_data) + '\n')
        print("Click logged:", click_data)
        return jsonify({"success": True})
    except Exception as e:
        print("Error logging click:", e)
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)

from flask import Flask, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app, origins=["http://localhost:8080"])
@app.route('/registrar', methods=['POST'])
def registrar():
    data = request.json
    nombre = data['nombre']
    email = data['email']

    conn = mysql.connector.connect(
        host='db',
        user='user',
        password='userpass',
        database='usuarios_db'
    )
    cursor = conn.cursor()
    cursor.execute("INSERT INTO usuarios (nombre, email) VALUES (%s, %s)", (nombre, email))
    conn.commit()
    cursor.close()
    conn.close()
    return {'mensaje': 'Usuario registrado'}, 200
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
from flask import Flask, render_template,jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def python_function():
    result = "Hello from Python!"
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)

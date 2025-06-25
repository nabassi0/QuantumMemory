# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, jsonify, request
from flask_cors import CORS

# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
CORS(app)

# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
# '/' URL is bound with hello_world() function.
def hello_world():
    return 'Hello World'

@app.route('/api/hello')
def hello():
    return jsonify({'message': 'Hello World from APIII'})

@app.route('/api/generate-sequence')
def generate_sequence():
    try:
        # Import de la classe depuis le notebook
        from quantum_functions import QuantumCircuitSimulator
        
        # Créer une instance du simulateur
        sim = QuantumCircuitSimulator()
        
        length = request.args.get('length', 1, type=int)
        grid_size = request.args.get('grid_size', 9, type=int)
        
        # Utilise la fonction pour générer la séquence selon le jeu
        if request.args.get('level') and request.args.get('sublevel'):
            level = request.args.get('level', 1, type=int)
            sublevel = request.args.get('sublevel', 1, type=int)
            sequence = sim.GenerateSequenceForGame(level, sublevel)
        else:
            # Fallback vers la fonction basique
            sequence = []
            for _ in range(length):
                card_index = sim.GenerateCardIndex(grid_size)
                sequence.append(card_index)
        
        return jsonify({'sequence': sequence})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# main driver function
if __name__ == '__main__':
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(debug=True, host='0.0.0.0', port=5000)
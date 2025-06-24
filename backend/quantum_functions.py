from qiskit import QuantumCircuit, transpile
from qiskit.visualization import plot_histogram
from qiskit_aer import AerSimulator

class QuantumCircuitSimulator:
    def __init__(self):
        self.simulator = AerSimulator()
    
    def QuantumBitGenerator(self):
        qc = QuantumCircuit(1, 1)
        qc.h(0)  # porte d'Hadamard pour créer une superposition
        qc.measure(0, 0)  # on mesure le qubit

        compiled_circuit = transpile(qc, self.simulator)
        result = self.simulator.run(compiled_circuit, shots=1).result()
        counts = result.get_counts()

        return int(list(counts.keys())[0])
    
    def DistributionTest(self, num_shots=1000):
        results = []
        for _ in range(num_shots):
            bit = self.QuantumBitGenerator()
            results.append(str(bit))
    
        counts = {'0': results.count('0'), '1': results.count('1')}
        print(counts)
        plot_histogram(counts)

    def GenerateCardIndex(self, grid_size):
        """Génère UN index de carte entre 0 et grid_size-1"""
        # Combine plusieurs bits quantiques pour avoir plus de 0 et 1
        result = 0
        num_bits = 4  # Assez pour grilles jusqu'à 16 cases
        
        for i in range(num_bits):
            bit = self.QuantumBitGenerator()
            result += bit * (2 ** i)
        
        # Restreint au bon range
        return result % grid_size

    def GenerateSequenceForGame(self, level, sublevel):
        """LA fonction principale pour ton jeu"""
        # Tailles de grilles par niveau (max 5 niveaux)
        grid_sizes = {1: 9, 2: 16, 3: 25, 4: 36, 5: 49}
        grid_size = grid_sizes.get(level, 9)
        
        # Génère la séquence de cartes
        sequence = []
        for _ in range(sublevel):  # sublevel = nombre de cartes
            card_index = self.GenerateCardIndex(grid_size)
            sequence.append(card_index)
        
        return sequence

# Test si le fichier est exécuté directement
if __name__ == "__main__":
    sim = QuantumCircuitSimulator()
    
    print("Test pour ton jeu :")
    print("Niveau 1, Sous-niveau 3 (3 cartes sur grille 3x3) :")
    sequence = sim.GenerateSequenceForGame(1, 3)
    print(f"Séquence: {sequence}")

    print("\nNiveau 2, Sous-niveau 4 (4 cartes sur grille 4x4) :")
    sequence = sim.GenerateSequenceForGame(2, 4)
    print(f"Séquence: {sequence}")

# This is a memory game using React/Mui and Flash/Qikskit

## ** Structure du projet**

```
quantum-memory-game/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/     # API calls to backend
│   │   └── App.js
│   └── package.json
├── backend/
│   ├── app.py           # Flask server
│   ├── quantum_functions.py # Qiskit logic
│   └── requirements.txt
└── README.md
```

## \*\* Comment run le projet

- cd frontend
  - run la command `npm i` puis `npm run dev` pour run le frontend.

Pour le backend, installer Miniconda, et lors de l'installation, l'ajouter au Variables d'Environnements de Windows.

- cd backend
  - Lancer la commande conda : `conda create --name <my-env>` -> choisissez n'importe quel nom d'environnement
  - Ensuite lancer la commande : `conda activate <my-env>`
  - Puis faire : `conda install pip`
  - Ensuite faire `pip install requirements.txt` qui va installer l'ensemble des dépendances du projet back
  - Si le pip install ne fonctionne pas, faire : `pip install flask qiskit qiskit-ibm-runtime` .Ensuite une fois que tout est installé, faire la commande : `flask --app app.py --debug run`. Cette commande va run le serveur flask pour pouvoir faire appel aux api.

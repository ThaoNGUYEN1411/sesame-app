# Sesame app
Une application permet la création de comptes pour lire des articles.
## À propos
 
Ce référentiel implémente l'API backend REST (construite dans NodeJs/ExpressJs + MongoDB).
 
## Exigences
 
Pour le développement, vous aurez besoin de Node.js, npm et Mongodb installé dans votre environnement. 

### Node
 
Vous devez installer [nodejs et npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Si l'installation a réussi, vous devriez pouvoir exécuter la commande suivante.
 
    node --version
    npm --version
 
### Mongodb
 
Exécutez MongoDB avec [MongoDB Compass](https://www.mongodb.com/docs/compass/master/install/) ou [MongoDB Atlas](https://www.mongodb.com/fr-fr/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_retarget-brand_gic-null_emea-all_ps-all_desktop_eng_lead&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=14412646455&adgroup=131761126452&cq_cmp=14412646455&gad_source=1&gclid=CjwKCAiAk9itBhASEiwA1my_6zQDfnDGI3XmLSYLTotdK6C8QyORSF63ofz5KSqTs6WTvSmKCIzCzRoC_QYQAvD_BwE)


## Environments
Si vous souhaitez un autre port, vous changerez la variable.

- Mongodb link : `MONGODB_URI` (ex : mongodb://localhost:27017/sesame-app)
- Server side : `PORT` (ex: 5006)
- Client side : `FRONT_END_URL` (ex: http://localhost:3000)
- JWT token secret : `TOKEN_SECRET` (ex: yoursecret)
 

## Instructions
 
Pour exécuter sur votre ordinateur, suivez ces étapes :
 
### Cloning pour le serveur
 
    git clone https://github.com/ThaoNGUYEN1411/sesame-app
    cd server/
 
### Configuration d'environment variables
 
Après avoir téléchargé le référentiel, certaines choses doivent être configurées si nécessaire avant de pouvoir exécuter l'application dans le fichier `.env` de votre environnement local.
 
### Installation des dépendances
 
    npm install
 
Cela téléchargera et installera toutes les dépendances nécessaires pour exécuter correctement l'application.
 
### Exécution le serveur local
 
    npm start
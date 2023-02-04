<img src="https://i.goopics.net/03v8if.png" alt="logo savime" style="width:200px;"/>
      
![Savime Version](https://img.shields.io/badge/version-v0.0.1-white)

# Savime
### «The time-saver for teams & companies.»
Application orienté RH, Savime `seɪv.ɪm` sert à créer une communication rapide, simple & sécurisée entre des employé·es et le département RH d'une entreprise.
Que se soit le partage de documents, la gestion des congés ou l’accès aux informations importantes lié à l’entreprise & la carrière des employé·es.
Cette application se veux clef en main.

## Fonctionnalités

- Tableau de bord Employé·es.
- Tableau de bord Managers.
- Tableau de bord Admin.
- Partage de Documents.
- Actualités internes.
- Contact via mails.
- Calendrier.

## Installation en local

- Assurez-vous d'avoir installé Node.js, Git et Xampp sur votre ordinateur.

- Ouvrez Xampp et démarrez les services Apache et MySQL.

- Ouvrez un terminal et déplacez-vous dans le répertoire où vous voulez installer le projet.

- Clonez le projet à partir de GitHub en utilisant la commande git clone `<url du repository>` ou en téléchargant le zip.

- Une fois le clonage, ou la décompression du zip, terminé, accédez au répertoire du projet en utilisant la commande cd `<nom du projet>`.

- Installez les dépendances nécessaires au projet en utilisant la commande npm install, vous pourriez avoir besoins.
Il est possible que vous rencontriez des problèmes lors de l'installation de l'application en raison d'un conflit de dépendances entre le paquet "craco-sass-resources-loader" et la version actuelle de react-scripts. Pour résoudre ce problème, vous pouvez utiliser l'option "--legacy-peer-deps" lors de l'exécution de la commande "npm install", soit `npm install --legacy-peer-deps`. Cette option permet d'accepter une résolution de dépendance, ce qui peut être nécessaire si le paquet "craco-sass-resources-loader" n'a pas été mis à jour et n'est pas compatible avec la version actuelle de certains autres paquets. Cependant, cela ne pose actuellement aucun problème de compatibilité ou de stabilité pour l'application.

- Configurez la base de données pour le projet en modifiant les paramètres de connexion à la base de données dans le fichier de configuration Sequelize. Assurez-vous d'utiliser les informations de connexion appropriées pour se connecter au serveur Xampp.

- Exécutez la commande npm start pour lancer le serveur et vérifiez si l'application fonctionne correctement en accédant à http://localhost:3001 ou le port configuré dans le projet.

## Scripts disponibles

Lancez le serveur de *développement* :

```bash
npm run dev
```

Observez la console pour voir la connexion et le déploiement des tables.
Ouvrez [http://localhost:3001](http://localhost:3001) avec votre navigateur pour voir le résultat.

Lancez le serveur de *production* :

```bash
npm run build && npm run start
```

Le script `build` execute `clean` *(Efface le répertoire dist pour éviter les fichiers obsolètes)* puis `build:js` *(Transpile le code source JavaScript en utilisant Babel et enregistre les fichiers transpilés dans le répertoire dist)* et ensuite `start` *(Démarre l'application en production en définissant la variable d'environnement APP_ENV à "production" et en exécutant le fichier index.js dans le répertoire dist)*

## Variables d'environnement

Pour exécuter ce projet, vous devrez ajouter les variables d'environnement suivantes à votre fichier .env

```
APP_ENV="XXXXXXXXXXXXXXX"
PORT=XXXXXX
BACK_LINK="http://XXXXXXXXXXXXXXXXXXXXXXXXX"
FRONT_LINK="http://XXXXXXXXXXXXXXXXXXXXXXXXXXX"

# DataBase
MYSQLDATABASE="XXXXXXXXXX"
MYSQLUSER="XXXXXXXXXXXX"
MYSQLPASSWORD="XXXXXXXXXXXXX"
MYSQLPORT=XXXXXX
MYSQLHOST="XXXXXXXXX"

#JWT
JWT_SECRET="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

#VirusTotal
VIRUSTOTAL_API_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

#SMTP
SMTP_PORT=XXXXXXXXXXXXXXXXX
SMTP_USER="XXXXXXXXXXXXXXXXXXXXX"
SMTP_PASSWORD="XXXXXXXXXXXXXXXXXXXXXX"
SMTP_HOST="smtp.XXXXXXXXXXXXXXXXX.io"
SMTP_SENDERMAIL="XXXXXXXXX@XXXXXXX.XXX"


NO_PROFILE_PICTURE="data:image/jpeg;base64,XXXXXXXXXXXXXXXXXXXXXXXXXXXX"

```

## Tech Stack

**Frontend:** React, Typescript, Sass, Recoil

<u>**Backend:**</u> Node, Express, Sequelize

## Packages 📚

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [helmet](https://www.npmjs.com/package/helmet)
- [mariadb](https://www.npmjs.com/package/mariadb)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [rimraf](https://www.npmjs.com/package/rimraf)
- [rimraf](https://www.npmjs.com/package/rimraf)
- [@babel/cli](https://www.npmjs.com/package/@babel/cli)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)

## Credits

Images
- [Unsplash](https://unsplash.com/)

Interface
- [Référence graphique](https://www.behance.net/gallery/102784977/Web-Application-Interface-PR-Club)

Icons
- [Radix-UI](https://icons.radix-ui.com/)
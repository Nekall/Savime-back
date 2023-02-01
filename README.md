<img src="https://i.goopics.net/03v8if.png" alt="logo savime" style="width:200px;"/>
      
![Savime Version](https://img.shields.io/badge/version-v0.0.1-white)

# Savime
### «The time-saver for teams & companies.»
Application orienté RH, Savime `seɪv.ɪm` sert à créer une communication rapide, simple & sécurisée entre des employé·es et le département RH d'une entreprise.
Que se soit le partage de documents, la gestion des congés ou l’accès aux informations importantes lié à l’entreprise & la carrière des employé·es.
Cette application se veux clef en main.

## Scripts disponibles

Lancez le serveur de *développement* :

```bash
npm run dev
```
Lancez le serveur de *production* :

```bash
npm run prod
```

Observez la console pour voir la connexion et le déploiement des tables.
Ouvrez [http://localhost:3001](http://localhost:3001) avec votre navigateur pour voir le résultat.

## Variables d'environnement

Pour exécuter ce projet, vous devrez ajouter les variables d'environnement suivantes à votre fichier .env

```
APP_ENV="XXXXXXXXXXXXXXX"
PORT=XXXXXX
BACK_LINK="http://XXXXXXXXXXXXXXXXXXXXXXXXX"
FRONT_LINK="http://XXXXXXXXXXXXXXXXXXXXXXXXXXX"

# DataBase
DB_NAME="savime_db"
DB_USER="XXXXXXXX"
DB_PASSWORD="XXXXXXXXX"
DB_PORT=XXXXXX
DB_HOST="XXXXXXXXXXXX"

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

**Client:** React, Recoil

**Server:** Node, Express


## Fonctionnalités
- ...

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
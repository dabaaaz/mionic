Bank in the pocket
=====================

Projet d'application commerciale permettant la tenue simplifiées de comptes bancaires.

# Process de travail
Pour chaque fonction identifiée pour la production d'une version suivre le process suivant :
- **UI** : ne créer que la partie interface, utiliser des données brutes statiques, appels de fonctions mais sans algorithmes et juste des retours de valeurs statiques. *Tests uniquement sur l'interface.*
- **MOTEUR** : l'interface est validée, utiliser des données brutes statiques, les appels de fonctions font maintenant appels à des classes et de vrais algorithmes. *Tests uniquement sur les classes et fonctions.*
- **DATAS** : l'interface est validée, les algorithmes aussi, les données brutes statiques sont remplacées au profits de données issues d'une base ou d'un fichier. *Tests uniquement sur la gestion des données.*

Tous les fichiers sources destinés à être transformés ou manipulés doivent se trouver dans le dossier _src_ et être manipulé par Grunt via le fichier *Gruntfile.js*

**Les tâches GRUNT :**
Pour initialiser le nouveau projet, après avoir changé le numéro de version dans package.json, modifié certains graphismes dans le dossier 1 et autres paramètres pour les plateformes... :

```
    "name": "Nom de l'application",
    "code": "nomdeapplication",
    "description": "Une description",
    "version": "a.b.c",
    "author": "Nom Prénom",
```

L'installation de l'ensemble, première compilation et génération pour les 3 plateformes.

```
	grunt install
```

Après un install il est possible de faire un *grunt run*

Pour faire un build (après avoir changé le numéro de version dans package.json) :
```
	grunt compile
```

Pour produire les compilations pour les plateformes après un build et les lancer en émulateurs (uniquement iOS et android) :
```
	grunt build
	grunt run
```

Pour faire une sauvegarde complète du dossier
```
    grunt save
```
ou une sauvegarde uniquement des sources
```
    grunt save:src
```

# Firefox OS
https://developer.mozilla.org/en-US/Apps/Tools_and_frameworks/common_libraries_and_frameworks

Mise à jour FXOS : http://forum.xda-developers.com/showthread.php?t=2628130 + elsimpicuitico.wordpress.com/firefoxos/

Helper how to run : https://developer.mozilla.org/en-US/Firefox_OS/Using_the_App_Manager

https://hacks.mozilla.org/2014/02/building-cordova-apps-for-firefox-os/

**/!\ Penser à ne pas laisser le livereload lors de l’exécution du simulateur Android /!\**

# Gestion des hooks (plugins / env / icons & splashes) :
http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs

Création des splashes Android (9-patches) : http://romannurik.github.io/AndroidAssetStudio/nine-patches.html
Les icônes sont dans le dossier src/icons et les splashscreens dans le dossier src/screens.

```
	<icon src="res/ios/icon.png" platform="ios" width="57" height="57" density="mdpi" />
    <platform name="amazon-fireos">
        <icon src="src/icons/android/ldpi.png" density="ldpi" />
        <icon src="src/icons/android/mdpi.png" density="mdpi" />
        <icon src="src/icons/android/hdpi.png" density="hdpi" />
        <icon src="src/icons/android/xhdpi.png" density="xhdpi" />
    </platform>
    <platform name="android">
        <icon src="res/android/ldpi.png" density="ldpi" />
        <icon src="res/android/mdpi.png" density="mdpi" />
        <icon src="res/android/hdpi.png" density="hdpi" />
        <icon src="res/android/xhdpi.png" density="xhdpi" />
    </platform>
    <platform name="firefoxos">
        <icon src="res/ff/logo.png" width="60" height="60" />
    </platform>
    <platform name="ios">
        <!-- iOS 7.0+ -->
        <!-- iPhone / iPod Touch  -->
        <icon src="res/ios/icon-60.png" width="60" height="60" />
        <icon src="res/ios/icon-60@2x.png" width="120" height="120" />
        <!-- iPad -->
        <icon src="res/ios/icon-76.png" width="76" height="76" />
        <icon src="res/ios/icon-76@2x.png" width="152" height="152" />
        <!-- iOS 6.1 -->
        <!-- Spotlight Icon -->
        <icon src="res/ios/icon-40.png" width="40" height="40" />
        <icon src="res/ios/icon-40@2x.png" width="80" height="80" />
        <!-- iPhone / iPod Touch -->
        <icon src="res/ios/icon.png" width="57" height="57" />
        <icon src="res/ios/icon@2x.png" width="114" height="114" />
        <!-- iPad -->
        <icon src="res/ios/icon-72.png" width="72" height="72" />
        <icon src="res/ios/icon-72@2x.png" width="144" height="144" />
        <!-- iPhone Spotlight and Settings Icon -->
        <icon src="res/ios/icon-small.png" width="29" height="29" />
        <icon src="res/ios/icon-small@2x.png" width="58" height="58" />
        <!-- iPad Spotlight and Settings Icon -->
        <icon src="res/ios/icon-50.png" width="50" height="50" />
        <icon src="res/ios/icon-50@2x.png" width="100" height="100" />
    </platform>
```

Plugins basiques :

```
	org.apache.cordova.statusbar
	org.apache.cordova.dialogs
	org.apache.cordova.files
	org.apache.cordova.splashscreen
```

# Simulateurs
```
npm install -g ios-sim
emulator -avd ionic -gpu on
```

# Using merges to Customize Each Platform
While Cordova allows you to easily deploy an app for many different platforms, sometimes you need to add customizations. In that case, you don't want to modify the source files in various www directories within the top-level platforms directory, because they're regularly replaced with the top-level www directory's cross-platform source.

Instead, the top-level merges directory offers a place to specify assets to deploy on specific platforms. Each platform-specific subdirectory within merges mirrors the directory structure of the www source tree, allowing you to override or add files as needed. For example, here is how you might uses merges to boost the default font size for Android and Amazon Fire OS devices:

*Edit the www/index.html file, adding a link to an additional CSS file, overrides.css in this case:*

```
<link rel="stylesheet" type="text/css" href="css/overrides.css" />
```
Optionally create an empty www/css/overrides.css file, which would apply for all non-Android builds, preventing a missing-file error.
Create a css subdirectory within merges/android, then add a corresponding overrides.css file. Specify CSS that overrides the 12-point default font size specified within www/css/index.css, for example:

```
body { font-size:14px; }
```
When you rebuild the project, the Android version features the custom font size, while others remain unchanged.

# Note

- Pour partir encore plus propre, démarrer avec le fichier config suivant :

```
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.ionicframework.starter" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>Bank in the Pocket</name>
    <description>
        Application de gestion bancaire
    </description>
    <author email="pierre@onzedix.fr" href="http://onzedix.fr/">
        1110 Team
    </author>
    <content src="index.html" />
    <access origin="*" />
    <preference name="fullscreen" value="true" />
    <preference name="webviewbounce" value="false" />
    <preference name="UIWebViewBounce" value="false" />
    <preference name="DisallowOverscroll" value="true" />
    <feature name="StatusBar">
      <param name="ios-package" value="CDVStatusBar" onload="true" />
    </feature>
</widget>
```

- Gérer les plugins dans le dossier plugins, il se pourrait qu'il y en ait trop et qu'une alert s'affiche au lancement de l'émulateur Android

- Gérer la supression du whitescreen avant le splash Android, dans platforms/android/cordova/defaults.xml, juste avant le </widget>

```
<preference name="SplashScreen" value="splash" />
<preference name="SplashScreenDelay" value="2000"/>
```
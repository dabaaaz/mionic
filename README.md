Bank in the pocket
=====================

Projet d'application commerciale permettant la tenue simplifiées de comptes bancaires.


# Bug firefox navigation routes
https://developer.mozilla.org/en-US/Apps/Tools_and_frameworks/common_libraries_and_frameworks

Mise à jour FXOS : http://forum.xda-developers.com/showthread.php?t=2628130 + elsimpicuitico.wordpress.com/firefoxos/

Helper how to run : https://developer.mozilla.org/en-US/Firefox_OS/Using_the_App_Manager

# Firefox OS
https://hacks.mozilla.org/2014/02/building-cordova-apps-for-firefox-os/

*/!\ Penser à ne pas laisser le livereload lors de l’exécution du simulateur Android /!\*

# Gestion des hooks (plugins / env / icons & splashes) :
http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs

Création des splashes Android (9-patches) : http://romannurik.github.io/AndroidAssetStudio/nine-patches.html
Les icônes sont dans des et les splashscreens dans les dossiers

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

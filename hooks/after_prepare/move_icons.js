#!/usr/bin/env node


//
// This hook copies various resource files from our version control system directories into the appropriate platform specific location
//

//var path_from_android = "res/android/";
//var path_from_ios = "res/ios/";
//var path_from_fxos = "res/firefoxos/";

//var path_to_android = "platforms/android/res/";
//var path_to_ios = "platforms/ios/Bank in the Pocket/Resources/";
//var path_to_fxos : "res/firefoxos/";


// configure all the files to copy.  Key of object is the source file, value is the destination location.  It's fine to put all platforms' icons and splash screen files here, even if we don't build for all platforms on each developer's box.
var filestocopy = [

/*

Android icons :

LDPI- icon-32x32

MDPI- icon-48x48

HDPI- icon 72x72

XHDPI- icon-96x96

*/

{
    "src/res/icons/android/icon-hdpi.png": "platforms/android/res/drawable-hdpi/icon.png"
}, {
    "src/res/icons/android/icon-ldpi.png": "platforms/android/res/drawable-ldpi/icon.png"
}, {
    "src/res/icons/android/icon-mdpi.png": "platforms/android/res/drawable-mdpi/icon.png"
}, {
    "src/res/icons/android/icon-xhdpi.png": "platforms/android/res/drawable-xhdpi/icon.png"
},

/*

Android splashes :

ldpi : 320*426
mdpi : 320*470
hdpi : 480*640
xhdpi : 720*960

Penser à ajouter dans platforms/android/cordova/defaults.xml, juste avant le </widget>

<preference name="SplashScreen" value="splash" />
<preference name="SplashScreenDelay" value="2000"/>


 */

{
    "src/res/screens/android/screen-hdpi-portrait.png": "platforms/android/res/drawable-hdpi/splash.png"
}, {
    "src/res/screens/android/screen-ldpi-portrait.png": "platforms/android/res/drawable-ldpi/splash.png"
}, {
    "src/res/screens/android/screen-mdpi-portrait.png": "platforms/android/res/drawable-mdpi/splash.png"
}, {
    "src/res/screens/android/screen-xhdpi-portrait.png": "platforms/android/res/drawable-xhdpi/splash.png"
},

/*

iOS icons :

REDO : 57 + 57@2x + 50 + 50@2x

*/

{
    "src/res/icons/ios/icon-small@x2.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon-small@2x.png"
}, {
    "src/res/icons/ios/icon-small.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon-small.png"
}, {
    "src/res/icons/ios/icon-40@x2.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon-40@2x.png"
}, {
    "src/res/icons/ios/icon-40.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon-40.png"
}, {
    "src/res/icons/ios/icon-50@x2.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon-50@2x.png"
}, {
    "src/res/icons/ios/icon-50.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon-50.png"
}, {
    "src/res/icons/ios/icon-basic@x2.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon@2x.png"
}, {
    "src/res/icons/ios/icon-basic.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon.png"
}, {
    "src/res/icons/ios/icon-60@x2.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon-60@2x.png"
}, {
    "src/res/icons/ios/icon-60.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon-60.png"
}, {
    "src/res/icons/ios/icon-72@x2.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon-72@2x.png"
}, {
    "src/res/icons/ios/icon-72.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon-72.png"
}, {
    "src/res/icons/ios/icon-76@x2.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon-76@2x.png"
}, {
    "src/res/icons/ios/icon-76.png": "platforms/ios/Bank in the Pocket/Resources/icons/icon-76.png"
},

/*

iOS splashes :

OK : Default-568h@2x~iphone (640*1136) + 640*960 + 320*480
KO : iPad ones

*/

{
    "src/res/screens/ios/screen-iphone-portrait-568h.png": "platforms/ios/Bank in the Pocket/Resources/splash/Default-568h@2x~iphone.png"
}, {
    "src/res/screens/ios/screen-iphone-portrait.png": "platforms/ios/Bank in the Pocket/Resources/splash/Default~iphone.png"
}, {
    "src/res/screens/ios/screen-iphone-portrait-2x.png": "platforms/ios/Bank in the Pocket/Resources/splash/Default@2x~iphone.png"
}/*, {
    "src/res/screens/ios/   bigsplash-portrait@2x.png": "platforms/ios/Bank in the Pocket/Resources/splash/Portrait@2x.png"
}*/,

/*

FXOS icons

 */

{
    "src/res/icons/firefoxos/icon-30.png": "platforms/firefoxos/www/icons/bigicon-30.png"
}, {
    "src/res/icons/firefoxos/icon-60.png": "platforms/firefoxos/www/icons/bigicon-60.png"
}, {
    "src/res/icons/firefoxos/icon-128.png": "platforms/firefoxos/www/icons/bigicon-128.png"
}

];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

// Create folder to host the firefoxos icons
// See http://cordova.apache.org/docs/en/3.5.0/guide_platforms_firefoxos_index.md.html to make the www/manifest.webapp file
if(!fs.existsSync("platforms/firefoxos/www/icons")){
 fs.mkdirSync("platforms/firefoxos/www/icons", 0755, function(err){
   if(err){
     console.log(err);
     response.send("ERROR! Can't make the directory! \n"); // echo the result back
   }
 }); 
}

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
        console.log("hook copy");
        var val = obj[key];
        var srcfile = path.join(rootdir, key);
        var destfile = path.join(rootdir, val);
        //console.log("copying "+srcfile+" to "+destfile);
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
        }
    });
});
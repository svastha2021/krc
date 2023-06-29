// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://node-devel.vibhavatech.com/v1/',
  firebaseConfig: {
    apiKey: "AIzaSyB_aDK4dfM2rpCI_LpHqK4l78KY-fJWAZ8",
    authDomain: "krc-dev-f64de.firebaseapp.com",
    projectId: "krc-dev-f64de",
    storageBucket: "krc-dev-f64de.appspot.com",
    messagingSenderId: "191321782976",
    appId: "1:191321782976:web:de9ce897d518f52ef84b25",
    measurementId: "G-VHV3X6FLBF"
    // apiKey: "AIzaSyDQZkTXh79XU7PEulKlK2yHTnZ35aENbFs",
    // authDomain: "krc-dev-20278.firebaseapp.com",
    // projectId: "krc-dev-20278",
    // storageBucket: "krc-dev-20278.appspot.com",
    // messagingSenderId: "916388365716",
    // appId: "1:916388365716:web:513f72411663aa9ccbbb81",
    // measurementId: "G-FQHPHJPDG7"
  },
  // apiUrl:'http://45.79.126.173:4003/v1/',
  local: 'http://localhost:4003/v1/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

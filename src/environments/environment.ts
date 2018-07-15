// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD9BFoPflyQ4k86JIkROYRojrUcypm9Xo4',
    authDomain: 'my-fitness-tracker-b69f4.firebaseapp.com',
    databaseURL: 'https://my-fitness-tracker-b69f4.firebaseio.com',
    projectId: 'my-fitness-tracker-b69f4',
    storageBucket: 'my-fitness-tracker-b69f4.appspot.com',
    messagingSenderId: '949650613120'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

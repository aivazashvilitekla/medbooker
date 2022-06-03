// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'medbooker-omedia',
    appId: '1:685561094042:web:db4d429942475b37fc2423',
    storageBucket: 'medbooker-omedia.appspot.com',
    apiKey: 'AIzaSyDaWSFH7uhcP7jc7XiXcwD8U1kSZRvuVTk',
    authDomain: 'medbooker-omedia.firebaseapp.com',
    messagingSenderId: '685561094042',
    measurementId: 'G-JW6FJQ120M',
  },
  production: false,
  baseUrl: 'https://angular-bootcamp-api.omedialab.com/bootcamp-api/api/v1/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

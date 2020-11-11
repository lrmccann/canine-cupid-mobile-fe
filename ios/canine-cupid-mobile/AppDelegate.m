@import UIKit
@import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?

  func application(_ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions:
      [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        [FIRApp configure];
    // FirebaseApp.configure()
    return true
  }
//   func authentication()
//   [[FIRAuth auth] createUserWithEmail:email
//                            password:password
//                          completion:^(FIRAuthDataResult * _Nullable authResult,
//                                       NSError * _Nullable error) {
//   // ...
// }];
}
import { Provider } from 'react-redux';
import store from "@/lib/store";
import AppNavigator from "./pages/appNavigator";
import HomePage from './pages/homePage';
export default function App() {
  return (
    <Provider store={store}>
      {/* <HomePage></HomePage> */}
      <AppNavigator />
    </Provider>
      // <GoogleOAuthProvider clientId="371089798315-eeri85ic9lt17njh1dl1th1q92lfk2h7.apps.googleusercontent.com">
      //   <RegistrationPage></RegistrationPage>
      // </GoogleOAuthProvider>
  );
}


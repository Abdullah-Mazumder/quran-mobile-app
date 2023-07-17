import { store, persistor } from "./src/redux/app/store";
import { Provider } from "react-redux";
import MainApp from "./src/MainApp.jsx";
import CustomStatusBar from "./src/components/CustomStatusBar.jsx";
import { PersistGate } from "redux-persist/integration/react";
import ReduxPersistLoadingPage from "./src/screens/ReduxPersistLoadingPage";
import { Provider as MuiProvider } from "@react-native-material/core";

const App = () => {
  return (
    <Provider store={store}>
      <MuiProvider>
        <PersistGate
          loading={<ReduxPersistLoadingPage />}
          persistor={persistor}
        >
          <CustomStatusBar />
          <MainApp />
        </PersistGate>
      </MuiProvider>
    </Provider>
  );
};

export default App;

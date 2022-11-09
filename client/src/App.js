import React from "react";
import { Provider } from "react-redux";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";


import Navbar from "./components/Routes";
import { PersistGate } from "redux-persist/integration/react";
import { store, Persistor } from "./redux/store";

toast.configure()
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <Navbar />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;

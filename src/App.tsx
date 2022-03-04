import "./App.css";
import { observer } from "mobx-react";
import { Route, Routes } from "react-router-dom";
import PricingPage from "pages/PricingPage";

const App = observer(() => {
  return (
    <Routes>
      <Route>
        <Route path="" element={<PricingPage />} />
      </Route>
    </Routes>
  );
});

export default App;

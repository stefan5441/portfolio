import { ActivityDashboard } from "./components/styling/ActivityDashboard";
import { Header } from "./components/styling/Header";

function App() {
  return (
    <div className="mx-30 my-20">
      <Header>Stefan Chambov</Header>

      <div>Check what I'm doing lately: </div>
      <ActivityDashboard />
    </div>
  );
}

export default App;

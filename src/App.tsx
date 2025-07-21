import { ActivityDashboard } from "./components/styling/ActivityDashboard/ActivityDashboard";
import { Header } from "./components/styling/Header";

function App() {
  return (
    <div className="mx-24 my-20">
      <Header>Stefan Chambov</Header>

      <div>Check what I'm doing lately: </div>
      <ActivityDashboard />
    </div>
  );
}

export default App;

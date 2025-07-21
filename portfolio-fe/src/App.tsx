// import { ActivityDashboard } from "./components/styling/ActivityDashboard/ActivityDashboard";
import { useEffect } from "react";
import { Header } from "./components/styling/Header";
import { fetchLeetCodeActivity } from "./utils";

function App() {
  useEffect(() => {
    async function fetchData() {
      const activity = await fetchLeetCodeActivity("5441anr");
      console.log("leetcode: ", activity);
    }

    fetchData();
  }, []);

  return (
    <div className="mx-24 my-20">
      <Header>Stefan Chambov</Header>

      <div>Check what I'm doing lately: </div>
      {/* <ActivityDashboa  rd /> */}
    </div>
  );
}

export default App;

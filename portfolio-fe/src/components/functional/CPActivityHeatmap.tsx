import { useEffect, useState } from "react";
import { ActivityHeatmap, type HeatmapActivity } from "../styling/ActivityHeatmap/ActivityHeatmap";
import { fetchCodeforcesActivity, fetchLeetCodeActivity } from "../../utils";

export const CPActivityHeatmap = () => {
  const [leetcodeActivities, setLeetcodeActivities] = useState<HeatmapActivity[]>();
  const [codeforcesActivities, setCodeforcesActivities] = useState<HeatmapActivity[]>();

  const leetcodeUsername = "5441anr";
  const codeforcesUsername = "widepeepohappy18";

  useEffect(() => {
    async function fetchActivities() {
      const fetchedLeetcodeActivities = await fetchLeetCodeActivity(leetcodeUsername);
      // const fetchedCodeforcesActivities = await fetchCodeforcesActivity(codeforcesUsername);

      setLeetcodeActivities(fetchedLeetcodeActivities);
      // setCodeforcesActivities(fetchedCodeforcesActivities);
    }

    fetchActivities();
  }, []);

  return <ActivityHeatmap activities={leetcodeActivities} />;
};

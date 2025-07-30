import { useEffect, useState } from "react";
import type { HeatmapActivity, HeatmapColor } from "../styling/ActivityHeatmap/types";
import { ActivityHeatmap } from "../styling/ActivityHeatmap/ActivityHeatmap";
import { fetchCodeforcesActivity, fetchLeetCodeActivity } from "../../utils";
import { Spinner } from "../styling/Spinner";

type Props = {
  type: "leetcode" | "codeforces";
  color?: HeatmapColor;
};

export const CPActivityHeatmap: React.FC<Props> = ({ type, color }) => {
  const [activities, setActivities] = useState<HeatmapActivity[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const leetcodeUsername = "5441anr";
  const codeforcesUsername = "widepeepohappy18";

  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      setError(null);

      try {
        let data: HeatmapActivity[] = [];

        if (type === "leetcode") {
          data = await fetchLeetCodeActivity(leetcodeUsername);
        } else if (type === "codeforces") {
          data = await fetchCodeforcesActivity(codeforcesUsername);
        }

        setActivities(data);
      } catch {
        setError("Failed to load activity.");
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [type]);

  if (loading)
    return (
      <div className="h-42 flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (error || !activities) return <div className="h-42 flex items-center justify-center">{error}</div>;

  return (
    <ActivityHeatmap
      title={type === "leetcode" ? "Leetcode activity" : type === "codeforces" ? "Codeforces activity" : ""}
      profileLink={
        type === "leetcode"
          ? "https://leetcode.com/u/5441anr/"
          : type === "codeforces"
          ? "https://codeforces.com/profile/widepeepohappy18"
          : ""
      }
      activities={activities}
      color={color}
      key={type}
    />
  );
};

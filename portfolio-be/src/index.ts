import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

const LEETCODE_URL = "https://leetcode.com/graphql";
const CODEFORCES_URL = "https://codeforces.com/api/user.status";

app.use(express.json());

// TODO: Check the levels stats

app.get("/activity/leetcode", async (req: Request, res: Response) => {
  const username = req.query.username as string;
  if (!username) {
    return res.status(400).json({ error: "Username query param is required" });
  }

  try {
    const axiosResponse = await axios.post(
      LEETCODE_URL,
      {
        query: `
          query getUserProfileCalendar($username: String!) {
            matchedUser(username: $username) {
              userCalendar {
                submissionCalendar
              }
            }
          }
        `,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const calendarString = axiosResponse.data.data.matchedUser.userCalendar.submissionCalendar;
    const calendar = JSON.parse(calendarString);

    const converted = Object.entries(calendar).map(([timestamp, count]) => {
      const date = new Date(+timestamp * 1000).toISOString().split("T")[0];
      const c = Number(count);
      let level = 0;
      if (c >= 1 && c <= 2) level = 1;
      else if (c <= 5) level = 2;
      else if (c <= 10) level = 3;
      else if (c >= 11) level = 4;

      return { date, count: c, level };
    });

    res.json(converted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch LeetCode activity" });
  }
});

app.get("/activity/codeforces", async (req: Request, res: Response) => {
  const username = req.query.username as string;
  if (!username) {
    return res.status(400).json({ error: "Username query param is required" });
  }

  try {
    const response = await axios.get(CODEFORCES_URL, {
      params: { handle: username },
    });

    const submissions = response.data.result;

    const submissionMap: Record<string, number> = {};
    submissions.forEach((submission: any) => {
      const date = new Date(submission.creationTimeSeconds * 1000).toISOString().split("T")[0];
      submissionMap[date] = (submissionMap[date] || 0) + 1;
    });

    const result = Object.entries(submissionMap).map(([date, count]) => {
      const c = Number(count);
      let level = 0;
      if (c >= 1 && c <= 2) level = 1;
      else if (c <= 5) level = 2;
      else if (c <= 10) level = 3;
      else if (c >= 11) level = 4;

      return { date, count: c, level };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Codeforces activity" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

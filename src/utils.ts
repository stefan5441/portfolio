export const fetchLeetCodeActivity = async (username: string) => {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
    }),
  });

  const data = await res.json();
  const calendar = JSON.parse(data.data.matchedUser.userCalendar.submissionCalendar);
  return calendar;
};

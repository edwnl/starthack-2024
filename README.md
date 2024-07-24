## Try it out!
https://starthack-2024-bysebts-projects.vercel.app/

## What is Groupzy?
A social platform built with Next.js for students to find study groups, log sessions, connect with friends and compete on leaderboards for rewards.

## What it does
- Create Study Groups: Students can create study groups based on location and study topic.
- Find Study Groups: Students can enter their location, and a list of nearby group will show up. Businesses can sponsor us to have their location displayed at the top.
- Log Study Sessions: We collect statistics about time studied and study streak.
- Friends: Students can add other students as friends to view social posts and join friend-only groups.
- Leaderboard: Compete with friends and classmates on weekly, monthly, yearly and lifetime leaderboards. 
- Distraction Locking: Chrome extension and mobile app to lock users from accessing distractions such as social media and games.
- Social Feed: For students to connect and share their achievements, upcoming sessions. Businesses can sponsor posts on this feed.
- Responsive: Beautiful on devices of all sizes.

## How we built it
- Frontend: Next.js 14 with TailwindCSS & Ant Design 5.
- Backend: React server actions connected to a Google Firebase Firestore database.
- Authentication: Firebase Auth with Gmail login integration.

## Challenges we ran into
- The social aspect of the app, including how willing students are to use it, physical security and addressing cheating.
- Learning about and debugging new React and Next features like Server Actions and Server Components. 
- Implementing the Google Maps API for auto complete suggestions.
- Maintaining low costs and navigating between cloud providers.
- How to efficiently update the leaderboards.
- Security of our backend API with Server Actions.

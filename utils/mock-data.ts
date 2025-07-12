export const mockQuestions = [
  {
    id: "1",
    title: "How to use React hooks effectively in a large application?",
    content:
      "I'm working on a large React application and I'm wondering about the best practices for using hooks. Should I create custom hooks for everything? How do I manage state across components?",
    tags: ["react", "hooks", "javascript", "state-management"],
    author: {
      id: "user1",
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 2450,
    },
    upvotes: 15,
    downvotes: 2,
    answers: 3,
    views: 234,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    hasAcceptedAnswer: true,
  },
  {
    id: "2",
    title: "Best practices for API error handling in Next.js?",
    content:
      "What are the recommended approaches for handling API errors in Next.js applications? Should I use try-catch blocks everywhere or is there a more elegant solution?",
    tags: ["nextjs", "api", "error-handling", "typescript"],
    author: {
      id: "user2",
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 1820,
    },
    upvotes: 8,
    downvotes: 0,
    answers: 1,
    views: 156,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    hasAcceptedAnswer: false,
  },
  {
    id: "3",
    title: "How to optimize database queries in PostgreSQL?",
    content:
      "I'm experiencing slow query performance in my PostgreSQL database. What are some techniques I can use to optimize my queries and improve performance?",
    tags: ["postgresql", "database", "performance", "sql"],
    author: {
      id: "user3",
      name: "Carol Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 3100,
    },
    upvotes: 22,
    downvotes: 1,
    answers: 0,
    views: 445,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    hasAcceptedAnswer: false,
  },
  {
    id: "4",
    title: "Understanding CSS Grid Layout for responsive design",
    content:
      "I'm trying to build a complex responsive layout using CSS Grid. What are some advanced concepts and common pitfalls to watch out for?",
    tags: ["css", "responsive-design", "frontend"],
    author: {
      id: "user1", // Same as Alice Johnson
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 2450,
    },
    upvotes: 10,
    downvotes: 0,
    answers: 2,
    views: 180,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    hasAcceptedAnswer: false,
  },
  {
    id: "5",
    title: "Implementing Server-Side Rendering (SSR) with Vue.js and Nuxt.js",
    content:
      "I need to implement SSR for my Vue.js application to improve SEO and initial load performance. What's the best way to do this using Nuxt.js?",
    tags: ["vue", "nuxt", "ssr", "javascript"],
    author: {
      id: "user6",
      name: "Frank Green",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 950,
    },
    upvotes: 5,
    downvotes: 0,
    answers: 0,
    views: 90,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    hasAcceptedAnswer: false,
  },
  {
    id: "6",
    title: "How to secure a REST API with JWT authentication?",
    content:
      "I'm building a REST API and want to use JWT for authentication. What are the best practices for generating, storing, and validating JWTs?",
    tags: ["security", "api", "jwt", "authentication"],
    author: {
      id: "user7",
      name: "Grace Hopper",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 5000,
    },
    upvotes: 30,
    downvotes: 0,
    answers: 5,
    views: 700,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    hasAcceptedAnswer: true,
  },
  {
    id: "7",
    title: "Understanding the Event Loop in Node.js",
    content:
      "Can someone explain the Node.js event loop in simple terms? I'm struggling to grasp how asynchronous operations are handled.",
    tags: ["nodejs", "javascript", "event-loop", "async"],
    author: {
      id: "user2", // Same as Bob Smith
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 1820,
    },
    upvotes: 18,
    downvotes: 0,
    answers: 4,
    views: 300,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    hasAcceptedAnswer: false,
  },
]

export const mockAnswers = [
  {
    id: "1",
    questionId: "1",
    content:
      "Great question! Here are some best practices for using React hooks in large applications:<br><br>1. <strong>Create custom hooks for reusable logic</strong> - If you find yourself repeating the same stateful logic across components, extract it into a custom hook.<br><br>2. <strong>Use useCallback and useMemo wisely</strong> - Don't overuse them, but they're great for preventing unnecessary re-renders.<br><br>3. <strong>Consider using useReducer for complex state</strong> - When useState becomes unwieldy, useReducer can help manage complex state transitions.",
    author: {
      id: "user4",
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 4200,
    },
    upvotes: 12,
    downvotes: 0,
    isAccepted: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "2",
    questionId: "1",
    content:
      "I'd also add that you should consider using Context API sparingly. While it's tempting to put everything in context, it can lead to unnecessary re-renders. Instead, consider state management libraries like Zustand or Redux Toolkit for complex global state.",
    author: {
      id: "user5",
      name: "Eva Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 2800,
    },
    upvotes: 8,
    downvotes: 1,
    isAccepted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "3",
    questionId: "2",
    content:
      "For API error handling in Next.js, I recommend using a centralized error handling utility. You can create a custom `fetch` wrapper that intercepts responses and throws specific error types. Then, catch these errors in your `getServerSideProps` or client-side `useEffect` hooks and display user-friendly messages using a toast notification system.",
    author: {
      id: "user1",
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 2450,
    },
    upvotes: 5,
    downvotes: 0,
    isAccepted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "4",
    questionId: "4",
    content:
      "CSS Grid is fantastic! A common pitfall is not understanding `grid-template-areas` properly. It allows you to name areas of your grid and then place items into those areas, making complex layouts much more readable. Also, remember `fr` units for flexible sizing.",
    author: {
      id: "user7",
      name: "Grace Hopper",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 5000,
    },
    upvotes: 7,
    downvotes: 0,
    isAccepted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "5",
    questionId: "4",
    content:
      "Another tip for CSS Grid: use `minmax()` for flexible columns/rows that don't shrink below a certain size. This is great for responsive design where you want content to adapt but not become unreadable.",
    author: {
      id: "user4",
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 4200,
    },
    upvotes: 3,
    downvotes: 0,
    isAccepted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.5).toISOString(),
  },
]

export const mockTags = [
  { name: "javascript", popularity: 100 },
  { name: "react", popularity: 95 },
  { name: "typescript", popularity: 80 },
  { name: "nodejs", popularity: 75 },
  { name: "python", popularity: 70 },
  { name: "css", popularity: 65 },
  { name: "html", popularity: 60 },
  { name: "nextjs", popularity: 55 },
  { name: "api", popularity: 50 },
  { name: "database", popularity: 45 },
  { name: "sql", popularity: 40 },
  { name: "authentication", popularity: 35 },
  { name: "performance", popularity: 30 },
  { name: "state-management", popularity: 25 },
  { name: "hooks", popularity: 20 },
  { name: "error-handling", popularity: 15 },
  { name: "responsive-design", popularity: 10 },
  { name: "frontend", popularity: 8 },
  { name: "vue", popularity: 7 },
  { name: "nuxt", popularity: 6 },
  { name: "ssr", popularity: 5 },
  { name: "security", popularity: 4 },
  { name: "jwt", popularity: 3 },
  { name: "event-loop", popularity: 2 },
  { name: "async", popularity: 1 },
].sort((a, b) => b.popularity - a.popularity) // Sort by popularity

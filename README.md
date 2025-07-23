---

# Thorough - Public Blog Platform

A modern, full-stack blog platform built with TypeScript and Next.js, designed to empower independent writers, citizen journalists, and readers to create, share, and engage with authentic stories and reporting.


---

## Features

- ✍️ **Write, Edit, and Publish**: Create and edit posts with support for images, subheadings, pull quotes, and related articles.
- 🔎 **Search & Tagging**: Smart post search by keywords or tags, with tags generated via Gemini AI.
- 👥 **User Authentication**: Sign up, log in, and manage your profile securely.
- 📰 **Like & Engage**: Like posts, discover related articles, and follow your favorite authors.
- 🏆 **Author Status**: Request and upgrade to author status with expertise and social profiles.
- 🌐 **Responsive, Accessible UI**: Built with Next.js, Geist/EB Garamond fonts, and full accessibility in mind.
- 🚀 **Deployable on Vercel**: Out-of-the-box support for Vercel deployments.

---

## Tech Stack

- **Frontend:** Next.js (TypeScript), Zustand, React
- **Backend:** Node.js, Express, Mongoose (MongoDB)
- **AI:** Google Generative AI (Gemini) for tag suggestions
- **Styling:** Tailwind, Geist/EB Garamond fonts
- **API:** RESTful endpoints for posts, users, and authentication

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun
- MongoDB (local or cloud)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Keshavs8055/public-blog.git
   cd public-blog
   ```

2. **Install dependencies for the client:**
   ```bash
   cd client
   npm install
   # or
   yarn
   ```

3. **Set up environment variables:**
   - Create a `.env.local` file in the `client` directory:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```
   - For server, add the required `.env` file with your `GOOGLE_API_KEY` and MongoDB URI.

4. **Run the development servers:**
   - Start the backend (API):
     ```bash
     cd server
     npm install
     npm run dev
     ```
   - Start the frontend:
     ```bash
     cd client
     npm run dev
     ```
   - Visit [http://localhost:3000](http://localhost:3000)

---

## Usage

- Sign up or log in to your account.
- Browse, like, and search for posts.
- If you wish to publish, request author status and fill out your profile.
- Create and manage your posts, with AI-powered tag generation.
- Enjoy reading and engaging with community-driven content!

---

## Project Structure

```
public-blog/
├── client/    # Next.js frontend app
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   ├── lib/           # API utilities
│   │   ├── utils/         # Zustand store, helpers, types
│   │   └── mocks/         # Sample post data
│   └── README.md
├── server/    # Express backend API
│   └── src/
│       ├── utils/
│       └── types.ts
```

---

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

---

## License

This project is for demonstration purposes. Add your preferred license if you intend to open source.

---

## Contributing

Pull requests are welcome! For major changes, open an issue first to discuss.

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Google Generative AI](https://ai.google/discover/generativeai)
- [Zustand](https://zustand-demo.pmnd.rs/)

## 👥 Team Details

- **Team ID:** 10097

### Members

1. **Nanda Kishore** – Team Leader  
2. **Vinay Burugu**
3. **Akshay**
4. **Vedik**


### 📄 README.md (Copy into your project root)

```markdown
# 🧠 StackIt QA Forum – Full Stack Project

StackIt is a full-stack **Question and Answer forum** web application inspired by StackOverflow. It supports features like authentication, posting questions, answering, accepting answers, and more. Built with **Next.js**, **MongoDB Atlas**, and **Express.js**.

---

## 🗂️ Folder Structure

```

stackit-qa-platform/
├── app/                  # Next.js 13 App Router pages
├── components/           # Reusable frontend components (UI, forms, editors, etc.)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities
├── public/               # Public static assets
├── styles/               # Global CSS
├── utils/                # Helper functions & mock data
├── backend/              # Express backend
│   ├── config/           # DB config
│   ├── controllers/      # Route controllers (Auth, Questions, Answers)
│   ├── middleware/       # Authentication middleware
│   ├── models/           # Mongoose models (User, Question, Answer)
│   ├── routes/           # Express routes
│   └── server.js         # Entry point for backend server
├── .env.local            # Frontend environment variables
├── .env                  # Backend environment variables
├── package.json          # Project metadata
├── tailwind.config.ts    # Tailwind CSS setup
├── next.config.mjs       # Next.js config
└── tsconfig.json         # TypeScript config

````

---

## ⚙️ Tech Stack

### Frontend:
- **Framework:** Next.js 13 (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS, ShadCN UI
- **Rich Text:** Advanced Rich Text Editor with emoji & image upload
- **Auth:** JWT (localStorage token-based)
- **Forms:** Custom and reusable form components
- **Notifications:** In-app notification dropdown system

### Backend:
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Authentication:** JWT (middleware protected)
- **Routing:** Modular REST APIs
- **Environment:** dotenv

---

## 🚀 Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/kishore-code-create/stackit-qa-forum.git
cd stackit-qa-forum
````

---

### 2️⃣ Install dependencies

#### Frontend:

```bash
pnpm install
# OR
npm install --legacy-peer-deps
```

#### Backend:

```bash
cd backend
pnpm install express mongoose cors dotenv
```

---

### 3️⃣ Set Environment Variables

#### 📦 Backend – `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

#### 🌐 Frontend – `.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

---

### 4️⃣ Run the project

#### 🧠 Backend:

```bash
cd backend
node server.js
```

#### 🌍 Frontend:

```bash
pnpm dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication Flow

* JWT is generated on login/register and stored in browser `localStorage`.
* Protected backend routes require JWT in `Authorization: Bearer <token>` header.
* Middleware decodes the token and attaches `req.user`.

---

## ✍️ Features

* ✅ User registration and login
* ✅ Ask a question
* ✅ View questions
* ✅ Post answers
* ✅ Accept answers
* ✅ Responsive UI
* ✅ Protected routes
* ✅ MongoDB Atlas integration
* ✅ Realtime notifications (UI only)

---

## 📦 Deployment

### 🚀 Frontend – [Vercel](https://vercel.com/)

* Set `NEXT_PUBLIC_API_BASE_URL` in Vercel Dashboard to your backend URL
* Ensure `pnpm` is used with `pnpm install --no-peer-dependency-check` in build settings if needed

### 🛢️ Backend – [Render](https://render.com/) or [Railway](https://railway.app/)

* Host the Express server
* MongoDB Atlas remains cloud-hosted
* Set up the `.env` variables in the deployment dashboard

---

## 🧪 Testing Instructions

1. Start backend: `node backend/server.js`
2. Go to frontend: `http://localhost:3000`
3. Register/login
4. Ask a question
5. View it in MongoDB Atlas
6. Post answers, accept them, and explore the UI

---

## 💡 Future Enhancements

* ✅ Voting system
* ✅ Tag-based filtering
* ✅ Pagination
* ✅ Search functionality
* ✅ Admin/moderator roles

---

## 📬 Contact

Made by [@kishore-code-create](https://github.com/kishore-code-create)

Pull requests and contributions are welcome!

```

---

Let me know if you'd like this `README.md` saved as a file or auto-pushed to your GitHub repo.
```

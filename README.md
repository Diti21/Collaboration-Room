#  CollabRoom — Real-Time Multi-Channel Chat App

**CollabRoom** is a real-time, channel-based messaging application built with **Next.js**, **Socket.IO**, **Express**, and **PostgreSQL**. Designed for collaboration, it allows users to chat in real-time across multiple channels with messages stored persistently in the database.

---

##  Key Features

-  **Real-Time Messaging** – Messages are instantly broadcasted to all connected users using WebSockets (Socket.IO).
-  **Multiple Channels** – Users can switch between channels like `#general`, `#development`, `#design`, etc.
-  **Persistent Chat History** – Messages are stored in a PostgreSQL database using Prisma ORM and automatically fetched when reloading or switching channels.
-  **REST + WebSocket Hybrid** – Combines REST APIs for fetching history and WebSockets for real-time interactions.
-  **Animated & Themed UI** – Clean, dark-themed interface built with Tailwind CSS and smooth animations (e.g., fade-in for new messages).
-  **Structured Message Models** – Separate handling for anonymous and "you" messages using separate Prisma models.
-  **Auto Scroll to Latest** – Always scrolls to the most recent message for seamless UX.
-  **Fully Extensible** – Built for adding features like authentication, reactions, notifications, etc.

---

##  Tech Stack

| Layer      | Tools Used |
|------------|------------|
| **Frontend** | Next.js (App Router), Tailwind CSS |
| **Backend**  | Express.js, Socket.IO |
| **Database** | PostgreSQL |
| **ORM**      | Prisma |
| **Live Chat**| WebSocket (via Socket.IO) |

---

## 🛠 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/<your-username>/collabroom.git
cd collabroom

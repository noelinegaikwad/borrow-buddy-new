BorrowBuddy 📦

Borrow What You Need. Share What You Don't.

BorrowBuddy is a full-stack web application that allows users to lend and borrow items from other users. Users can list items, browse available items, send borrow requests, communicate privately, and manage their borrowed/lent items.

---

🌐 Live Website

BorrowBuddy:
https://noelinegaikwad.github.io/borrow-buddy-new/

---

📌 Project Overview

BorrowBuddy is designed to make borrowing items easier within a community.

Instead of purchasing an item that may only be needed for a short period, users can find an available item on BorrowBuddy and request to borrow it.

Item owners can review requests, approve or reject them, and communicate privately with borrowers.

---

✨ Features

👤 User Authentication

- User registration
- User login
- User logout
- Supabase authentication
- User profiles

📦 Item Management

- List an item
- Add item name and details
- Select item category
- Add condition
- Set free or paid borrowing
- Add location
- Set item availability
- View items listed by the user
- Manage personal items

🔎 Browse Items

- View available items
- Search for items
- Browse different categories
- View item details
- Request an item from another user

📋 Borrow Requests

- Send borrow requests
- Add a message with the request
- View personal borrow requests
- Track request status
- Owner can approve or reject requests
- Borrower can mark an approved item as returned

💬 Private Chat

- Private conversation between borrower and owner
- Chat is connected to a specific item
- Messages are stored in Supabase
- Users can send and receive messages
- Chat status changes according to the borrow request

🔄 Availability Management

When an item is borrowed, its availability can be changed.

When the borrower returns the item, BorrowBuddy changes the item back to:

"available"

---

🛠️ Technology Stack

Frontend

- HTML5
- CSS3
- JavaScript

Backend

- Supabase

Database

- PostgreSQL through Supabase

Authentication

- Supabase Authentication

Hosting

- GitHub Pages

External Library

- Supabase JavaScript Client

---

🗄️ Database

BorrowBuddy uses Supabase PostgreSQL to store application data.

Main tables include:

- "profiles"
- "items"
- "borrow_requests"
- "conversations"
- "messages"

Basic Relationship

User
 │
 ├── Profile
 │
 ├── Listed Items
 │
 ├── Borrow Requests
 │
 └── Conversations
        │
        └── Messages

---

🔄 How BorrowBuddy Works

Step 1 — Create an Account

A user creates an account and logs in.

Step 2 — List an Item

The user can list an item they are willing to lend.

Step 3 — Browse

Another user can browse available items.

Step 4 — Send Borrow Request

The borrower selects an item and sends a request to the owner.

Step 5 — Owner Responds

The owner can:

- Approve the request
- Reject the request

Step 6 — Private Chat

The borrower and owner can communicate through a private chat connected to the item.

Step 7 — Borrow and Return

After borrowing the item, the borrower can mark it as returned.

The item then becomes available again.

---

📁 Project Structure

borrow-buddy-new/
│
├── index.html
├── browse.html
├── item.html
├── list-item.html
├── my-items.html
├── my-requests.html
├── chat.html
├── login.html
├── signup.html
│
├── auth.js
├── items-data.js
├── requests.js
├── supabase-config.js
│
└── README.md

---

🔐 Security

BorrowBuddy uses Supabase Authentication for user authentication.

Database access is controlled through Supabase policies and authenticated users.

Private conversations are designed to be accessible only by the borrower and owner involved in the conversation.

«Never upload private Supabase service-role keys, passwords, or other secret credentials to GitHub.»

---

🎯 Project Objectives

The main objectives of BorrowBuddy are:

1. Create a platform for borrowing and lending items.
2. Reduce unnecessary purchases by encouraging sharing.
3. Provide secure user authentication.
4. Allow users to manage their own items.
5. Implement real-time database-backed borrow requests.
6. Provide private communication between users.
7. Demonstrate full-stack web development skills.

---

🚀 Future Improvements

Possible future improvements include:

- ⭐ User ratings and reviews
- 🔔 Notifications
- 🖼️ Image uploads for items
- 🔍 Advanced search and filtering
- 📍 Map-based item discovery
- 👨‍💼 Admin dashboard
- 📊 User activity statistics
- 📱 Progressive Web App (PWA)
- ⚡ Real-time chat using Supabase Realtime

---

👩‍💻 Developer

Noeline Gaikwad

BCA Student

---

📜 License

This project was created for educational and academic purposes.

---

BorrowBuddy

Borrow what you need. Share what you don't. 📦

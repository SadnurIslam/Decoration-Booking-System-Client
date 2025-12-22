# 🎨 StyleDecor – Decoration Booking System (Client)

A modern web application for booking home, office, and event decoration services.  
Users can browse services, book decorations, make secure payments, and track project progress through role-based dashboards.

Built with **React**, **Firebase Authentication**, **TanStack Query**, and **TailwindCSS + DaisyUI**.

---

## 🌐 Live Site URL
🔗 https://decoration-booking-system-5.web.app/

---

## 🎯 Purpose

StyleDecor aims to digitalize decoration service booking by providing:
- Online service discovery
- Secure booking & payment
- Role-based dashboards (User, Admin, Decorator)
- Real-time project status tracking

---

## 🧠 Key Features

### 👤 User
- Browse & filter decoration services
- Book consultation or decoration services
- Select preferred date, time slot & location
- Update or cancel bookings
- Secure Stripe payment
- View payment history
- Apply to become a decorator

---

### 🛠 Admin
- Manage services & packages (CRUD)
- Manage all bookings
- Verify payment status
- Assign decorators to paid bookings
- Approve or reject decorator applications

---

### 🎭 Decorator
- View assigned projects
- Update project status step-by-step
- View daily schedule
- Track earnings & completed work

---

## 🧭 Dashboard Structure

### User Dashboard
| Page | Description |
|-----|------------|
| My Profile | View personal information |
| My Bookings | View, update, or cancel bookings |
| Payment History | View completed payments |
| Decorator Apply | Apply to become a decorator |

### Admin Dashboard
| Page | Description |
|------|------------|
| Manage Services | Add, edit, delete services |
| Manage Bookings | Assign decorators & check payments |
| Manage Decorators | Approve or reject decorators |

### Decorator Dashboard
| Page | Description |
|------|------------|
| Assigned Projects | View assigned bookings |
| Today’s Schedule | Daily work plan |
| Earnings Summary | Payment & earnings overview |

---

## 🧩 Tech Stack

**Frontend**
- React (Vite)
- React Router
- Firebase Authentication
- Axios
- @tanstack/react-query
- React Hook Form
- Framer Motion
- Tailwind CSS
- DaisyUI
- SweetAlert2

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```bash
VITE_apiUrl=https://your-backend-server-url
VITE_firebase_apiKey=your_firebase_api_key
VITE_firebase_authDomain=your_firebase_authDomain
VITE_firebase_projectId=your_firebase_projectId
VITE_firebase_storageBucket=your_firebase_storageBucket
VITE_firebase_messagingSenderId=your_firebase_messagingSenderId
VITE_firebase_appId=your_firebase_appId

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/SadnurIslam/Decoration-Booking-System-Client

# Go to project directory
cd Decoration-Booking-System-Client

# Install dependencies
npm install

# Run the app
npm run dev
```

---

## 🧾 Packages Used

| Package | Purpose |
|---------|---------|
| react-router-dom | Routing and navigation |
| firebase | Authentication |
| axios | API requests |
| @tanstack/react-query | Server state management |
| react-hook-form | Form handling |
| react-hot-toast | Success/error messages |
| react-tooltip | Tooltip display |
| tailwindcss + daisyui | Styling & themes |
| framer-motion | Animations |
| sweetalert2 | Alert dialogs |

---

## 🧑‍💻 Author

**Developer:** [Sadnur Islam](https://github.com/SadnurIslam)  
📧 **Contact:** sadnurislam@gmail.com  
🔗 **GitHub:** [github.com/SadnurIslam](https://github.com/SadnurIslam)  



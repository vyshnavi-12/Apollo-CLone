````markdown
# 🏥 Apollo Clone – Doctor Consultation Platform

A full-stack healthcare web application inspired by Apollo Hospitals. Built using **Next.js**, **React.js**, **Tailwind CSS**, and **MongoDB**, this app allows users to browse, filter, and view doctors. Admins can add new doctors via a dedicated dashboard.

---

## 🔗 Local URLs

- **Add Doctor Page**: [http://localhost:3000/admin/add-doctor](http://localhost:3000/admin/add-doctor)
- **Doctor List Page**: [http://localhost:3000/](http://localhost:3000/)

---

## 🚀 Features

- 🔎 Filter doctors by experience, mode of consultation, fees, and facility
- ➕ Add doctor with detailed info (name, location, qualifications, etc.)
- 📄 Paginated doctor listings
- 🎨 Clean, responsive UI using Tailwind CSS
- 💾 MongoDB database using Mongoose

---

## 📸 Screenshots

### 🧑‍⚕️ Doctor Listing Page
![Doctor Listing](./screenshots/doctor-listing.png)

### ➕ Add Doctor (Admin Panel)
![Add Doctor](./screenshots/add-doctor.png)

---

## 🧪 Run Locally

### 1. Clone & Setup

```bash
git clone https://github.com/yourusername/apollo-clone.git
cd apollo-clone
npm install
````

### 2. Add Environment Variable

Create `.env.local`:

```
MONGO_URI=your_mongodb_connection_string
```

### 3. Start App

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 💻 Tech Stack

* **Frontend**: React.js, Next.js
* **Backend**: Node.js (API Routes)
* **Styling**: Tailwind CSS
* **Database**: MongoDB with Mongoose

---

## 📁 Folder Overview

```
src/
├── app/
│   ├── admin/add-doctor/    # Add doctor form
│   └── api/doctors/         # API: Add/List doctors
├── models/doctor.js         # Mongoose schema
├── lib/dbConnect.js         # MongoDB connection
├── layout.js                # App layout
├── page.js                  # Homepage
```

---

## 👩‍💻 Author

**Sri Vyshnavi**
📧 [srivyshnavinakka@gmail.com](mailto:srivyshnavinakka@gmail.com)
🔗 [LinkedIn](https://linkedin.com/in/sri-vyshnavi-nakka) | [GitHub](https://github.com/vyshnavi-12)

---


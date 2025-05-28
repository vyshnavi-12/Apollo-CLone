# 🏥 Apollo Clone – Doctor Consultation Platform

A full-stack healthcare web application inspired by Apollo Hospitals. Built using **Next.js**, **React.js**, **Tailwind CSS**, and **MongoDB**, this app allows users to browse, filter, and view doctors. Admins can add new doctors via a dedicated dashboard.

---

## 🔗 Local URLs

- **Doctor List Page**: [http://localhost:3000/](http://localhost:3000/)
- **Add Doctor Page**: [http://localhost:3000/admin/add-doctor](http://localhost:3000/admin/add-doctor)

---

## 🚀 Features

- 🔎 **Smart Filtering**: Filter doctors by experience, mode of consultation, fees, and facility
- ➕ **Admin Dashboard**: Add new doctors with detailed information (name, location, qualifications, etc.)
- 📄 **Paginated Listings**: Browse doctors with smooth pagination
- 🎨 **Responsive Design**: Clean, modern UI built with Tailwind CSS
- 💾 **Database Integration**: MongoDB database with Mongoose ODM
- 🏥 **Professional Interface**: Healthcare-focused design inspired by Apollo Hospitals

---

## 📸 Screenshots

### 🧑‍⚕️ Doctor Listing Page
![Doctor Listing](./screenshots/doctor-listing.png)

### ➕ Add Doctor (Admin Panel)
![Add Doctor](./screenshots/add-doctor.png)

---

## 🧪 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account or local MongoDB installation
- Git

### 1. Clone & Setup
```bash
git clone https://github.com/yourusername/apollo-clone.git
cd apollo-clone
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_string
```

### 3. Start Development Server
```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 💻 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React.js, Next.js |
| **Backend** | Node.js (API Routes) |
| **Styling** | Tailwind CSS |
| **Database** | MongoDB with Mongoose |
| **Development** | ESLint, Prettier |

---

## 📁 Project Structure

```
Apollo-Clone/
├── .next/                           # Next.js build files
├── node_modules/                    # Dependencies
├── public/                          # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── placeholder-doctor.png       # Doctor placeholder image
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── add-doctor/          # Admin: Add doctor form page
│   │   ├── api/
│   │   │   └── doctors/
│   │   │       ├── add/             # POST: Add new doctor
│   │   │       └── list/            # GET: Fetch doctors list
│   │   ├── favicon.ico              # App favicon
│   │   ├── globals.css              # Global styles
│   │   ├── layout.js                # Root layout component
│   │   └── page.js                  # Homepage with doctor listings
│   ├── components/                  # Reusable UI components
│   ├── lib/                         # Utility functions
│   └── models/                      # Database schemas
├── .env                            # Environment variables
├── .gitignore                      # Git ignore rules
├── jsconfig.json                   # JavaScript configuration
├── next.config.mjs                 # Next.js configuration
├── package-lock.json               # Lock file for dependencies
├── package.json                    # Dependencies and scripts
├── postcss.config.mjs              # PostCSS configuration
├── README.md                       # Project documentation
└── tailwind.config.js              # Tailwind CSS configuration
```

---

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/doctors` | Fetch all doctors with filtering |
| `POST` | `/api/doctors` | Add a new doctor (Admin) |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👩‍💻 Author

**Sri Vyshnavi Nakka**

- 📧 Email: [srivyshnavinakka@gmail.com](mailto:srivyshnavinakka@gmail.com)
- 🔗 LinkedIn: [Sri Vyshnavi Nakka](https://linkedin.com/in/sri-vyshnavi-nakka)
- 🐙 GitHub: [vyshnavi-12](https://github.com/vyshnavi-12)

---

## 🙏 Acknowledgments

- Inspired by Apollo Hospitals' digital platform
- Built with modern web technologies for optimal performance
- Special thanks to the Next.js and MongoDB communities

---


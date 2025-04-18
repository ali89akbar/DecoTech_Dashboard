# 🧑‍💼 Admin Dashboard

A modern, responsive Admin Dashboard built with **React**, **Vite**, **Material-UI (MUI)**, **SCSS**, and **Recharts**, providing powerful UI features and state management on the frontend only (no backend).

---

## 🚀 Features

###  User Management (CRUD)
- View a list of users with Name, Email, Phone, and Role.
- Add new users with validation.
- Edit existing user details.
- Delete users from the list.
- All data is stored in **localStorage** to persist across page refreshes.

### 🌗 Theme Toggle
- Switch between **Dark** and **Light** mode using a toggle.
- Theme changes are applied across the whole app dynamically.

### 📅 Schedule Meeting
- Schedule a meeting using MUI's date and time pickers.
- Form validation and clean UI for better user experience.

### 📊 Analytics (Recharts)
- Display dummy analytics data using interactive **AreaChart** from Recharts.
- Responsive and clean data visualization for user performance and trends.

### ⚙️ Settings Page
- A simple Settings page placeholder for future preferences and configurations.

---

## 📁 Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Library**: [Material-UI (MUI)](https://mui.com/)
- **Styling**: SCSS Modules
- **Charts**: [Recharts](https://recharts.org/)
- **State & Storage**: React useState + useEffect + LocalStorage

---

## 🛠️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-username/admin-dashboard.git
cd admin-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev

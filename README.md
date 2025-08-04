# 📁 File Downloader Table

A reusable, accessible React component that displays a list of downloadable files with selectable rows and support for batch actions. This implementation focuses on clarity, state management, and performance optimizations (with optional virtualization support for large datasets).

---

## 🚀 Features

- ✅ Select individual files or all at once
- ✅ Indeterminate "Select All" checkbox logic
- ✅ Only `available` files are selectable
- ✅ Dialog modal shows selected file details before download
- ✅ Clean separation of header/body/modal components
- ✅ Fully accessible via keyboard & screen reader
- ✅ Styled without CSS frameworks
- ✅ Easily extensible (e.g., add pagination or virtualization)

---

### ✅ Future Improvements

Add pagination or infinite scroll

Use react-window for list virtualization

File grouping/filtering UI

Keyboard shortcuts for bulk actions

Clean inline CSS used in some files.

Move css to css modules

Use better ids for the file data rows. [use a uuid util or file path as the id]

---

## 📦 Tech Stack

- [React](https://react.dev/)
- [PropTypes](https://www.npmjs.com/package/prop-types)
- No external UI libraries or CSS frameworks

---

## 🛠️ Setup Instructions

### 1. Clone the project

```bash
git clone <your-git-url>
cd file-downloader

npm install

npm run dev

app should now be running at http://localhost:5173/

use npm run test to run unit tets.
```

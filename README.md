# 🐕 Dog Adoption Center

A modern, responsive web application for dog adoption with a unique 10-day trial system. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 🏠 **Core Functionality**
- **10-Day Trial System**: Customers can adopt dogs for 10 days to decide if it's a good fit
- **Full CRUD Operations**: Create, Read, Update, and Delete dog records
- **Adoption Management**: Track trial periods, decisions, and adoption status
- **Responsive Design**: Beautiful, modern UI that works on all devices

### 🐾 **Dog Management**
- **12 Different Breeds**: Golden Retriever, German Shepherd, Labrador Retriever, Bulldog, Beagle, Poodle, Rottweiler, Dachshund, Siberian Husky, Border Collie, Chihuahua, Great Dane
- **Detailed Information**: Each dog has comprehensive descriptions and personality traits
- **Status Tracking**: Available, On Trial, Adopted, Returned
- **Image Support**: High-quality dog photos with fallback handling

### 🔍 **Search & Filter**
- **Advanced Filtering**: Filter by breed, size, age, gender, and status
- **Sorting Options**: Sort by name, age, breed (ascending/descending)
- **Real-time Search**: Instant results as you type

### 👥 **User Experience**
- **Customer Interface**: Easy-to-use adoption forms and dog browsing
- **Admin Panel**: Complete management system for staff
- **Form Validation**: Comprehensive input validation and error handling
- **Local Storage**: Data persists between sessions

## 🛠️ **Technology Stack**

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API with useReducer
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Data Persistence**: Browser localStorage
- **Icons**: Heroicons (via Tailwind)

## 🚀 **Getting Started**

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dog-adoption-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 **Application Structure**

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── DogCard.tsx     # Individual dog display
│   ├── DogList.tsx     # Main dog listing with filters
│   ├── DogDetail.tsx   # Detailed dog information
│   ├── AdoptionForm.tsx # Trial adoption form
│   └── AdminPanel.tsx  # Admin management interface
├── contexts/           # React contexts
│   └── DogContext.tsx  # Global state management
├── types/              # TypeScript type definitions
│   └── index.ts        # Interface definitions
├── utils/              # Utility functions
│   └── storage.ts      # localStorage utilities
├── data/               # Initial data
│   └── dogs.ts         # Sample dog data
└── App.tsx             # Main application component
```

## 🎯 **Key Features Explained**

### 10-Day Trial System
1. **Customer Application**: Fill out adoption form with contact information
2. **Trial Period**: Dog status changes to "On Trial" for 10 days
3. **Decision Time**: Customer decides to adopt or return the dog
4. **Status Update**: Dog status updates based on customer decision

### CRUD Operations
- **Create**: Add new dogs through admin panel
- **Read**: Display dogs in grid/list view with detailed information
- **Update**: Edit dog information and adoption status
- **Delete**: Remove dogs from the system

### Admin Panel
- **Dog Management**: Add, edit, and delete dog records
- **Adoption Tracking**: View all adoption records and trial periods
- **Status Monitoring**: Track dog availability and trial progress

## 🎨 **Design Features**

- **Modern UI**: Clean, professional design with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: ARIA labels and keyboard navigation support
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: User-friendly error messages and validation

## 📊 **Data Management**

### Dog Information
- Name, breed, age, size, gender
- Detailed description and personality traits
- High-quality images with fallback handling
- Adoption status and trial tracking

### Adoption Records
- Customer contact information
- Trial start and end dates
- Adoption decision (Adopt/Return)
- Status tracking (Active/Completed/Cancelled)

## 🔧 **Customization**

### Adding New Dogs
1. Navigate to Admin Panel
2. Click "Add New Dog"
3. Fill in all required information
4. Submit to add to the system

### Modifying Styles
- Edit `src/index.css` for custom Tailwind components
- Modify `tailwind.config.js` for theme customization
- Update component classes for styling changes

## 🚀 **Deployment**

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your repository for automatic deployment
- **GitHub Pages**: Configure for static site hosting
- **Any Static Host**: Upload the `dist` folder contents

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🐕 **About the Dogs**

The application includes 12 carefully selected dog breeds, each with:
- **Detailed Descriptions**: Physical characteristics and care requirements
- **Personality Traits**: Temperament and behavior information
- **Suitability Information**: Best living situations and family types
- **High-Quality Images**: Professional photos showcasing each breed

### Featured Breeds
1. **Golden Retriever** - Family-friendly, intelligent, great with children
2. **German Shepherd** - Loyal, protective, excellent working dogs
3. **Labrador Retriever** - Energetic, friendly, perfect family pets
4. **Bulldog** - Calm, courageous, great apartment dogs
5. **Beagle** - Curious, friendly, excellent with children
6. **Poodle** - Intelligent, hypoallergenic, versatile sizes
7. **Rottweiler** - Confident, loyal, excellent guard dogs
8. **Dachshund** - Brave, loyal, perfect for small homes
9. **Siberian Husky** - Energetic, friendly, beautiful coat
10. **Border Collie** - Intelligent, energetic, excellent herders
11. **Chihuahua** - Alert, loyal, perfect for city living
12. **Great Dane** - Gentle giants, patient, great with families

---

**Built with ❤️ for dog lovers everywhere**

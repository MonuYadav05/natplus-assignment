﻿# Cricket Team Analytics Dashboard

A modern, interactive dashboard for analyzing cricket team performance data, built with Next.js and TypeScript.

## 🚀 Live Demo

[View Live Demo](https://natplus-assignment-sili.vercel.app/)

## ✨ Features

- **Interactive Map View**
  - Geographic visualization of team locations
  - Custom markers with team colors
  - Detailed team information on marker click
  - Real-time team selection

- **Team Performance Analytics**
  - Win/Loss statistics
  - Performance trends
  - Team comparison capabilities
  - Detailed match history

- **Real-time Data**
  - Live match updates
  - Dynamic statistics
  - Historical performance tracking

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts
  - Touch-friendly interactions

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Data Visualization**: Recharts
- **Maps**: Leaflet with React-Leaflet
- **Database**: Supabase
- **State Management**: React Hooks
- **Authentication**: Supabase Auth

## 🏗️ Architecture Decisions

1. **Next.js App Router**
   - Server-side rendering for better SEO
   - Improved performance with React Server Components
   - Built-in API routes
   - Simplified routing system

2. **TypeScript**
   - Type safety
   - Better developer experience
   - Enhanced code maintainability
   - Improved refactoring capabilities

3. **Tailwind CSS**
   - Utility-first approach
   - Rapid development
   - Consistent design system
   - Easy customization

4. **Supabase**
   - Real-time capabilities
   - Built-in authentication
   - PostgreSQL database
   - Easy to scale

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MonuYadav05/natplus-assignment.git
   cd natplus-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials in `.env.local`

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── dashboard/        # Dashboard-specific components
│   ├── ui/              # Reusable UI components
│   └── charts/          # Data visualization components
├── hooks/               # Custom React hooks
├── lib/                # Utility functions and configurations
├── public/             # Static assets
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## 🔧 Configuration

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎯 Features to Implement

- [ ] Player statistics and profiles
- [ ] Advanced filtering options
- [ ] Export functionality for reports
- [ ] User authentication and profiles
- [ ] Custom team comparisons
- [ ] Historical data analysis
- [ ] Match prediction models

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
- [Recharts](https://recharts.org/)
- [Leaflet](https://leafletjs.com/)

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

Made with ❤️ by [Monu Yadav]

# Azkar - Islamic Remembrance & Tasbih Counter

A comprehensive Next.js 14 application for Islamic remembrance (Azkar) with digital tasbih counter and progress tracking.

## Features

### 🔐 Authentication
- NextAuth.js with email/password and Google OAuth
- Secure user registration and login
- Session management

### 📖 Azkar System
- Dynamic azkar categories (Morning, Evening, Prayer, General)
- Arabic text with translations and references
- Progress tracking for each azkar
- Bookmarking system
- Responsive design with RTL support

### 📿 Digital Tasbih Counter
- Modern digital tasbih with smooth animations
- Customizable target counts
- Progress visualization
- Automatic saving to user account
- History tracking

### 📊 Dashboard
- Personal progress statistics
- Daily/weekly/monthly tracking
- Streak counting
- Bookmarked azkar management
- Quick access to all features

### 🎨 UI/UX
- Tailwind CSS with dark/light mode
- Framer Motion animations
- Mobile-responsive design
- Modern, clean interface
- RTL layout optimization

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI + Custom components
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd azkar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/azkar_db?schema=public"

   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses the following main models:

- **User**: User accounts and authentication
- **AzkarCategory**: Categories for organizing azkar
- **Azkar**: Individual azkar with Arabic text, translations, and references
- **AzkarProgress**: User progress tracking for each azkar
- **TasbihCount**: Daily tasbih count records
- **Bookmark**: User bookmarked azkar

## API Routes

- `/api/auth/*` - NextAuth.js authentication
- `/api/azkar/categories` - Get all azkar categories
- `/api/azkar/category/[categoryName]` - Get azkar by category
- `/api/azkar/progress` - Update azkar progress
- `/api/azkar/bookmark` - Toggle azkar bookmarks
- `/api/tasbih/save` - Save tasbih count
- `/api/tasbih/counts` - Get user's tasbih history
- `/api/dashboard/stats` - Get dashboard statistics

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── azkar/             # Azkar pages
│   ├── tasbih/            # Tasbih counter page
│   ├── dashboard/          # User dashboard
│   └── layout.tsx         # Root layout
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── navigation.tsx     # Main navigation
│   └── theme-provider.tsx # Theme context
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
└── styles/               # Global styles
```

## Features in Detail

### Azkar System
- **Categories**: Morning, Evening, Prayer, and General azkar
- **Progress Tracking**: Users can mark completion of each dhikr
- **Bookmarking**: Save favorite azkar for quick access
- **References**: Authentic hadith sources for each azkar

### Digital Tasbih
- **Smooth Animations**: Framer Motion powered interactions
- **Customizable Targets**: Set personal dhikr goals
- **Progress Visualization**: Real-time progress bars and statistics
- **History Tracking**: View past tasbih sessions

### Dashboard
- **Statistics**: Total azkar completed, tasbih counts, streak days
- **Today's Progress**: Category-wise completion status
- **Recent Activity**: Latest tasbih sessions
- **Bookmarked Azkar**: Quick access to saved azkar

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

Built with ❤️ for the Muslim community
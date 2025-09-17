const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Azkar application...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('📝 Please create a .env.local file with the following variables:');
  console.log(`
DATABASE_URL="postgresql://username:password@localhost:5432/azkar_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
  `);
  process.exit(1);
}

try {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('\n🔧 Generating Prisma client...');
  execSync('npm run db:generate', { stdio: 'inherit' });

  console.log('\n🗄️  Pushing database schema...');
  execSync('npm run db:push', { stdio: 'inherit' });

  console.log('\n🌱 Seeding database...');
  execSync('npm run db:seed', { stdio: 'inherit' });

  console.log('\n✅ Setup complete!');
  console.log('🚀 Run "npm run dev" to start the development server');
  console.log('🌐 Open http://localhost:3000 in your browser');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  process.exit(1);
}

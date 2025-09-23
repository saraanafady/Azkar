const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Azkar application...\n');

// Check if .env file exists, create if not
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  const envContent = `# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=demo-secret-for-development-change-in-production

# Database Configuration
DATABASE_URL="file:./dev.db"

# Environment
NODE_ENV=development`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created');
} else {
  console.log('✅ .env file already exists');
}

try {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Try to generate Prisma client (optional)
  try {
    console.log('\n🔧 Generating Prisma client...');
    execSync('npm run db:generate', { stdio: 'inherit' });
    console.log('✅ Prisma client generated');
  } catch (error) {
    console.log('⚠️  Prisma client generation failed, continuing with mock data...');
  }

  // Try to push database schema (optional)
  try {
    console.log('\n🗄️  Pushing database schema...');
    execSync('npm run db:push', { stdio: 'inherit' });
    console.log('✅ Database schema pushed');
  } catch (error) {
    console.log('⚠️  Database setup failed, using mock data instead...');
  }

  // Try to seed database (optional)
  try {
    console.log('\n🌱 Seeding database...');
    execSync('npm run db:seed', { stdio: 'inherit' });
    console.log('✅ Database seeded');
  } catch (error) {
    console.log('⚠️  Database seeding failed, using mock data instead...');
  }

  console.log('\n✅ Setup complete!');
  console.log('🚀 Run "npm run dev" to start the development server');
  console.log('🌐 Open http://localhost:3000 in your browser');
  console.log('📝 You can use any email/password to login (demo mode)');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  console.log('🔄 Continuing with basic setup...');
  console.log('📋 You can still run the application with: npm run dev');
}

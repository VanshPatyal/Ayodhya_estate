# Quick Start Script

Write-Host "🕉️  AYODHYA ESTATE - Quick Start Setup" -ForegroundColor Yellow
Write-Host "======================================`n" -ForegroundColor Yellow

# Check if Node.js is installed
Write-Host "Checking prerequisites..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if MongoDB is running (optional check)
Write-Host "`nChecking MongoDB..." -ForegroundColor Cyan
try {
    $mongoCheck = Get-Process mongod -ErrorAction SilentlyContinue
    if ($mongoCheck) {
        Write-Host "✅ MongoDB is running" -ForegroundColor Green
    } else {
        Write-Host "⚠️  MongoDB not detected locally" -ForegroundColor Yellow
        Write-Host "   You can use MongoDB Atlas instead" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  MongoDB check skipped" -ForegroundColor Yellow
}

# Install dependencies
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Cyan
Write-Host "This may take a few minutes...`n" -ForegroundColor Gray

# Root dependencies
Write-Host "Installing root dependencies..." -ForegroundColor Cyan
npm install

# Client dependencies
Write-Host "`nInstalling client dependencies..." -ForegroundColor Cyan
Set-Location client
npm install
Set-Location ..

# Server dependencies
Write-Host "`nInstalling server dependencies..." -ForegroundColor Cyan
Set-Location server
npm install
Set-Location ..

Write-Host "`n✅ All dependencies installed successfully!`n" -ForegroundColor Green

# Check for .env file
Write-Host "Checking environment configuration..." -ForegroundColor Cyan
if (Test-Path "server\.env") {
    Write-Host "✅ Environment file exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  Environment file not found!" -ForegroundColor Yellow
    Write-Host "   Creating .env from example..." -ForegroundColor Yellow
    Copy-Item "server\.env.example" "server\.env"
    Write-Host "✅ Created server\.env - PLEASE CONFIGURE IT BEFORE RUNNING!" -ForegroundColor Green
    Write-Host "`n⚠️  IMPORTANT: Edit server\.env with your credentials:" -ForegroundColor Red
    Write-Host "   - MongoDB URI" -ForegroundColor Yellow
    Write-Host "   - Cloudinary credentials" -ForegroundColor Yellow
    Write-Host "   - Admin password" -ForegroundColor Yellow
    Write-Host "   - Email settings`n" -ForegroundColor Yellow
}

# Next steps
Write-Host "`n🎉 Setup Complete!" -ForegroundColor Green
Write-Host "==================`n" -ForegroundColor Green

Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Configure server\.env with your credentials (see SETUP.md)" -ForegroundColor White
Write-Host "2. Add your images to client\public\assets\hero\" -ForegroundColor White
Write-Host "3. Run the application:`n" -ForegroundColor White

Write-Host "   To start development server:" -ForegroundColor Yellow
Write-Host "   npm run dev`n" -ForegroundColor Green

Write-Host "   Frontend will run on: http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Backend will run on:  http://localhost:5000`n" -ForegroundColor Cyan

Write-Host "📖 For detailed setup instructions, see SETUP.md" -ForegroundColor Gray
Write-Host "`n🙏 Jai Shri Ram!`n" -ForegroundColor Yellow

Before to execute the tests, you need to install Playwright and PowerShell:
1. Install n the Testing project: install-package Microsoft.Playwright.MSTest
2. Install Powershell:
- winget search Microsoft.PowerShell
- winget install --id Microsoft.PowerShell --source winget
- winget install --id Microsoft.PowerShell.Preview --source winget
3. Restart Visual Studio
4. Run in Powershell: pwsh bin/Debug/net9.0/playwright.ps1 install
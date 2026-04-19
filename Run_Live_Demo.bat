@echo off

cd /d "%~dp0"
echo ===================================================
echo   OWASP Juice Shop - Live Test Automation Demo
echo ===================================================
echo.
echo Starting Playwright UI Testing...
echo (Please do not touch your mouse or keyboard)
echo.

"juice-shop_19.2.1\node.exe" "node_modules\@playwright\test\cli.js" test

echo.
echo Test Execution Finished! Generating Report...
echo.
"juice-shop_19.2.1\node.exe" "node_modules\@playwright\test\cli.js" show-report

pause

@echo off
:: Nhắc nhập commit message
set /p commitMessage=Nhập commit message: 

:: Thực hiện các lệnh git
git add .
git commit -m "%commitMessage%"
git push --set-upstream origin dev

:: Hiển thị thông báo hoàn tất
echo ------------------------------------
echo Commit và push code hoàn tất!
echo ------------------------------------
pause

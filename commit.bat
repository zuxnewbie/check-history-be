@echo off
:: Display the list of branches
echo Available branches:
git branch
echo.

:: Prompt the user to enter the branch name
set /p branchName=Enter the branch name to push (default: current branch): 

:: If no branch name is entered, use the current branch
if "%branchName%"=="" (
    for /f "tokens=2 delims=* " %%a in ('git branch ^| findstr "*"') do set branchName=%%a
)

:: Prompt the user to enter a commit message
set /p commitMessage=Enter commit message: 

:: Execute git commands
git add .
git commit -m "%commitMessage%"
git push origin %branchName%

:: Display completion message
echo ------------------------------------
echo Code committed and pushed to branch "%branchName%" successfully!
echo ------------------------------------
pause

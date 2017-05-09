@echo off

title Passport Demo Git Graph
color e
prompt $sGraph$s$e$s

if errorlevel 1 goto one
if errorlevel 0 goto zero

:one
echo Try again
goto end

:zero
git log --oneline --decorate --graph --all
goto end

:end
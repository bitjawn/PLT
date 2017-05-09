@echo off

title Passport Demo Git Log
color a
prompt $sLog$s$e$s

if errorlevel 1 goto one
if errorlevel 0 goto zero

:one
echo Try again
goto end

:zero
git log --oneline --decorate
goto end

:end
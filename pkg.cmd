@echo off

title Passport Demo Package Manager
color e
prompt $sPackager$s$e$s

if errorlevel 1 goto one
if errorlevel 0 goto end

:one
echo Try again
goto end

:end
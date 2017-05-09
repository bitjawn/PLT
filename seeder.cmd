@echo off

title Vue Demo II Product DB Seeder
color e
prompt $sSeeder$s$e$s

if errorlevel 1 goto one
if errorlevel 0 goto end

:one
echo Try again
goto end

:end
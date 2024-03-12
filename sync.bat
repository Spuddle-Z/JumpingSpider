@echo off
setlocal

:: 获取当前日期
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (
    set day=%%a
    set month=%%b
    set year=%%c
)

:: 将日期格式化为YYYY-MM-DD
set date=%year%-%month%-%day%

:: 使用日期作为commit信息
git add *
git commit -m "%date%"
git push

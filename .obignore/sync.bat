@echo off
setlocal

cd ..

:: 获取当前日期
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do (
    set day=%%c
    set month=%%b
    set year=%%a
)

:: 将日期格式化为YYYY-MM-DD
set date=%year%-%month%-%day%

:: 使用日期作为commit信息
git add *
git commit -m "%date%"
git push

:: 将.obsidian文件夹同步到其它仓库中
copy .obsidian ../Private/.obsidian
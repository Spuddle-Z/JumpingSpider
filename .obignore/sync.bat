@echo off
setlocal

cd ..

:: 将.obsidian文件夹同步到其它仓库中
xcopy ".obsidian" "..\Private\.obsidian" /E /I
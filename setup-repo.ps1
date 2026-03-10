# fate.today 私有仓库创建脚本
# 可在任意位置运行，会自动定位到脚本所在目录

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
Set-Location $PSScriptRoot

if (-not (Test-Path "package.json")) {
    Write-Host "错误：请在包含 package.json 的项目目录下运行此脚本" -ForegroundColor Red
    exit 1
}

Write-Host "正在初始化 Git 仓库..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    git init
} else {
    Write-Host "Git 仓库已存在" -ForegroundColor Yellow
}

Write-Host "正在添加文件..." -ForegroundColor Cyan
git add .
$status = git status --short
if (-not $status) {
    Write-Host "没有需要提交的更改" -ForegroundColor Yellow
} else {
    git commit -m "Initial commit"
}

Write-Host "正在创建 GitHub 私有仓库 fate.today..." -ForegroundColor Cyan
gh repo create fate.today --private --source=. --remote=origin --push

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n完成！仓库地址: https://github.com/$(gh api user -q .login)/fate.today" -ForegroundColor Green
    Write-Host "记得在仓库 Settings -> Pages 中将 Source 设为 GitHub Actions" -ForegroundColor Yellow
} else {
    Write-Host "创建失败，请检查是否已登录: gh auth login" -ForegroundColor Red
}

# Create project folder
$projectName = "serverless-todo-app"
New-Item -Path . -Name $projectName -ItemType Directory
Set-Location -Path $projectName

# Create lambdas folder
New-Item -Path . -Name "lambdas" -ItemType Directory

# Create Lambda files
$lambdas = @("createTask.js","getTasks.js","updateTask.js","deleteTask.js")
foreach ($file in $lambdas) {
    New-Item -Path "lambdas\$file" -ItemType File
}

# Create root files
$rootFiles = @("serverless.yml","package.json","README.md")
foreach ($file in $rootFiles) {
    New-Item -Path $file -ItemType File
}

Write-Host "`nProject structure created successfully:`n"
Get-ChildItem -Recurse
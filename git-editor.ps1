$file = $args[0]
(Get-Content $file) -replace '^pick ', 'edit ' | Set-Content $file

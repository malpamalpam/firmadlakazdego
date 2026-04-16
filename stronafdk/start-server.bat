@echo off
setlocal
cd /d "%~dp0"

set PORT=8080

echo ============================================
echo  Firma Dla Kazdego - lokalny serwer
echo  Katalog: %CD%
echo  Port:    %PORT%
echo ============================================
echo.

REM --- 1) Python 3 (py launcher) ---
py -3 --version >nul 2>&1
if %errorlevel%==0 (
    echo [INFO] Uzywam Pythona 3 ^(py launcher^)
    echo [INFO] Otworz w przegladarce: http://localhost:%PORT%
    echo [INFO] Aby zatrzymac serwer - nacisnij Ctrl+C
    start "" "http://localhost:%PORT%"
    py -3 -m http.server %PORT%
    goto :end
)

REM --- 2) python.exe w PATH ---
python --version >nul 2>&1
if %errorlevel%==0 (
    echo [INFO] Uzywam Pythona ^(python w PATH^)
    echo [INFO] Otworz w przegladarce: http://localhost:%PORT%
    echo [INFO] Aby zatrzymac serwer - nacisnij Ctrl+C
    start "" "http://localhost:%PORT%"
    python -m http.server %PORT%
    goto :end
)

REM --- 3) Node.js (npx serve) ---
where npx >nul 2>&1
if %errorlevel%==0 (
    echo [INFO] Uzywam Node.js ^(npx serve^)
    echo [INFO] Otworz w przegladarce: http://localhost:%PORT%
    echo [INFO] Aby zatrzymac serwer - nacisnij Ctrl+C
    start "" "http://localhost:%PORT%"
    npx --yes serve -l %PORT% .
    goto :end
)

REM --- 4) PowerShell HTTP listener (fallback) ---
echo [INFO] Nie znaleziono Pythona ani Node.js - uruchamiam serwer PowerShell
echo [INFO] Otworz w przegladarce: http://localhost:%PORT%
echo [INFO] Aby zatrzymac serwer - zamknij to okno
start "" "http://localhost:%PORT%"
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$listener = New-Object System.Net.HttpListener;" ^
  "$listener.Prefixes.Add('http://localhost:%PORT%/');" ^
  "$listener.Start();" ^
  "Write-Host 'Serwer nasluchuje na http://localhost:%PORT%';" ^
  "while ($listener.IsListening) {" ^
  "  $ctx = $listener.GetContext();" ^
  "  $url = $ctx.Request.Url.LocalPath;" ^
  "  if ($url -eq '/') { $url = '/index.html' }" ^
  "  $path = Join-Path $PWD $url.TrimStart('/');" ^
  "  if (Test-Path $path -PathType Leaf) {" ^
  "    $bytes = [System.IO.File]::ReadAllBytes($path);" ^
  "    $ext = [System.IO.Path]::GetExtension($path).ToLower();" ^
  "    switch ($ext) { '.html' { $ctx.Response.ContentType='text/html; charset=utf-8' } '.css' { $ctx.Response.ContentType='text/css' } '.js' { $ctx.Response.ContentType='application/javascript' } default { $ctx.Response.ContentType='application/octet-stream' } };" ^
  "    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length);" ^
  "  } else { $ctx.Response.StatusCode = 404 };" ^
  "  $ctx.Response.Close()" ^
  "}"

:end
endlocal
pause

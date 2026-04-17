@echo off
echo Kopiowanie assetow z motywu WordPress...

set SRC=..\stronafdk\wp-content\themes\firmadlakazdego\assets

:: Tworzenie katalogow
mkdir assets\img 2>nul
mkdir assets\font 2>nul
mkdir assets\video 2>nul

:: Logo
copy "%SRC%\img\logo-white.png" "assets\img\" /Y
copy "%SRC%\img\logo-dark.png" "assets\img\" /Y

:: Hero images
copy "%SRC%\img\fdk_poster.jpg" "assets\img\" /Y
copy "%SRC%\img\fdk_mobile.webp" "assets\img\" /Y
copy "%SRC%\img\fdk_mobile.jpg" "assets\img\" /Y

:: Icons
copy "%SRC%\img\icon-index-1.svg" "assets\img\" /Y
copy "%SRC%\img\icon-index-2.svg" "assets\img\" /Y
copy "%SRC%\img\icon-index-3.svg" "assets\img\" /Y
copy "%SRC%\img\icon-index-4.svg" "assets\img\" /Y

:: Background images
copy "%SRC%\img\bg-headline-*.png" "assets\img\" /Y

:: Favicon
copy "%SRC%\img\favicon.png" "assets\img\" /Y 2>nul

:: Video
copy "%SRC%\video\fdk.mp4" "assets\video\" /Y

:: Fonts
copy "%SRC%\font\Montserrat-Regular.woff" "assets\font\" /Y
copy "%SRC%\font\Montserrat-Medium.woff" "assets\font\" /Y
copy "%SRC%\font\Montserrat-SemiBold.woff" "assets\font\" /Y
copy "%SRC%\font\Montserrat-Bold.woff" "assets\font\" /Y

:: All other icons
for %%f in ("%SRC%\img\icon-*.svg") do copy "%%f" "assets\img\" /Y
for %%f in ("%SRC%\img\arrow-*.svg") do copy "%%f" "assets\img\" /Y

echo.
echo Gotowe! Assety skopiowane.
pause

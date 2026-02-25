@echo off
setlocal ENABLEDELAYEDEXPANSION

rem =========================================
rem Default values
rem =========================================
set "REGISTRY="
set "TAG=latest"
set "DO_PUSH=false"
set "IMAGE_NAME="

rem Start argument parsing
goto parse_args


rem =========================================
rem Usage function
rem =========================================
:usage
echo.
echo use:
echo   buildDocker.bat [-r ^<registry^>] [-t ^<tag^>] [-p] IMAGE_NAME
echo.
echo Options:
echo   -r ^<registry^>   optional registry prefix, e.g. "ghcr.io/org"
echo   -t ^<tag^>        image tag (default: latest)
echo   -p                perform 'docker push' after build
echo.
echo Arguments:
echo   IMAGE_NAME        image name without tag, e.g. "demoqa-tests"
echo.
echo Examples:
echo   buildDocker.bat my-service
echo   buildDocker.bat -t 1.2.3 my-service
echo   buildDocker.bat -r ghcr.io/acme -p my-service
echo   buildDocker.bat -r registry.example.com/team -t 2.0.0 -p my-service
echo.
goto :eof


rem =========================================
rem Argument parsing
rem =========================================
:parse_args
if "%~1"=="" goto end_parse_args

if "%~1"=="-h" (
    call :usage
    exit /b 0
)

if "%~1"=="-r" (
    if "%~2"=="" (
        echo Missing value for -r
        exit /b 2
    )
    set "REGISTRY=%~2"
    shift & shift
    goto parse_args
)

if "%~1"=="-t" (
    if "%~2"=="" (
        echo Missing value for -t
        exit /b 2
    )
    set "TAG=%~2"
    shift & shift
    goto parse_args
)

if "%~1"=="-p" (
    set "DO_PUSH=true"
    shift
    goto parse_args
)

rem Set image name (first non-option argument)
if not defined IMAGE_NAME (
    set "IMAGE_NAME=%~1"
    shift
    goto parse_args
)

echo Unknown option: %~1
call :usage
exit /b 2

:end_parse_args


rem =========================================
rem Validate IMAGE_NAME
rem =========================================
if not defined IMAGE_NAME (
    echo Missing required argument: IMAGE_NAME
    call :usage
    exit /b 2
)


rem =========================================
rem Check Docker availability
rem =========================================
where docker >nul 2>nul
if errorlevel 1 (
    echo Error: docker is not installed or not in PATH
    exit /b 1
)


rem =========================================
rem Build full image name
rem =========================================
if defined REGISTRY (
    rem Remove trailing slash if any
    set "REGISTRY=%REGISTRY:/=%"
    set "FULL_NAME=%REGISTRY%/%IMAGE_NAME%:%TAG%"
) else (
    set "FULL_NAME=%IMAGE_NAME%:%TAG%"
)

echo ==^> Building image: %FULL_NAME%
docker build -t "%FULL_NAME%" -f Dockerfile .


rem =========================================
rem Get image ID
rem =========================================
for /f "usebackq tokens=* delims=" %%i in (`docker image inspect "%FULL_NAME%" -f "{{.Id}}" 2^>nul`) do (
    set "IMAGE_ID=%%i"
)

if defined IMAGE_ID (
    echo ==^> Image built: %FULL_NAME%
    echo      ID: %IMAGE_ID%
)


rem =========================================
rem Docker push if requested
rem =========================================
if "%DO_PUSH%"=="true" (
    if "%REGISTRY%"=="" (

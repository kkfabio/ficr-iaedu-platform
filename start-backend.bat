@echo off
chcp 65001 > nul
echo ============================================
echo   FICR-IAEDU Platform - Iniciando Backend
echo ============================================
echo.

REM Verificar se o .env existe
if not exist ".env" (
    echo [ERRO] Arquivo .env nao encontrado!
    echo        Crie o arquivo .env com base no .env.example
    pause
    exit /b 1
)

REM Carregar variaveis do .env (ignorando comentarios e linhas vazias)
for /f "usebackq tokens=1,* delims==" %%A in (`findstr /v "^#" .env`) do (
    if not "%%A"=="" set "%%A=%%B"
)

REM Validar API Key
if "%GEMINI_API_KEY%"=="COLOQUE_SUA_API_KEY_AQUI" (
    echo [ERRO] Voce precisa configurar sua GEMINI_API_KEY no arquivo .env
    echo.
    echo  1. Abra o arquivo .env
    echo  2. Substitua COLOQUE_SUA_API_KEY_AQUI pela sua chave
    echo  3. Salve e execute este script novamente
    echo.
    pause
    exit /b 1
)

echo [OK] API Key carregada.
echo [OK] Profile: %SPRING_PROFILES_ACTIVE%
echo [OK] Porta: %SERVER_PORT%
echo.
echo [INFO] Iniciando backend...
echo [INFO] Acesse: http://localhost:%SERVER_PORT%/actuator/health
echo ============================================
echo.

java -jar backend\target\ficr-iaedu-backend-0.1.0-SNAPSHOT.jar ^
  --spring.profiles.active=%SPRING_PROFILES_ACTIVE% ^
  --spring.ai.openai.api-key=%GEMINI_API_KEY% ^
  --spring.ai.openai.chat.options.model=%GEMINI_MODEL% ^
  --server.port=%SERVER_PORT%

pause

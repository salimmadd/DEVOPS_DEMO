# TP Docker Desktop - Angular + Spring Boot + MySQL

This project is prepared to run with Docker Desktop using three services:

- Angular frontend on http://localhost:4200
- Spring Boot backend on http://localhost:8081
- MySQL on localhost:3306

## 1) Start Docker Desktop

Make sure Docker Desktop is running and the WSL 2 engine is active.

## 2) Fix Docker Desktop if build fails with a read-only filesystem

If you get an error like:

- `mkdir /var/lib/docker/tmp/...: read-only file system`
- `write /var/lib/docker/buildkit/...: read-only file system`

then the issue is in Docker Desktop itself, not in the project.

Try this in order:

1. Close Docker Desktop completely.
2. In a PowerShell terminal, run:
   ```powershell
   wsl --shutdown
   ```
3. Reopen Docker Desktop and wait until it reports that it is running.
4. If the error persists, reset Docker Desktop from the app menu:
   - Troubleshoot > Reset to factory defaults
5. Reopen Docker Desktop and run:
   ```powershell
   docker compose up --build -d
   ```

## 3) Run the stack

From the project root:

```powershell
cd "c:\Users\Salim\Documents\Dev\test-main"
docker compose up --build -d
```

## 4) Check services

```powershell
docker ps
```

Then open:

- Frontend: http://localhost:4200
- Backend API: http://localhost:8081/user/all
- MySQL: localhost:3306

## 5) Stop the stack

```powershell
docker compose down
```

## Notes

- The frontend is configured to call the backend at `http://localhost:8081/user`.
- The backend uses MySQL host `mysql` inside Docker Compose.
- The app is now Docker-ready, but the current machine is blocked by a Docker Desktop VM filesystem problem that must be fixed before the containers can start.

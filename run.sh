#!/bin/bash

# Start Backend
echo "Starting backend"
start powershell.exe -NoExit -Command "cd backend; pnpm install; pnpm start;"
# cd backend
# pnpm install
# pnpm start &
# cd ..

# Start Frontend
echo "Starting Frontend..."
start powershell.exe -NoExit -Command "cd frontend; pnpm install; pnpm add -g serve; pnpm build; serve -s build;"
# cd frontend
# pnpm install
# pnpm start &
# cd ..

echo "All processes started."
#!/usr/bin/env bash

# EDUPRO Monorepo Orchestration Script
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "========================================================"
echo "           EDUPRO PLATFORM SERVICES LAUNCHER            "
echo "========================================================"
echo "Root Directory: $ROOT_DIR"
echo ""

# Ensure trap to terminate child processes on CTRL+C
trap 'echo "Stopping all EDUPRO services..."; kill 0' SIGINT SIGTERM EXIT

echo "[1/4] Starting Django 5 Ninja Backend on http://localhost:8000 ..."
(cd "$ROOT_DIR/backend" && ./venv/bin/python manage.py runserver 0.0.0.0:8000) &

echo "[2/4] Starting Superadmin Governance on http://localhost:3001 ..."
(cd "$ROOT_DIR/superadmin" && npm run dev) &

echo "[3/4] Starting Teacher Studio on http://localhost:3002 ..."
(cd "$ROOT_DIR/teacher" && npm run dev) &

echo "[4/4] Starting Student Learning Portal on http://localhost:3003 ..."
(cd "$ROOT_DIR/student" && npm run dev) &

echo ""
echo "========================================================"
echo "All 4 EDUPRO services are now running concurrently:"
echo " - Backend REST API:        http://localhost:8000/api/v1/docs"
echo " - Superadmin Control:     http://localhost:3001"
echo " - Teacher Creator Studio: http://localhost:3002"
echo " - Student LMS Portal:     http://localhost:3003"
echo "========================================================"
echo "Press Ctrl+C to stop all services."
echo ""

wait

#!/bin/bash

# Database backup script
echo "💾 Creating database backup..."

# Create backup directory if it doesn't exist
mkdir -p backups

# Generate timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Backup PostgreSQL database
docker-compose exec postgres pg_dump -U umkm_user umkm_platform > "backups/umkm_backup_${TIMESTAMP}.sql"

echo "✅ Backup created: backups/umkm_backup_${TIMESTAMP}.sql"
#!/bin/bash
set -e

mkdir -p /var/app/staging

aws s3 cp \
  s3://manoj-expense-tracker-secrets-2026/secure-connect-expense-tracker.zip \
  /var/app/staging/secure-connect-expense-tracker.zip

echo "Astra DB secure-connect bundle downloaded successfully."

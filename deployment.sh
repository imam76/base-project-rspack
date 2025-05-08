#!/bin/bash

echo "VERCEL_GIT_BRANCH: $VERCEL_GIT_BRANCH"

if [[ "$VERCEL_GIT_BRANCH" == "main" || "$VERCEL_GIT_BRANCH" == "staging" ]] ; then 
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1
else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0
fi

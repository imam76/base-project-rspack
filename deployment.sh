if [ "$VERCEL_GIT_BRANCH" != "main" ] && [ "$VERCEL_GIT_BRANCH" != "staging" ]; then
  echo "Skipping build for branch $VERCEL_GIT_BRANCH"
  exit 1
fi
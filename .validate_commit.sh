#!/bin/sh

echo "Checking commit messages..."

BASE_BRANCH=$(git merge-base origin/${GITHUB_BASE_REF} HEAD)

if git log --format="%s" $BASE_BRANCH..HEAD | grep -vE '^(init|feat|fix|docs|chore|refactor)( #[0-9]+)?: .{1,100}'
then
    echo "Invalid commit message found."
    exit 1
else
    echo "All commit messages are valid."
fi

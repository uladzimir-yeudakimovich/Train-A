#!/bin/sh

echo "Checking commit messages..."
if git log --format="%s" BASE...HEAD | grep -vE '^(init|feat|fix|docs|chore|refactor)( #[0-9]+)?: .{1,100}'
then
    exit 1
fi

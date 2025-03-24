#!/bin/bash

# Check if old and new paths are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <old_path> <new_path>"
    echo "Example: $0 '/assets' '/new-assets'"
    exit 1
fi

OLD_PATH=$1
NEW_PATH=$2

# Pattern to match script and style tags
PATTERN="(src|href)=\"([^\"]*)${OLD_PATH}" 

# Process each HTML file
for file in *.html; do
    if [ -f "$file" ]; then
        echo "Updating: $file"
        # Create backup
        cp "$file" "${file}.bak"
        
        # Update paths using sed
        sed -i -E "s ${PATTERN} \\1=\"\\2${NEW_PATH} g" "$file"
    fi
done

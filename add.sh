#!/bin/bash

pages=(
  "app/(store)/cart/page.tsx"
  "app/(store)/orders/page.tsx"
  "app/(store)/wishlist/page.tsx"
  "app/(admin)/admin/page.tsx"
  "app/(admin)/admin/products/new/page.tsx"
)

for f in "${pages[@]}"; do
  if [ -f "$f" ]; then
    if ! grep -q 'export const dynamic = "force-dynamic"' "$f"; then
      echo "Updating $f"
      tmpfile=$(mktemp)
      {
        echo 'export const dynamic = "force-dynamic"'
        echo 'export const revalidate = 0'
        echo
        cat "$f"
      } > "$tmpfile"
      mv "$tmpfile" "$f"
    else
      echo "Already updated: $f"
    fi
  else
    echo "File not found: $f"
  fi
done

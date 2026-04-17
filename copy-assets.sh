#!/bin/bash
# Run this script to copy images from the WP theme to the Next.js project
SRC="../stronafdk/wp-content/themes/firmadlakazdego/assets/img"
DEST="public/img"

mkdir -p "$DEST"

# Copy logo files
cp "$SRC/logo-white.png" "$DEST/"
cp "$SRC/logo-dark.png" "$DEST/"

# Copy hero images
cp "$SRC/fdk_poster.jpg" "$DEST/"
cp "$SRC/fdk_mobile.webp" "$DEST/"
cp "$SRC/fdk_mobile.jpg" "$DEST/"

# Copy background images
cp "$SRC/bg-headline-about.png" "$DEST/" 2>/dev/null
cp "$SRC/bg-headline-companies.png" "$DEST/" 2>/dev/null
cp "$SRC/bg-headline-contact.png" "$DEST/" 2>/dev/null
cp "$SRC/bg-headline-foreigners.png" "$DEST/" 2>/dev/null
cp "$SRC/bg-headline-funding.png" "$DEST/" 2>/dev/null
cp "$SRC/bg-headline-offer.png" "$DEST/" 2>/dev/null
cp "$SRC/bg-headline-offers.png" "$DEST/" 2>/dev/null

# Copy icons
cp "$SRC"/icon-*.svg "$DEST/" 2>/dev/null

# Copy favicon
cp "$SRC/favicon.png" "$DEST/" 2>/dev/null

echo "Assets copied successfully!"

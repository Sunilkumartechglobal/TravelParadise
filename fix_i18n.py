#!/usr/bin/env python3
"""
Run this script from your project root:
  python fix_i18n.py
It will patch src/i18n.js in-place.
"""
import os, re, sys

path = os.path.join("src", "i18n.js")

if not os.path.exists(path):
    print(f"ERROR: Could not find {path}")
    print("Make sure you run this script from C:\\Users\\asus\\TravelParadise\\")
    sys.exit(1)

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old = "hotelReservation: `R\u00e9servation d'h\u00f4tel`"
new = "hotelReservation: \"R\u00e9servation d'h\u00f4tel\""

if old not in content:
    # Check if already fixed
    if "hotelReservation: \"R\u00e9servation" in content:
        print("File already fixed! Make sure you cleared the cache:")
        print("  rmdir /s /q node_modules\\.cache")
        print("  npm start")
        sys.exit(0)
    print("ERROR: Could not find the broken line. File may be different.")
    # Count backticks anyway
    bt = content.count("`")
    print(f"Backtick count: {bt} ({'ODD - problem!' if bt % 2 != 0 else 'even - ok'})")
    sys.exit(1)

fixed = content.replace(old, new)

# Backup original
with open(path + ".bak", "w", encoding="utf-8") as f:
    f.write(content)
print(f"Backup saved to {path}.bak")

with open(path, "w", encoding="utf-8") as f:
    f.write(fixed)

print(f"SUCCESS: Fixed {path}")
print()
print("Now run:")
print("  rmdir /s /q node_modules\\.cache")
print("  npm start")

@echo off
echo Step 1: Fixing i18n.js...
python -c "
f = open('src/i18n.js', 'r', encoding='utf-8')
c = f.read()
f.close()
bt = c.count('\x60')
print('Backticks found:', bt)
old = 'hotelReservation: \x60R\u00e9servation d\u0027h\u00f4tel\x60'
new = 'hotelReservation: \"R\u00e9servation d\u0027h\u00f4tel\"'
if old in c:
    c = c.replace(old, new)
    f2 = open('src/i18n.js', 'w', encoding='utf-8')
    f2.write(c)
    f2.close()
    print('Fixed backtick issue!')
else:
    print('Backtick already fixed or not found - checking count...')
    if bt % 2 != 0:
        print('WARNING: odd number of backticks still present!')
    else:
        print('Backtick count is even - file looks OK')
"

echo.
echo Step 2: Clearing webpack cache...
if exist "node_modules\.cache" (
    rd /s /q "node_modules\.cache"
    echo Cache cleared!
) else (
    echo No cache found, skipping...
)

echo.
echo Step 3: Starting npm...
npm start

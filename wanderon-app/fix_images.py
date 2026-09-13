import re
import urllib.request
import urllib.error

with open('src/data/trips.ts', 'r', encoding='utf-8') as f:
    content = f.read()

urls = re.findall(r"'https://images.unsplash.com/photo-[^']+'", content)
fallback = "'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop'"

for url in set(urls):
    clean_url = url.strip("'")
    try:
        req = urllib.request.Request(clean_url, method='HEAD')
        urllib.request.urlopen(req)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            print(f"Replacing broken URL: {clean_url}")
            content = content.replace(url, fallback)
    except Exception as e:
        print(f"Error checking {clean_url}: {e}")
        content = content.replace(url, fallback)

with open('src/data/trips.ts', 'w', encoding='utf-8') as f:
    f.write(content)

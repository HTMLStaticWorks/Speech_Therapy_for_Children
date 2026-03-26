import os
import re

directory = r"c:\Users\sabarinath\Desktop\developer\therapy"

# HTML logo pattern: `<i class="bi bi-chat-heart-fill"></i>\s*<span>SpeechCare</span>`
pattern = re.compile(r'<i class="bi bi-chat-heart-fill"></i>\s*<span>SpeechCare</span>', re.IGNORECASE)
replacement = '<img src="assets/images/logo.svg" alt="Kinderly Logo" height="40">'

count = 0
for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        new_content, num_subs = pattern.subn(replacement, content)
        
        if num_subs > 0:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {filename} ({num_subs} replacements)")
            count += 1

print(f"Total files updated: {count}")

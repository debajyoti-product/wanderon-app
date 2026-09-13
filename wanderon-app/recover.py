import json, glob
logs = glob.glob(r'C:\Users\Debajyoti\.gemini\antigravity\brain\*\.system_generated\logs\transcript_full.jsonl')
for log in logs:
    with open(log, 'r', encoding='utf-8') as f:
        for line in f:
            if 'Home.tsx' in line and 'write_to_file' in line:
                try:
                    data = json.loads(line)
                    for call in data.get('tool_calls', []):
                        if call.get('name') == 'write_to_file':
                            args = call.get('args', {})
                            if 'Home.tsx' in args.get('TargetFile', ''):
                                code = args.get('CodeContent', '').strip('"')
                                # Unescape string
                                code = code.encode('utf-8').decode('unicode_escape')
                                with open('src/screens/Home.tsx', 'w', encoding='utf-8') as out:
                                    out.write(code)
                                print('Recovered from', log)
                except Exception as e:
                    pass

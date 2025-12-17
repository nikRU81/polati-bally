import xml.etree.ElementTree as ET

# Namespace definitions
namespaces = {
    'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'
}

for prefix, uri in namespaces.items():
    ET.register_namespace(prefix, uri)

# Parse XML
tree = ET.parse(r'C:\Users\nikolay.kozlov\Projects\polati-bally\data\unpacked\ppt\slides\slide7.xml')
root = tree.getroot()

# Find all shapes
shapes = root.findall('.//p:sp', namespaces)

# Define header blocks by their text (id 7, 12, 20, 25 - МЕЖВАХТА, ПРИВЕДИ ДРУГА, АКТИВНОСТИ, СОБЫТИЯ)
# Their backgrounds are id 6, 11, 19, 24
header_configs = [
    {'text_id': '7', 'bg_id': '6', 'name': 'МЕЖВАХТА'},
    {'text_id': '12', 'bg_id': '11', 'name': 'ПРИВЕДИ ДРУГА'},
    {'text_id': '20', 'bg_id': '19', 'name': 'АКТИВНОСТИ'},
    {'text_id': '25', 'bg_id': '24', 'name': 'СОБЫТИЯ'}
]

# Content blocks (серые блоки) - id 4, 9, 17, 22
content_blocks = [
    {'id': '4', 'name': 'МЕЖВАХТА content'},
    {'id': '9', 'name': 'ПРИВЕДИ ДРУГА content'},
    {'id': '17', 'name': 'АКТИВНОСТИ content'},
    {'id': '22', 'name': 'СОБЫТИЯ content'}
]

# Target Y position for all headers (use the topmost position)
TARGET_HEADER_Y = 914400  # Y position of АКТИВНОСТИ header (самый верхний)

# Target height for content blocks
TARGET_CONTENT_HEIGHT = 3629025  # Enough to fit all content

# Fix header positions
for config in header_configs:
    # Find background block
    for shape in shapes:
        cNvPr = shape.find('.//p:cNvPr', namespaces)
        if cNvPr is not None and cNvPr.get('id') == config['bg_id']:
            xfrm = shape.find('.//a:xfrm', namespaces)
            if xfrm is not None:
                off = xfrm.find('a:off', namespaces)
                if off is not None:
                    # Keep X, update Y
                    off.set('y', str(TARGET_HEADER_Y))
                    print(f"Fixed {config['name']} header background Y to {TARGET_HEADER_Y}")

    # Find text block
    for shape in shapes:
        cNvPr = shape.find('.//p:cNvPr', namespaces)
        if cNvPr is not None and cNvPr.get('id') == config['text_id']:
            xfrm = shape.find('.//a:xfrm', namespaces)
            if xfrm is not None:
                off = xfrm.find('a:off', namespaces)
                if off is not None:
                    # Update Y to align with header background + small offset
                    text_y = TARGET_HEADER_Y + 47625  # Original offset from bg to text
                    off.set('y', str(text_y))
                    print(f"Fixed {config['name']} header text Y to {text_y}")

# Fix content block positions and heights
content_y_start = TARGET_HEADER_Y + 361950 + 228600  # header height + gap
for i, block in enumerate(content_blocks):
    for shape in shapes:
        cNvPr = shape.find('.//p:cNvPr', namespaces)
        if cNvPr is not None and cNvPr.get('id') == block['id']:
            xfrm = shape.find('.//a:xfrm', namespaces)
            if xfrm is not None:
                off = xfrm.find('a:off', namespaces)
                ext = xfrm.find('a:ext', namespaces)
                if off is not None:
                    # Update Y position
                    off.set('y', str(content_y_start))
                    print(f"Fixed {block['name']} Y to {content_y_start}")
                if ext is not None:
                    # Update height
                    ext.set('cy', str(TARGET_CONTENT_HEIGHT))
                    print(f"Fixed {block['name']} height to {TARGET_CONTENT_HEIGHT}")

# Also fix the bottom underlines (id 5, 10, 18, 23)
underlines = [
    {'id': '5', 'name': 'МЕЖВАХТА underline'},
    {'id': '10', 'name': 'ПРИВЕДИ ДРУГА underline'},
    {'id': '18', 'name': 'АКТИВНОСТИ underline'},
    {'id': '23', 'name': 'СОБЫТИЯ underline'}
]

underline_y = content_y_start + TARGET_CONTENT_HEIGHT
for underline in underlines:
    for shape in shapes:
        cNvPr = shape.find('.//p:cNvPr', namespaces)
        if cNvPr is not None and cNvPr.get('id') == underline['id']:
            xfrm = shape.find('.//a:xfrm', namespaces)
            if xfrm is not None:
                off = xfrm.find('a:off', namespaces)
                if off is not None:
                    off.set('y', str(underline_y))
                    print(f"Fixed {underline['name']} Y to {underline_y}")

# Write fixed XML
tree.write(r'C:\Users\nikolay.kozlov\Projects\polati-bally\data\unpacked\ppt\slides\slide7.xml',
           encoding='ascii', xml_declaration=True)
print("\nSlide 7 fixed successfully!")

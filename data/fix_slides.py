import xml.etree.ElementTree as ET
import re

# Define namespaces
namespaces = {
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
}

# Register namespaces for output
for prefix, uri in namespaces.items():
    ET.register_namespace(prefix, uri)

def fix_slide5(file_path):
    """Fix slide 5: Set all task blocks to height 2800000"""
    tree = ET.parse(file_path)
    root = tree.getroot()

    # Find all shape transforms and fix heights for task blocks
    # Task blocks are the ones with roundRect and specific heights
    for sp in root.findall('.//p:sp', namespaces):
        xfrm = sp.find('.//a:xfrm', namespaces)
        if xfrm is not None:
            ext = xfrm.find('a:ext', namespaces)
            if ext is not None:
                cy = ext.get('cy')
                # Fix blocks with heights around 2.6-2.9 million (task blocks)
                if cy and 2500000 < int(cy) < 3000000:
                    ext.set('cy', '2800000')

    # Fix text formatting: increase margins and add spacing
    for txBody in root.findall('.//p:txBody', namespaces):
        bodyPr = txBody.find('a:bodyPr', namespaces)
        if bodyPr is not None and bodyPr.get('lIns') == '76200':
            bodyPr.set('lIns', '114300')

        # Find paragraphs with bullet points
        for p in txBody.findall('a:p', namespaces):
            pPr = p.find('a:pPr', namespaces)
            if pPr is not None:
                # Check if this is a bullet paragraph
                buChar = pPr.find('a:buChar', namespaces)
                if buChar is not None:
                    # Update margins
                    if pPr.get('marL') == '76200':
                        pPr.set('marL', '114300')
                        pPr.set('indent', '-114300')

                    # Add spacing after if not exists
                    spcAft = pPr.find('a:spcAft', namespaces)
                    if spcAft is None:
                        lnSpc = pPr.find('a:lnSpc', namespaces)
                        if lnSpc is not None:
                            spcAft_elem = ET.Element('{http://schemas.openxmlformats.org/drawingml/2006/main}spcAft')
                            spcPts = ET.SubElement(spcAft_elem, '{http://schemas.openxmlformats.org/drawingml/2006/main}spcPts')
                            spcPts.set('val', '600')
                            # Insert after lnSpc
                            idx = list(pPr).index(lnSpc)
                            pPr.insert(idx + 1, spcAft_elem)

    tree.write(file_path, encoding='ascii', xml_declaration=True)
    print(f"Fixed {file_path}")

def fix_slide6(file_path):
    """Fix slide 6: Set all task blocks to height 2750000"""
    tree = ET.parse(file_path)
    root = tree.getroot()

    # Find all shape transforms and fix heights for task blocks
    for sp in root.findall('.//p:sp', namespaces):
        xfrm = sp.find('.//a:xfrm', namespaces)
        if xfrm is not None:
            ext = xfrm.find('a:ext', namespaces)
            if ext is not None:
                cy = ext.get('cy')
                # Fix blocks with heights around 2.3-3.1 million (task blocks)
                if cy and 2200000 < int(cy) < 3100000:
                    ext.set('cy', '2750000')

    # Fix text formatting: increase margins and add spacing
    for txBody in root.findall('.//p:txBody', namespaces):
        bodyPr = txBody.find('a:bodyPr', namespaces)
        if bodyPr is not None and bodyPr.get('lIns') == '76200':
            bodyPr.set('lIns', '114300')

        # Find paragraphs with bullet points
        for p in txBody.findall('a:p', namespaces):
            pPr = p.find('a:pPr', namespaces)
            if pPr is not None:
                # Check if this is a bullet paragraph
                buChar = pPr.find('a:buChar', namespaces)
                if buChar is not None:
                    # Update margins
                    if pPr.get('marL') == '76200':
                        pPr.set('marL', '114300')
                        pPr.set('indent', '-114300')

                    # Add spacing after if not exists
                    spcAft = pPr.find('a:spcAft', namespaces)
                    if spcAft is None:
                        lnSpc = pPr.find('a:lnSpc', namespaces)
                        if lnSpc is not None:
                            spcAft_elem = ET.Element('{http://schemas.openxmlformats.org/drawingml/2006/main}spcAft')
                            spcPts = ET.SubElement(spcAft_elem, '{http://schemas.openxmlformats.org/drawingml/2006/main}spcPts')
                            spcPts.set('val', '600')
                            # Insert after lnSpc
                            idx = list(pPr).index(lnSpc)
                            pPr.insert(idx + 1, spcAft_elem)

    tree.write(file_path, encoding='ascii', xml_declaration=True)
    print(f"Fixed {file_path}")

def fix_slide7(file_path):
    """Fix slide 7: Set all task blocks to height 2850000"""
    tree = ET.parse(file_path)
    root = tree.getroot()

    # Find all shape transforms and fix heights for task blocks
    for sp in root.findall('.//p:sp', namespaces):
        xfrm = sp.find('.//a:xfrm', namespaces)
        if xfrm is not None:
            ext = xfrm.find('a:ext', namespaces)
            if ext is not None:
                cy = ext.get('cy')
                # Fix blocks with heights around 2.1-3.7 million (task blocks)
                if cy and 2000000 < int(cy) < 3700000:
                    ext.set('cy', '2850000')

    # Fix text formatting for 66675 margins (slide 7 uses different value)
    for txBody in root.findall('.//p:txBody', namespaces):
        bodyPr = txBody.find('a:bodyPr', namespaces)
        if bodyPr is not None and bodyPr.get('lIns') == '66675':
            bodyPr.set('lIns', '114300')

        # Find paragraphs with bullet points
        for p in txBody.findall('a:p', namespaces):
            pPr = p.find('a:pPr', namespaces)
            if pPr is not None:
                # Check if this is a bullet paragraph
                buChar = pPr.find('a:buChar', namespaces)
                if buChar is not None:
                    # Update margins
                    if pPr.get('marL') == '66675':
                        pPr.set('marL', '114300')
                        pPr.set('indent', '-114300')

                    # Add spacing after if not exists
                    spcAft = pPr.find('a:spcAft', namespaces)
                    if spcAft is None:
                        lnSpc = pPr.find('a:lnSpc', namespaces)
                        if lnSpc is not None:
                            spcAft_elem = ET.Element('{http://schemas.openxmlformats.org/drawingml/2006/main}spcAft')
                            spcPts = ET.SubElement(spcAft_elem, '{http://schemas.openxmlformats.org/drawingml/2006/main}spcPts')
                            spcPts.set('val', '600')
                            # Insert after lnSpc
                            idx = list(pPr).index(lnSpc)
                            pPr.insert(idx + 1, spcAft_elem)

    tree.write(file_path, encoding='ascii', xml_declaration=True)
    print(f"Fixed {file_path}")

if __name__ == '__main__':
    fix_slide5(r'C:\Users\nikolay.kozlov\Projects\polati-bally\data\unpacked\ppt\slides\slide5.xml')
    fix_slide6(r'C:\Users\nikolay.kozlov\Projects\polati-bally\data\unpacked\ppt\slides\slide6.xml')
    fix_slide7(r'C:\Users\nikolay.kozlov\Projects\polati-bally\data\unpacked\ppt\slides\slide7.xml')
    print("\nAll slides fixed successfully!")

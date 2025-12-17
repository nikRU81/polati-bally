import zipfile
import os
from pathlib import Path

def pack_directory_to_pptx(directory, output_file):
    """Pack a directory into a PPTX file"""
    directory = Path(directory)
    output_file = Path(output_file)

    # Remove output file if it exists
    if output_file.exists():
        output_file.unlink()

    # Create a ZIP file with the .pptx extension
    with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Walk through the directory
        for root, dirs, files in os.walk(directory):
            for file in files:
                file_path = Path(root) / file
                # Calculate the archive name (relative path from directory)
                archive_name = file_path.relative_to(directory)
                # Add file to zip
                zipf.write(file_path, archive_name)

    print(f"Successfully packed {directory} into {output_file}")
    print(f"Output file size: {output_file.stat().st_size / 1024:.2f} KB")

if __name__ == '__main__':
    pack_directory_to_pptx(
        r'C:\Users\nikolay.kozlov\Projects\polati-bally\data\unpacked',
        r'C:\Users\nikolay.kozlov\Projects\polati-bally\data\POLATI_BALLY_Presentation_IMPROVED.pptx'
    )

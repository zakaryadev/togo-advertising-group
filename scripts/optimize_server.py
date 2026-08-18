import os
import sys
import argparse
from PIL import Image
import pillow_heif

# Register HEIF opener with Pillow
pillow_heif.register_heif_opener()

def main():
    parser = argparse.ArgumentParser(description="Optimize upload image for portfolio")
    parser.add_argument("--src", required=True, help="Path to source image")
    parser.add_argument("--dest", required=True, help="Path to save optimized webp")
    parser.add_argument("--max-dim", type=int, default=1600, help="Max dimension width/height")
    parser.add_argument("--quality", type=int, default=85, help="WebP quality (0-100)")
    
    args = parser.parse_args()
    
    src_path = args.src
    dest_path = args.dest
    max_dim = args.max_dim
    quality = args.quality
    
    if not os.path.exists(src_path):
        print(f"ERROR: Source image not found at {src_path}")
        sys.exit(1)
        
    dest_dir = os.path.dirname(dest_path)
    if not os.path.exists(dest_dir):
        try:
            os.makedirs(dest_dir)
        except Exception as e:
            print(f"ERROR: Could not create destination directory {dest_dir}: {e}")
            sys.exit(1)
            
    try:
        img = Image.open(src_path)
        orig_w, orig_h = img.size
        
        # Calculate new dimensions keeping aspect ratio
        if orig_w > max_dim or orig_h > max_dim:
            if orig_w > orig_h:
                new_w = max_dim
                new_h = int(orig_h * (max_dim / orig_w))
            else:
                new_h = max_dim
                new_w = int(orig_w * (max_dim / orig_h))
            
            img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            resized = True
        else:
            new_w, new_h = orig_w, orig_h
            resized = False
            
        img.save(dest_path, "WEBP", quality=quality)
        dest_size = os.path.getsize(dest_path)
        orig_size = os.path.getsize(src_path)
        
        print("SUCCESS")
        print(f"Dimensions: {orig_w}x{orig_h} -> {new_w}x{new_h}")
        print(f"Resized: {resized}")
        print(f"FileSize: {orig_size} -> {dest_size}")
        sys.exit(0)
    except Exception as e:
        print(f"ERROR: Optimization failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

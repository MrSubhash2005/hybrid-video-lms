import subprocess
import os

female_list_file = "female_concat.txt"
with open(female_list_file, "w") as f:
    for i in range(24):
        f.write(f"file 'templates/rag/public/audio/female/step_{i}.wav'\n")

male_list_file = "male_concat.txt"
with open(male_list_file, "w") as f:
    for i in range(24):
        f.write(f"file 'templates/rag/public/audio/male/step_{i}.wav'\n")

print("Concatenating female audio steps...")
subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", female_list_file, "-c", "copy", "female_full.wav"])

print("Concatenating male audio steps...")
subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", male_list_file, "-c", "copy", "male_full.wav"])

print("Multiplexing 15-minute video with female audio track...")
subprocess.run([
    "ffmpeg", "-y",
    "-i", "templates/rag/output/video.mp4",
    "-i", "female_full.wav",
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    "public/outputs/video_rag_female.mp4"
])

print("Multiplexing 15-minute video with male audio track...")
subprocess.run([
    "ffmpeg", "-y",
    "-i", "templates/rag/output/video.mp4",
    "-i", "male_full.wav",
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    "public/outputs/video_rag_male.mp4"
])

# Cleanup temp text files
if os.path.exists("female_concat.txt"): os.remove("female_concat.txt")
if os.path.exists("male_concat.txt"): os.remove("male_concat.txt")

print("Full RAG masterclass multiplexing complete!")

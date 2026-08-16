import requests
import json
import base64
import os
import sys

# Replace this with your actual Sarvam API key
import os

# Set your API key as an environment variable: set SARVAM_API_KEY=your_key_here
SARVAM_API_KEY = os.getenv("SARVAM_API_KEY", "")
URL = "https://api.sarvam.ai/text-to-speech"

# The scenes, with "null pointer" instead of "nullptr", and overlapping the last sentence of the previous scene
SCENES = [
    {
        "filename": "Scene001-audio.wav",
        "text": "Let's start with a question. Imagine you have a list of numbers stored in an array, and you need to insert a new number right at the beginning. What happens? Every single element in that array has to shift over by one spot to make room. If your array has a thousand elements, that's a thousand moves, just to add one value. The same problem happens when you delete from the front. Everything after it has to shift back to fill the gap. This shifting takes time, and as your data grows, that time grows too. In the worst case, inserting or deleting at the front of an array costs O of n time, where n is the number of elements. That's because arrays store their elements in one continuous block of memory, back to back, like seats in a row. To insert in the middle of that row, you have to physically move people down. So, is there a way to add or remove elements without all that shifting? Yes. That's exactly what a linked list gives us. Instead of storing elements in one continuous block, a linked list stores each element separately, wherever there's free space in memory. Each element knows where the next one lives, because it holds a reference, or a pointer, to it. Think of it like a treasure hunt. Each clue doesn't tell you the whole path. It just tells you where to find the next clue. As long as you know where to start, you can follow the chain all the way through. Because elements aren't glued together in memory, inserting a new one is often as simple as changing a couple of these references, no shifting required. In this lesson, we'll build this idea from the ground up, starting with a single building block called a node."
    },
    {
        "filename": "Scene002-audio.wav",
        "text": "In this lesson, we'll build this idea from the ground up, starting with a single building block called a node. So what actually is a node? A node is the basic building block of a linked list. Every node has two parts. The first part is the data. This is the actual value you want to store, like a number, a name, or anything else. The second part is called next. This is a pointer, which simply means it holds the memory address of another node. Think of it as an arrow pointing to whatever comes after it in the list. If there's nothing after it, the next pointer points to nothing at all, which in C++ we represent using a special value called null pointer. In code, we define a node using a struct. Our struct has two members. One is an integer called data, and the other is a pointer to another Node, called next. That's it. That's the entire building block. A linked list, then, is simply a chain of these nodes, where each one points to the next, starting from a special node we call the head. The head is just a pointer that tells us where the list begins. If the head is null pointer, that means the list is empty. Once we have a starting node, we can follow the next pointers, one after another, to reach every other node in the list. This simple structure, a value plus a pointer, is really all we need to build something powerful."
    },
    {
        "filename": "Scene003-audio.wav",
        "text": "This simple structure, a value plus a pointer, is really all we need to build something powerful. Now that we know what a node looks like, how do we actually move through a linked list? This process is called traversal. It means starting at the head, and walking through the list one node at a time, until we reach the end. We know we've reached the end when a node's next pointer is null pointer. That's our signal to stop. Let's walk through it. We create a temporary pointer, and set it equal to head. This temp pointer doesn't move the actual list around, it's just a helper we use to walk through it safely, without losing track of where the list actually starts. While temp is not equal to null pointer, we look at its data, maybe print it out, and then we move temp forward by setting it to temp's next pointer. We repeat this until temp becomes null pointer, which means there are no more nodes left. This simple loop is the foundation for almost everything else we'll do with linked lists. Whether we're searching for a value, counting the nodes, or finding the last node so we can insert something new, we'll always come back to this same pattern of walking forward one step at a time. Unlike an array, where you can jump straight to any index, a linked list only lets you move forward, one link at a time, starting from the head."
    },
    {
        "filename": "Scene004-audio.wav",
        "text": "Unlike an array, where you can jump straight to any index, a linked list only lets you move forward, one link at a time, starting from the head. Let's insert our first new node. We'll start with the easiest case, inserting at the head of the list. Suppose we already have a list, and we want to add a brand new value right at the very front. Here's how we do it. First, we create a new node, and set its data to the value we want to insert. Next, and this is the important part, we set the new node's next pointer to point to whatever the current head is. This connects our new node to the rest of the existing list. Finally, we update head itself, so that it now points to our new node. Just like that, our new node becomes the first node in the list, and everything that used to come after the old head is still connected, just one step further down the chain. Notice what we didn't have to do. We didn't have to touch any of the other nodes. We didn't shift anything, we didn't copy anything. We just changed two pointers, the new node's next, and the head. That means inserting at the head takes constant time, no matter how long the list is. In big O notation, we call this O of 1. Compare that to an array, where inserting at the front means shifting every single element over. This is one of the biggest advantages linked lists have over arrays."
    },
    {
        "filename": "Scene005-audio.wav",
        "text": "This is one of the biggest advantages linked lists have over arrays. Now let's insert at the opposite end, the tail of the list. This one is a little trickier, because our list only keeps track of the head. There's no separate pointer that already knows where the last node is. That means, to insert at the tail, we first have to find it ourselves, by traversing the entire list. Here's the plan. We create our new node just like before, but this time, its next pointer should point to null pointer, since it will become the very last node. Next, we check a special case. If the list is currently empty, meaning head is null pointer, then our new node simply becomes the head, and we're done. But if the list already has nodes in it, we need to walk all the way to the end. We start a temp pointer at head, and we keep moving forward, node by node, as long as temp's next pointer is not null pointer. When that loop ends, temp is sitting on the very last node in the list. Now we simply set temp's next pointer to our new node, linking it onto the end of the chain. Notice the difference from inserting at the head. Because we have to walk through every node to find the end, this operation takes O of n time, where n is the number of nodes in the list. If we had kept a separate tail pointer, we could do this in constant time instead, but for now, we'll keep things simple and always find the tail by walking there ourselves."
    },
    {
        "filename": "Scene006-audio.wav",
        "text": "If we had kept a separate tail pointer, we could do this in constant time instead, but for now, we'll keep things simple and always find the tail by walking there ourselves. Let's tackle one more case, inserting somewhere in the middle of the list, at a specific position. Say we want our new node to become the third node in the list. To do this, we need to find the node that comes right before the position we're inserting into, since that node's next pointer is what we'll need to update. We traverse from head, moving forward one step at a time, until we reach the node just before our target position. Let's call this node temp. Once we've found it, here's the key idea. Our new node's next pointer should point to whatever temp's next currently points to. This preserves the rest of the list, so nothing gets lost. Then, we update temp's next pointer to point to our new node. In that order. This order matters a lot. If we updated temp's next first, we would lose the reference to the rest of the list, because nothing would be pointing to it anymore. By connecting our new node forward first, and then relinking backward, we make sure every node stays connected throughout the process. As a special case, if we're inserting at position zero, that's really just inserting at the head, which we already know how to do. Otherwise, we count our way to the correct position, and perform this two-step relinking. Since we might have to walk partway or even all the way through the list to find the right spot, this operation also takes O of n time in the worst case."
    },
    {
        "filename": "Scene007-audio.wav",
        "text": "Since we might have to walk partway or even all the way through the list to find the right spot, this operation also takes O of n time in the worst case. Now let's talk about deleting nodes, and there are really three situations to think about. Deleting the head, deleting from the middle, and deleting the tail. Let's start with the head, since it's the simplest. To delete the head node, we save a temporary pointer to it, so we don't lose track of it in memory. Then, we move head forward, so it now points to the second node in the list. Finally, we delete the old head node, freeing up its memory. Just two steps, and we're done, in constant time. Deleting from the middle or the tail works a bit differently, and honestly, they use the exact same logic, because remember, we don't have a separate tail pointer. To delete a node at some position, we first need to find the node right before it, just like we did with insertion. We traverse from head, counting our steps, until temp lands on the node just before the one we want to remove. Once we're there, we save a pointer to the node we're deleting, which is temp's next. Then we update temp's next to skip over it, pointing instead to the node after the one being deleted. Finally, we delete that saved node to free its memory. If the node we're deleting happens to be the very last node, this same logic still works perfectly. Temp's next simply becomes null pointer after the update, correctly marking the new end of the list. That's the beauty of this approach, deleting from the middle and deleting the tail are actually the same operation. And because we might need to traverse partway through the list to find the node before our target, both of these deletions take O of n time. Only deleting the head is a constant time operation, since we already know exactly where it is."
    },
    {
        "filename": "Scene008-audio.wav",
        "text": "Only deleting the head is a constant time operation, since we already know exactly where it is. Let's step back and recap what we've learned, because seeing it all together really drives the point home. Inserting at the head of a linked list is O of 1, constant time, since we only update two pointers. But inserting at the head of an array is O of n, because every element has to shift. Inserting at the tail of our linked list is O of n, since we have to traverse the whole list to find the last node. For an array, inserting at the end is usually O of 1, as long as there's room, since we just place the value at the next open spot. Inserting in the middle is O of n for both structures, since a linked list needs traversal, and an array needs shifting. Deleting the head is O of 1 for a linked list, but O of n for an array. Deleting from the middle or the tail is O of n for both. So linked lists aren't automatically faster at everything. They shine specifically at the front of the list, where arrays struggle the most. Arrays, on the other hand, are great when you need to jump directly to any index, something linked lists can't do at all, since you always have to walk from the head. Choosing between them really depends on what operations your program needs most often."
    },
    {
        "filename": "Scene009-audio.wav",
        "text": "Choosing between them really depends on what operations your program needs most often. Let's bring everything together into one complete piece of code. Here's our full singly linked list, written in C++. At the top, we have our Node struct, exactly like we saw earlier, holding a data value and a next pointer. Below that, we define a LinkedList class. Inside, we keep a single private pointer called head, which starts as null pointer, representing an empty list. Notice, there's no tail pointer here, on purpose, so every tail operation genuinely walks the full list, just like we practiced. Our insertAtHead function creates a new node, points its next to the current head, and then updates head to the new node, constant time, just like before. InsertAtTail checks if the list is empty first, and if not, walks all the way to the last node before linking the new one on. insertAtPosition handles the special case of position zero by reusing insertAtHead, and otherwise walks to the node just before our target, and relinks forward then backward. Our deleteNode function checks whether we're removing the head, and if so, simply moves head forward and frees the old node. Otherwise, it walks to the node before the target, and relinks around the node being removed. And finally, our display function traverses the entire list from head to null pointer, printing each value as it goes, exactly like the traversal pattern we started with. Put together, this class gives us a fully working linked list, supporting insertion and deletion at any position, all built from that same simple idea, a value, and a pointer to what comes next. Try compiling this yourself, and step through it with a debugger, or just some print statements, to watch the pointers move in real time."
    }
]

import wave
import shutil

def split_into_chunks(text, max_len=500):
    sentences = text.replace('? ', '?|').replace('. ', '.|').replace('! ', '!|').split('|')
    chunks = []
    current_chunk = ""
    for sentence in sentences:
        if len(current_chunk) + len(sentence) + 1 <= max_len:
            current_chunk += sentence + " "
        else:
            chunks.append(current_chunk.strip())
            current_chunk = sentence + " "
    if current_chunk:
        chunks.append(current_chunk.strip())
    return [c for c in chunks if c.strip()]

def combine_wavs(input_files, output_file):
    data = []
    params = None
    for infile in input_files:
        with wave.open(infile, 'rb') as w:
            if not params:
                params = w.getparams()
            data.append(w.readframes(w.getnframes()))
    
    if data:
        with wave.open(output_file, 'wb') as w:
            w.setparams(params)
            w.writeframes(b''.join(data))

def generate_audio(text, output_filename):
    input_chunks = split_into_chunks(text)
    
    # Process in batches of 3
    temp_files = []
    
    batch_size = 3
    for i in range(0, len(input_chunks), batch_size):
        batch = input_chunks[i:i+batch_size]
        
        payload = {
            "inputs": batch,
            "target_language_code": "en-IN",
            "speaker": "tarun",
            "pace": 1.05,
            "speech_sample_rate": 8000,
            "enable_preprocessing": True,
            "model": "bulbul:v3"
        }
        
        headers = {
            "API-Subscription-Key": SARVAM_API_KEY,
            "Content-Type": "application/json"
        }

        print(f"Generating audio batch {i//batch_size + 1} for {output_filename}...")
        response = requests.post(URL, json=payload, headers=headers)
        
        if response.status_code == 200:
            response_data = response.json()
            if 'audios' in response_data:
                for j, audio_base64 in enumerate(response_data['audios']):
                    temp_file = f"{output_filename}_temp_{i+j}.wav"
                    with open(temp_file, "wb") as fh:
                        fh.write(base64.b64decode(audio_base64))
                    temp_files.append(temp_file)
        else:
            print(f"Failed to generate batch. Status code: {response.status_code}")
            print(response.text)
            
    if temp_files:
        combine_wavs(temp_files, output_filename)
        print(f"Saved combined file: {output_filename}")
        for t in temp_files:
            os.remove(t)
    else:
        print(f"Failed to generate {output_filename}.")

def main():
    if not SARVAM_API_KEY or SARVAM_API_KEY == "YOUR_SARVAM_API_KEY":
        print("Please set your Sarvam API key in the script.")
        sys.exit(1)
        
    out_dir = "generated_audio"
    os.makedirs(out_dir, exist_ok=True)
    
    for scene in SCENES:
        filepath = os.path.join(out_dir, scene["filename"])
        if not os.path.exists(filepath):
            generate_audio(scene["text"], filepath)
        else:
            print(f"Skipping {filepath}, already exists.")

if __name__ == "__main__":
    main()

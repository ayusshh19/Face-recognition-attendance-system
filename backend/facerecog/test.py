    
with open("Myfile.txt", "r") as f:
    f.seek(0)
    contents = f.read()
    newlist=contents.split(",")
    print(newlist)
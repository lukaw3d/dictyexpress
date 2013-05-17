import json
import cPickle
import os


pickleFile = 'Pickles/allGenes.cPickle'
if not os.path.exists('Pickles'): os.makedirs('Pickles')
if not os.path.exists(pickleFile):
    f = open('orthologs.txt', 'r')
    header = 1
    allGenes = {}
    for line in f:
        if line[0] != '#':
            if not header:
                splits = line[:-1].split("\t")
                allGenes[splits[0]] = {
                    "name": splits[0],
                    "id": splits[1],
                    "jgi_id": splits[2]
                }
            header = 0
    f.close()
    cPickle.dump(allGenes, open(pickleFile, 'wb'))
    
allGenes = cPickle.load(open(pickleFile, "rb"))
print json.dumps({"allGenes": allGenes}, indent=4)

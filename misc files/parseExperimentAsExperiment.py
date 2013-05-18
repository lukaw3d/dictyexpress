'''
experiment.txt in this format, to json

#comments ..
id0	Species	id1	Strain	id2	Growth	org
D. discoideum    AX4    KA    D. discoideum    AX4    KA
    dd    405894.347598    0.0
D. purpureum    dp1AX1    KA    D. purpureum    dp1AX1    KA
    dp    266939.16799    0.0
'''
import json
import cPickle
import os

if not os.path.exists('Pickles'):
    os.makedirs('Pickles')
pickleFile = 'Pickles/experiment.cPickle'
if not os.path.exists(pickleFile):
    f = open('experiment.txt', 'r')
    experiment = []
    header = 1
    for line in f:
        if line[0] != '#':
            if not header:
                splits = line[:-1].split("\t")
                experiment.append({
                    "species": splits[0],
                    "strain": splits[1],
                    "growth": splits[2]
                })
            header = 0
    f.close()
    cPickle.dump(experiment, open(pickleFile, 'wb'))

experiment = cPickle.load(open(pickleFile, "rb"))
print json.dumps({"experiment": experiment}, indent=4)

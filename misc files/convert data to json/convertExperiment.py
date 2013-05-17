'''
experiment.txt in this format, to json

D. discoideum    AX4    KA    D. discoideum    AX4    KA
    dd    405894.347598    0.0
D. purpureum    dp1AX1    KA    D. purpureum    dp1AX1    KA
    dp    266939.16799    0.0
'''
import json

f = open('experiment.txt', 'r')
experiment = []
for line in f:
    splits = line[:-1].split("\t")
    experiment.append({
        "species": splits[0],
        "strain": splits[1],
        "growth": splits[2]
    })
print json.dumps({"experiment": experiment}, indent=4)
f.close()

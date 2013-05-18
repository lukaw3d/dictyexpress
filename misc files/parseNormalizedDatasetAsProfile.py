'''
profile.txt in this format, to json

ddb_g
bio1.hr00 bio1.hr04 bio1.hr08 bio1.hr12 bio1.hr16 bio1.hr20 bio1.hr24
bio2.hr00 bio2.hr04 bio2.hr08 bio2.hr12 bio2.hr16 bio2.hr20 bio2.hr24
bio2.prespore    bio2.prestalk    bio4.prespore    bio4.prestalk

DDB_G0267178    0    0    0    0    0    0    0    41.3383717093812
14.9878898752239    15.6895683203059    0    0    9.34794567080715
0    0    0    0    0
DDB_G0267184    0    0    0    0    0    0    0    0    6.23180749318945
0    6.99542449657672    0    0    0    0    0    0    0
DDB_G0267188    10.5675957813643    11.6175231029026    11.7016962647341
0    0    21.2755396027517    19.1908253818441    0    0    0    0
7.02268167825642    6.65304360278631    11.8582008381165    0    0    0    0
'''
import json
import cPickle
import os


#averages by
#bio1.hr00 bio1.hr04 bio1.hr08 bio1.hr12 bio1.hr16 bio1.hr20 bio1.hr24
#bio2.hr00 bio2.hr04 bio2.hr08 bio2.hr12 bio2.hr16 bio2.hr20 bio2.hr24
folder = 'D. discoideum'
selectedDDBs = ["DDB_G0273069", "DDB_G0279387", "DDB_G0284861"]

pickleFile = 'Pickles/profile'+folder+'.cPickle'
if not os.path.exists('Pickles'):
    os.makedirs('Pickles')
if not os.path.exists(pickleFile):
    f = open(folder+'/normalized_data_set.txt', 'r')
    profile = {}
    header = 1
    for line in f:
        if line[0] != "#":
            if not header:
                splits = line[:-1].split("\t")
                profile[splits[0]] = map(
                    lambda (x1, x2): (float(x1)+float(x2))/2,
                    zip(splits[1:8], splits[8:15])
                )
            header = 0
    f.close()
    cPickle.dump(profile, open(pickleFile, 'wb'))

profile = cPickle.load(open(pickleFile, "rb"))
filteredProfile = {selected: profile[selected] for selected in selectedDDBs}
print json.dumps({"profile": filteredProfile}, indent=4)

'''
allGenes.txt in this format, to json

rab32C	DDB_G0275675	91127
DDB_G0275849	DDB_G0275849	91130
mobA	DDB_G0278907	91135
fray1	DDB_G0278863	91138
DDB_G0279247	DDB_G0279247	91142
mrrA	DDB_G0271908	91918
padA	DDB_G0286385	91927
DDB_G0287001	DDB_G0287001	91930
DDB_G0287073	DDB_G0287073	91932
DDB_G0276545	DDB_G0276545	91936
rab8A	DDB_G0280043	91938
osbH	DDB_G0283709	91950
ndkC-1	DDB_G0273069	97095
rpl21	DDB_G0279387	93065
eif5a	DDB_G0284861	91781
rps28	DDB_G0285597	47614
rps7	DDB_G0289025	92493

'''
import json

f = open('allGenes.txt', 'r')
allGenes = {}
for line in f:
    splits = line[:-1].split("\t")
    allGenes[splits[0]] = {
        "name": splits[0],
        "id": splits[1],
        "jgi_id": splits[2]
    }
print json.dumps({"allGenes": allGenes}, indent=4)
f.close()

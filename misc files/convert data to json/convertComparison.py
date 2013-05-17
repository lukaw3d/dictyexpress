'''
comparison.txt in this format, to json

D. discoideum    AX4    KA    D. discoideum    AX4    KA    55552.413897
    14083.098324  3052.53189  2937.61897  1731.729698  1948.400179  1931.35137
D. purpureum    dp1AX1    KA    D. purpureum    dp1AX1    KA    50981.130901
    12122.766544  4382.060099  1448.216945  465.340046  689.418326  625.214273
'''
import json

f = open('comparison.txt', 'r')
comparison = {}
for line in f:
    splits = line[:-1].split("\t")
    comparison[splits[0]] = {
        "data": map(float, splits[6:]),
        "species": splits[0],
        "strain": splits[1],
        "growth": splits[2]
    }
print json.dumps({"comparison": comparison}, indent=4)
f.close()

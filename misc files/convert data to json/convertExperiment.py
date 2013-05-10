'''
experiment.txt in this format, to json

D. discoideum    AX4    KA    D. discoideum    AX4    KA
    dd    405894.347598    0.0
D. purpureum    dp1AX1    KA    D. purpureum    dp1AX1    KA
    dp    266939.16799    0.0
'''


f = open('experiment.txt', 'r')
print "experiment = ["
first = 1
for line in f:
    splits = line[:-1].split("\t")
    if(not first):
        print "\t},"
    print '\t{'
    print '\t\t"species": "'+splits[0]+'",'
    print '\t\t"strain": "'+splits[1]+'",'
    print '\t\t"growth": "'+splits[2]+'"'
    first = 0
print "\t}\n]"
f.close()

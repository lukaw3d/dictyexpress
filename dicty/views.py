from django.http import HttpResponse
from django.shortcuts import render

import json
import cPickle
import os

dictyPath = os.path.abspath(os.path.dirname(__file__))
dataPath = os.path.join(dictyPath, "../data")
picklePath = os.path.join(dataPath, 'Pickles')

def index(request):
    return render(request, 'dicty/index.html', {})


def others(request, sub):
    return render(request, 'dicty/'+sub, {})


def api(request, sub):
    #request.GET.get()
    print sub
    if sub=="experiment":
        return HttpResponse(json.dumps(wholeDict[sub], indent=4))
    if sub=="profile":
        #selectedDDBs = ["DDB_G0273069", "DDB_G0279387", "DDB_G0284861"]
        selectedSpecies = request.GET.get("species")
        print request.GET.get("ddbs")
        print str(request.GET.get("ddbs")).split(",")
        selectedDDBs = str(request.GET.get("ddbs")).split(",")
        sub = wholeDict.get("profile"+str(selectedSpecies))
        if sub:
            filtered = {selected: sub.get(selected) for selected in selectedDDBs}
            return HttpResponse(json.dumps(filtered, indent=4))
    if sub=="allGenes":
        pass
    if sub=="comparison":
        pass
    return HttpResponse("Hi")
    #return HttpResponse(json.dumps(wholeDict, indent=4))


def loadExperiment():
    pickleFile = os.path.join(picklePath, 'experiment.cPickle')
    dataFile = os.path.join(dataPath, 'experiment.txt')
    if not os.path.exists(pickleFile):
        f = open(dataFile, 'r')
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
    wholeDict["experiment"] = experiment
    #print json.dumps({"experiment": experiment}, indent=4)


def loadProfile(folder):
    pickleFile = os.path.join(picklePath, 'profile'+folder+'.cPickle')
    dataFile = os.path.join(dataPath, folder, 'normalized_data_set.txt')
    if not os.path.exists(pickleFile):
        f = open(dataFile, 'r')
        profile = {}
        header = 1
        for line in f:
            if line[0] != "#":
                if not header:
                    splits = line[:-1].split("\t")
                    profile[splits[0]] = map(
                        lambda (x1,x2): (float(x1)+float(x2))/2, 
                        zip(splits[1:8],splits[8:15])
                    );
                header = 0
        f.close()
        cPickle.dump(profile, open(pickleFile, 'wb'))

    profile = cPickle.load(open(pickleFile, "rb"))
    #selectedDDBs = ["DDB_G0273069", "DDB_G0279387", "DDB_G0284861"]
    #filteredProfile = {selected: profile[selected] for selected in selectedDDBs}
    #print json.dumps({"profile": filteredProfile}, indent=4)
    wholeDict["profile"+folder] = profile
    #print json.dumps({"profile": profile}, indent=4)


def loadAllGenes():
    pickleFile = os.path.join(picklePath,'allGenes.cPickle')
    dataFile = os.path.join(dataPath,'orthologs.txt')
    if not os.path.exists(pickleFile):
        f = open(dataFile, 'r')
        header = 1
        allGenes = {}
        for line in f:
            if line[0] != '#':
                if not header:
                    splits = line[:-1].split("\t")
                    allGenes[splits[0]] = {
                        "name": splits[0],
                        "ddb": splits[1],
                        "jgi_id": splits[2]
                    }
                    allGenes[splits[1]] = {
                        "name": splits[0],
                        "ddb": splits[1],
                        "jgi_id": splits[2]
                    }
                    allGenes[splits[2]] = {
                        "name": splits[0],
                        "ddb": splits[1],
                        "jgi_id": splits[2]
                    }
                header = 0
        f.close()
        cPickle.dump(allGenes, open(pickleFile, 'wb'))

    allGenes = cPickle.load(open(pickleFile, "rb"))
    wholeDict["allGenes"] = allGenes
    #print json.dumps({"allGenes": allGenes}, indent=4)

if not os.path.exists(dataPath): os.makedirs(dataPath)
if not os.path.exists(picklePath): os.makedirs(picklePath)
wholeDict = {}

try: loadAllGenes()
except IOError: print "Data file missing"
try: loadExperiment()
except IOError: print "Data file missing"
try: loadProfile('D. discoideum')
except IOError: print "Data file missing"
try: loadProfile('D. purpureum')
except IOError: print "Data file missing"


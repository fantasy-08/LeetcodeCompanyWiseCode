import os
import json

def Change_name(name):
    name=name.split('.')[0]
    A=name.split('_')
    s=""
    
    for T in A:
        if(len(T)):
            Y=T
            Y=Y[0].upper()+Y[1:]
            s+=Y+' '
    return s

data={}
data['companies']=[]
entries=os.listdir('public/data/')
for entry in entries:
    name=Change_name(entry)
    file=entry
    data['companies'].append({
        'name':name,
        'file':file
        })

with open('src/company.js', 'w') as outfile:
    json.dump(data, outfile)

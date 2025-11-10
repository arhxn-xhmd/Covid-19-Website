import os 

symptoms = [
    "Coughing and Sneezing - Frequent coughing and sneezing are early signs that your body is fighting an infection or cold.",
    "Hot Fever - High temperature or hot fever usually means your immune system is working to fight germs.",
    "Strong Headache - A strong headache can result from stress, dehydration, or the body reacting to infection.",
    "Shortness of Breath - Difficulty in breathing or shortness of breath can be a sign of chest congestion or fatigue.",
    "Confusion - Feeling confused or dizzy may occur due to fever, weakness, or lack of proper hydration.",
    "Sore Throat - A sore or itchy throat often appears with infection, dry air, or after continuous coughing."
]

for index, symptom in enumerate(symptoms):
    os.mkdir(f'symptoms/symptom {index + 1}')

    with open(f'symptoms/symptom {index + 1}/info.txt', 'w') as f:
        f.write(symptom)

    print(f'Folder symptom {index + 1} created.')

print ('\nAll folders are created.')
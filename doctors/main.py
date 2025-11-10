import os

doctors = [
    "Dorothy M. Nickell\nThroat Specialist\nExpert ENT doctor treating throat infections, voice issues, and vocal cords with care and precise diagnosis.\n+1 406 555 2389\nd_m_nickell@gmail.com",
    
    "Billie R. Courtney\nCardiologist\nHeart specialist focusing on cardiac health, prevention, and wellness with advanced, reliable medical support.\n+502 1234 567 890\nb_r_courtney@gmail.com",
    
    "Courtney A. Smith\nRehabilitation Therapy\nCertified therapist helping patients recover mobility and strength through personalized physical rehabilitation programs.\n+1 509 555 3417\nc_a_smith@gmail.com"
]


for index, doctor in enumerate(doctors): 
    os.mkdir(f'doctors/doctor {index + 1}')

    with open(f'doctors/doctor {index + 1}/info.txt', 'w') as f:
        f.write(doctor)

    print('Folder Created.')
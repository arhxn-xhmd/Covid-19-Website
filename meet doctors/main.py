import os

doctors = [
    "Dr. Aarav Mehta - A compassionate general physician who believes in treating every patient with empathy and understanding. Dedicated to making healthcare feel human.",
    "Dr. Karan Iyer - A young and energetic surgeon with steady hands and a calm mind. Passionate about precision and patient safety.",
    "Dr. Rohan Sethi - A confident physician known for his quick thinking and calm presence under pressure. Strives to make every diagnosis clear and every patient heard.",
    "Dr. Nisha Verma - A skilled pediatrician known for her gentle care and bright smile. Loves bringing comfort to children and confidence to parents.",
    "Dr. Devansh Nair - A detail-oriented specialist who loves solving complex cases. His calm eyes and kind words make patients feel instantly at ease.",
    "Nurse Priya Sharma - A pediatric nurse whose cheerful energy brings calm to anxious kids. Believes every smile can speed up recovery.",
    "Dr. Aanya Kapoor - A thoughtful family doctor who values listening as much as healing. Always ready with a reassuring smile and practical advice.",
    "Dr. Arjun Khanna - A dedicated surgeon with years of experience and an unshakable focus. Finds joy in helping others regain their strength.",
    "Dr. Devansh Nair - A detail-oriented specialist who loves solving complex cases. His calm eyes and kind words make patients feel instantly at ease.",
    "Dr. Fatima Rizvi - A devoted physician who blends professionalism with warmth. Known for her patience, empathy, and healing smile."
]

for index, doctor in enumerate(doctors):
    os.mkdir(f'meet doctors/doctor {index + 1}')

    with open(f'meet doctors/doctor {index + 1}/info.txt', 'w') as f:
        f.write(doctor)

    print(f'Folder doctor {index + 1} created.')

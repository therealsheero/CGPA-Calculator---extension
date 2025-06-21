
grade_to_points = {
    'O': 10,
    'A+': 10,
    'A': 9,
    'B+': 8,
    'B': 7,
    'C+': 6,
    'C': 5,
    'D': 4,
    'F': 0,
}

def get_valid_grade():
    while True:
        grade = input("Enter grade (O, A+, A, B+, B, C+, C, D, F): ").strip().upper()
        if grade in grade_to_points:
            return grade
        elif grade in ['AU', 'W', 'X', 'I']:
            print("Grade", grade, "will be ignored in CGPA calculation.")
            return None
        else:
            print("Invalid grade. Try again.")

def calculate_cgpa():
    total_points = 0
    total_credits = 0

    semesters = int(input("Enter the number of semesters: "))

    for sem in range(1, semesters + 1):
        print(f"\n--- Semester {sem} ---")
        num_subjects = int(input(f"Enter number of subjects in Semester {sem}: "))

        for subj in range(1, num_subjects + 1):
            print(f"\nSubject {subj}:")
            credits = int(input("Enter credits: "))
            grade = get_valid_grade()

            if grade:
                grade_points = grade_to_points[grade]
                total_points += credits * grade_points
                total_credits += credits
            else:
                print("Skipping this subject from CGPA calculation.")

    if total_credits == 0:
        print("No valid subjects entered. CGPA cannot be calculated.")
    else:
        cgpa = total_points / total_credits
        print(f"\nYour CGPA = {round(cgpa, 2)}")

# Run the CGPA calculator
calculate_cgpa()

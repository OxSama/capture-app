Feature: User interacts with Enrollment event page view/edit form 

Scenario: The user can view the sections, the labels and the values in the form
Given the user lands on the enrollment event page by having typed #enrollmentEventEdit?programId=IpHINAT79UW&orgUnitId=DiszpKrYNg8&teiId=tIJu6iqQxNV&enrollmentId=CCBLMntFuzb&stageId=A03MvHHogjR&eventId=V1CerIi3sdL 
And the user see the following text: Birth
And the user see the following text: Basic info 
And the user see the following text: Report date 
And the user see the following text: 2021-02-27 
And the user see the following text: MCH Apgar Score 
And the user see the following text: 11 
And the user see the following text: MCH Apgar comment 
And the user see the following text: MCH Weight (g) 
And the user see the following text: 3843 
And the user see the following text: MCH ARV at birth
And the user see the following text: NVP only
And the user see the following text: MCH BCG dose
And the user see the following text: No 
And the user see the following text: MCH OPV dose
And the user see the following text: Dose 1 
And the user see the following text: MCH Infant Feeding
And the user see the following text: Replacement
And the user see the following text: Birth certificate
And the user see the following text: Status 
And the user see the following text: Event completed 
And the user see the following text: Yes 

Scenario: The user can enter and exit the edit mode.
Given the user lands on the enrollment event page by having typed #/enrollmentEventEdit?programId=VBqh0ynB2wv&orgUnitId=DiszpKrYNg8&teiId=EaOyKGOIGRp&enrollmentId=xw4GwQ4hIsc&stageId=pTo4uMt3xur&eventId=a6f092d0d44
And the user see the following text: Enrollment: View Event 
And the user see the following text: Gender
When the user clicks on the edit button
Then the user see the following text: Enrollment: Edit Event 
When the user clicks on the cancel button
And the user see the following text: Enrollment: View Event 

Scenario: The tracker program rules are triggered correctly for the Child Program.
Given the user lands on the enrollment event page by having typed #enrollmentEventEdit?programId=IpHINAT79UW&orgUnitId=DiszpKrYNg8&teiId=tIJu6iqQxNV&enrollmentId=CCBLMntFuzb&stageId=A03MvHHogjR&eventId=V1CerIi3sdL 
And the user see the following text: MCH Apgar Score 
When the user clicks on the edit button
And the user set the apgar score to 3
Then the user see the following text: It is suggested that an explanation is provided when the Apgar score is below 4
And the user set the apgar score to -1
Then the user see the following text: If the apgar score is below zero, an explanation must be provided.

Scenario: The tracker program rules are triggered correctly for the Antenatal Program
Given the user lands on the enrollment event page by having typed #enrollmentEventEdit?programId=eBAyeGv0exc&orgUnitId=DiszpKrYNg8&teiId=EaOyKGOIGRp&enrollmentId=RiLEKhWHlxZ&stageId=Zj7UnCAulEk&eventId=NGxc7JpmqqD
And the user see the following text: Gender
When the user clicks on the edit button
And the user see the following text: Pregnant
And the user changes the gender to Male
And the user don't see the following text: Pregnant
And the user changes the gender to Female
And the user see the following text: Pregnant

Scenario: The tracker program rules are triggered correctly for the WHO RMNCH Tracker Program
Given the user lands on the enrollment event page by having typed #enrollmentEventEdit?programId=WSGAb5XwJ3Y&orgUnitId=DwpbWkiqjMy&teiId=yFcOhsM1Yoa&enrollmentId=ek4WWAgXX5i&stageId=edqlbukwRfQ&eventId=KNbStF7YTon  
And the user see the following text: WHOMCH Gestational age at visit
When the user clicks on the edit button
And the user don't see the following text: WHOMCH Low-dose acetylsalicylic acid given
When the user sets WHOMCH Plurality assessed to Twins
Then the user see the following text: WHOMCH Low-dose acetylsalicylic acid given
When the user sets WHOMCH Plurality assessed to Singleton
Then the user don't see the following text: WHOMCH Low-dose acetylsalicylic acid given

Scenario: User can modify and save the data in the form
Given the user lands on the enrollment event page by having typed #enrollmentEventEdit?programId=IpHINAT79UW&orgUnitId=DiszpKrYNg8&teiId=tIJu6iqQxNV&enrollmentId=CCBLMntFuzb&stageId=A03MvHHogjR&eventId=V1CerIi3sdL 
Then the user see the following text: Enrollment: View Event 
And the user see the following text: 11 
When the user clicks on the edit button
And the user set the apgar score to 5
And the user clicks on the save button
Then the user see the following text: Enrollment: View Event 
And the user see the following text: 5
When the user clicks on the edit button
And the user set the apgar score to 11
And the user clicks on the save button
Then the user see the following text: Enrollment: View Event 
And the user see the following text: 11 
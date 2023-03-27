import pandas as pd
import datetime
dataframe=pd.read_excel('C:\\Users\\AYUSH SHUKLA\\Desktop\\Face-recognition-attendance-system\\backend\\facerecog\\Attendance.xlsx')
print(dataframe)
# Create a list of data to add to the column
data_list = ['ayuhs', 'data2', 'data3']

# Add the list of data to the particular column
dataframe['Name'] = data_list

# Save the updated DataFrame to a new Excel file
dataframe.to_excel('Attendance.xlsx', index=False)
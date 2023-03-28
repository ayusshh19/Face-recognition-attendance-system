from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User
import cv2
import dlib
import imutils
from imutils import face_utils
from imutils.video import VideoStream
from imutils.face_utils import rect_to_bb
from imutils.face_utils import FaceAligner
import time
from facerecog.settings import BASE_DIR
import os
import face_recognition
from face_recognition.face_recognition_cli import image_files_in_folder
import pickle
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
import numpy as np
from django.contrib.auth.decorators import login_required
import matplotlib as mpl
import matplotlib.pyplot as plt
from sklearn.manifold import TSNE
import datetime
from django_pandas.io import read_frame
import seaborn as sns
import pandas as pd
from django.db.models import Count
# import mpld3
import matplotlib.pyplot as plt
from pandas.plotting import register_matplotlib_converters
from matplotlib import rcParams
import math
from django.views.generic.edit import CreateView
from django.views.generic import TemplateView
from .forms import registerform, usernameForm, subjectform
from .models import User, Attendance
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import Userserializer,Attendanceserializer
from django.db.models import Q
import csv
from django.http import HttpResponse
from xlsxwriter.utility import xl_rowcol_to_cell
mpl.use('Agg')


class registeruser(CreateView):
    model = User
    fields = ['username', 'firstname', 'lastname', 'rollno', 'email',
              'class_in', 'phone_number', 'Institute', 'current_sem']
    template_name = 'register.html'
    success_url = '/thanks/'


def username_present(username):
    if User.objects.filter(username=username).exists():
        return True

    return False


def create_dataset(username):
    id = username
    if (os.path.exists('face_recognition_data/training_dataset/{}/'.format(id)) == False):
        os.makedirs('face_recognition_data/training_dataset/{}/'.format(id))
    directory = 'face_recognition_data/training_dataset/{}/'.format(id)

    # Detect face
    # Loading the HOG face detector and the shape predictpr for allignment

    print("[INFO] Loading the facial detector")
    detector = dlib.get_frontal_face_detector()
    # Add path to the shape predictor ######CHANGE TO RELATIVE PATH LATER
    predictor = dlib.shape_predictor(
        'face_recognition_data/shape_predictor_68_face_landmarks.dat')
    fa = FaceAligner(predictor, desiredFaceWidth=96)
    # capture images from the webcam and process and detect the face
    # Initialize the video stream
    print("[INFO] Initializing Video stream")
    vs = VideoStream(src=0).start()
    # time.sleep(2.0) ####CHECK######

    # Our identifier
    # We will put the id here and we will store the id with a face, so that later we can identify whose face it is

    # Our dataset naming counter
    sampleNum = 0
    # Capturing the faces one by one and detect the faces and showing it on the window
    while (True):
        # Capturing the image
        # vs.read each frame
        frame = vs.read()
        # Resize each image
        frame = imutils.resize(frame, width=800)
        # the returned img is a colored image but for the classifier to work we need a greyscale image
        # to convert
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # To store the faces
        # This will detect all the images in the current frame, and it will return the coordinates of the faces
        # Takes in image and some other parameter for accurate result
        faces = detector(gray_frame, 0)
        # In above 'faces' variable there can be multiple faces so we have to get each and every face and draw a rectangle around it.

        for face in faces:
            print("inside for loop")
            (x, y, w, h) = face_utils.rect_to_bb(face)

            face_aligned = fa.align(frame, gray_frame, face)
            # Whenever the program captures the face, we will write that is a folder
            # Before capturing the face, we need to tell the script whose face it is
            # For that we will need an identifier, here we call it id
            # So now we captured a face, we need to write it in a file
            sampleNum = sampleNum+1
            # Saving the image dataset, but only the face part, cropping the rest

            if face is None:
                print("face is none")
                continue
            cv2.imwrite(directory+'/'+str(sampleNum)+'.jpg', face_aligned)
            face_aligned = imutils.resize(face_aligned, width=400)
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 1)
            # Before continuing to the next loop, I want to give it a little pause
            # waitKey of 100 millisecond
            cv2.waitKey(50)

        # Showing the image in another window
        # Creates a window with window name "Face" and with the image img
        cv2.imshow("Add Images", frame)
        # Before closing it we need to give a wait command, otherwise the open cv wont work
        # @params with the millisecond of delay 1
        cv2.waitKey(1)
        # To get out of the loop
        if (sampleNum > 50):
            break

    # Stoping the videostream
    vs.stop()
    # destroying all the windows
    cv2.destroyAllWindows()


@api_view(['GET', 'POST'])
def registerapi(request):
    if request.method == 'POST':
        print(request.data)
        username = request.data.get('username')
        serializer = Userserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if username_present(username):
                try:
                    create_dataset(username)
                    res = {
                        'msg': 'User successfully resgistered!! and Dataset created!'}
                except:
                    print('An exception occurred')
            else:
                res = {'msg': 'Username does not exist!!!'}
            return Response(res, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        user = User.objects.all()
        serializer = Userserializer(user, many=True)
        return Response(serializer.data)


def predict(face_aligned, svc, threshold=0.7):
    try:
        x_face_locations = face_recognition.face_locations(face_aligned)
        faces_encodings = face_recognition.face_encodings(
            face_aligned, known_face_locations=x_face_locations)
        if (len(faces_encodings) == 0):
            return ([-1], [0])

    except:

        return ([-1], [0])

    prob = svc.predict_proba(faces_encodings)
    result = np.where(prob[0] == np.amax(prob[0]))
    if (prob[0][result[0]] <= threshold):
        return ([-1], prob[0][result[0]])

    return (result[0], prob[0][result[0]])


@api_view(['GET'])
def train(request):

    training_dir = 'face_recognition_data/training_dataset'
    count = 0
    for person_name in os.listdir(training_dir):
        curr_directory = os.path.join(training_dir, person_name)
        if not os.path.isdir(curr_directory):
            continue
        for imagefile in image_files_in_folder(curr_directory):
            count += 1

    X = []
    y = []
    i = 0

    for person_name in os.listdir(training_dir):
        print(str(person_name))
        curr_directory = os.path.join(training_dir, person_name)
        if not os.path.isdir(curr_directory):
            continue
        for imagefile in image_files_in_folder(curr_directory):
            print(str(imagefile))
            image = cv2.imread(imagefile)
            try:
                X.append((face_recognition.face_encodings(image)[0]).tolist())
                y.append(person_name)
                i += 1
            except:
                print("removed")
                os.remove(imagefile)
                

    targets = np.array(y)
    encoder = LabelEncoder()
    encoder.fit(y)
    y = encoder.transform(y)
    X1 = np.array(X)
    print("shape: " + str(X1.shape))
    np.save('face_recognition_data/classes.npy', encoder.classes_)
    svc = SVC(kernel='linear', probability=True)
    svc.fit(X1, y)
    svc_save_path = "face_recognition_data/svc.sav"
    with open(svc_save_path, 'wb') as f:
        pickle.dump(svc, f)

    # vizualize_Data(X1,targets)

    return Response({'msg': 'training completed successfully!!!'}, status=status.HTTP_200_OK)


def total_number_of_student():
    usernum = User.objects.all()
    return (len(usernum)-1)


def mark_your_attendance(request, subject):
    detector = dlib.get_frontal_face_detector()

    # Add path to the shape predictor ######CHANGE TO RELATIVE PATH LATER
    predictor = dlib.shape_predictor(
        'face_recognition_data/shape_predictor_68_face_landmarks.dat')
    svc_save_path = "face_recognition_data/svc.sav"
    with open(svc_save_path, 'rb') as f:
        svc = pickle.load(f)
    fa = FaceAligner(predictor, desiredFaceWidth=96)
    encoder = LabelEncoder()
    encoder.classes_ = np.load('face_recognition_data/classes.npy')

    faces_encodings = np.zeros((1, 128))
    no_of_faces = len(svc.predict_proba(faces_encodings)[0])
    count = dict()
    present = dict()
    log_time = dict()
    start = dict()
    for i in range(no_of_faces):
        count[encoder.inverse_transform([i])[0]] = 0
        present[encoder.inverse_transform([i])[0]] = False
    vs = VideoStream(src=0).start()

    sampleNum = 0

    while (True):

        frame = vs.read()

        frame = imutils.resize(frame, width=800)

        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = detector(gray_frame, 0)
        for face in faces:
           
            print("INFO : inside for loop")
            (x, y, w, h) = face_utils.rect_to_bb(face)
            # print(face)
            face_aligned = fa.align(frame, gray_frame, face)
            # print(face_aligned)
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 1)

            (pred, prob) = predict(face_aligned, svc)
            # print(pred)
            if (pred != [-1]):

                person_name = encoder.inverse_transform(np.ravel([pred]))[0]
                pred = person_name
                # print(f"pred {pred}")
                if count[pred] == 0:
                    start[pred] = time.time()
                    count[pred] = count.get(pred, 0) + 1

                if count[pred] == 4 and (time.time()-start[pred]) > 1.2:
                    count[pred] = 0

                # if count[pred] == 4 and (time.time()-start) <= 1.5:
                else:
                    present[pred] = True
                    # print('yaaha issue nhi')
                    # print(present)
                    log_time[pred] = datetime.datetime.now()
                    count[pred] = count.get(pred, 0) + 1
                    # print(pred, present[pred], count[pred])
                    # print(f"idhar hu ")
                    # print(person_name)
                cv2.putText(frame, str(person_name) + str(prob), (x+6,y+h-6), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
                # print('idhar kuch hua')

            else:
                person_name = "kon ho bhai"
                cv2.putText(frame, str(person_name), (x+6, y+h-6),cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
                # print('idhar pata hua')

            # cv2.putText()
            # Before continuing to the next loop, I want to give it a little pause
            # waitKey of 100 millisecond
            # cv2.waitKey(50)

        # Showing the image in another window
        # Creates a window with window name "Face" and with the image img
        cv2.imshow("Mark Attendance - In - Press q to exit", frame)
        # Before closing it we need to give a wait command, otherwise the open cv wont work
        # @params with the millisecond of delay 1
        # cv2.waitKey(1)
        # To get out of the loop
        key = cv2.waitKey(50) & 0xFF
        if (key == ord("q")):
            break

    # Stoping the videostream
    vs.stop()

    # destroying all the windows
    cv2.destroyAllWindows()
    update_attendance_in_db_in(present, subject)


def update_attendance_in_db_out(present):
    for person in present:
        user = User.objects.get(username=person)
        if present[person] == True:
            a = Attendance(user=user, present=True)
            a.save()


@api_view(['GET', 'POST'])
def mark(request):
    if request.method == 'POST':
        try:
            subject = request.data.get('subject')
            print(subject)
            mark_your_attendance(request, subject)
            return Response({'msg': 'Your attendance have been marked successfully!!!'}, status=status.HTTP_200_OK)
        except:
            print('An exception occurred')
            return Response({'msg': 'Something went wrong!!'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        return Response({'msg': 'Please enter the subject!!'}, status=status.HTTP_200_OK)


def update_attendance_in_db_in(present, subject):
    today = datetime.date.today()
    print(present)
    for person in present:
        print(person)
        user = User.objects.get(username=person)
        # print(user)
        try:
            qs = Attendance.objects.get(
                username=user, subject=subject, todaysdate=today)
            print(qs)
        except:
            qs = None

        if qs is None:
            if present[person] == True:
                print(present)
                a = Attendance(username=user, subject=subject,
                               todaysdate=today, present=True)
                a.save()
            else:
                a = Attendance(username=user, subject=subject,
                               todaysdate=today, present=False)
                a.save()
        else:
            if present[person] == True:
                # print(present)
                qs.present = True
                qs.save(update_fields=['present'])


@api_view(['GET', 'POST'])
def visualisation(request):
    if request.method == 'POST':
        print(request.data)
        try:
            date = request.data.get('todaysdate')
            print(date)
            subject = request.data.get('subject')
            obj=Attendance.objects.filter(Q(subject=subject)&Q(todaysdate=date))
            print(obj)
            serializer = Attendanceserializer(obj,many=True)
            print(serializer.data)
            return Response({'msg': serializer.data}, status=status.HTTP_200_OK)
        except:
            print('An exception occurred')
            return Response({'msg': serializer.errors}, status=status.HTTP_200_OK)

    if request.method == 'GET':
        student=User.objects.all()
        attendance=Attendance.objects.all()
        stuserializer=Userserializer(student,many=True)
        attendserializer=Attendanceserializer(attendance,many=True)
        return Response({'msg': {'stu':stuserializer.data,'attend':attendserializer.data}})
# from datetime import datetime
from datetime import date
from django.http import FileResponse
def exceldata(request):
    dataframe=pd.read_excel('C:\\Users\\AYUSH SHUKLA\\Desktop\\Face-recognition-attendance-system\\backend\\facerecog\\Attendance.xlsx' ,date_parser=lambda x: pd.to_datetime(x, format='%Y-%m-%d'))
    # Create a list of data to add to the column
    student=User.objects.all()
    attendance=Attendance.objects.all()
    stuserializer=Userserializer(student,many=True)
    attendserializer=Attendanceserializer(attendance,many=True)
    # print(stuserializer.data)
    # print(attendserializer.data)
    usernamelist=[]
    for item in stuserializer.data:
       usernamelist.append([int(item['rollno']),item['username'],item['id']])
    # print(attendserializer.data)
    # print(attendserializer.data)
    sorted_list = sorted(usernamelist, key=lambda x: x[0])
    # print(sorted_list)
    rollnolist=[]
    namelist=[]
    datelist=[]
    Togettotal=[]
    for item in sorted_list:
        rollnolist.append(item[0])
        namelist.append(item[1])
        Togettotal.append(0)
    for item in attendserializer.data:
        date_time_obj = datetime.datetime.strptime(item['todaysdate'], '%Y-%m-%d')
        if date_time_obj>=datetime.datetime(2023,3,1):
            datelist.append(date.isoformat(date_time_obj))
    limited=list(set(datelist))
    mainlist=[]
    for limit in limited:
        finallist=[]
        for item in attendserializer.data:
            # print(f"uaha pe {item}")
            if item['todaysdate'] in limit and item['present']:
                finallist.append(item['username'])
        mainlist.append([limit,list(set(finallist))])
    # Add the list of data to the particular column
    dataframe['Name'] = namelist
    dataframe['rollno'] = rollnolist
    percentcount=0
    for item in mainlist:
        current=0
        percentcount+=1
        listseq=[]
        for user in sorted_list:
            # print(user)
            if user[2] in item[1]:
                Togettotal[current]+=1
                listseq.append('Present')
            else:
                listseq.append('absent')
            current+=1
        # print(listseq)
        # print(item)
        dataframe[item[0]]=listseq
    print(Togettotal)
    percentfinal=[]
    for item in Togettotal:
        percentfinal.append((item/percentcount)*100)
    dataframe['Total'] = Togettotal
    dataframe['Attendance percentage'] = percentfinal
    # Save the updated DataFrame to a new Excel file
    dataframe.to_excel('Attendance.xlsx', index=False)
    excel_file = open('C:\\Users\\AYUSH SHUKLA\\Desktop\\Face-recognition-attendance-system\\backend\\facerecog\\Attendance.xlsx', 'rb')
    
    # Return the file as a response with the appropriate content type and headers
    response = FileResponse(excel_file, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="example.xlsx"'
    return response



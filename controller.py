# write data to /data/data.json

import json
# import pandas as pd
import csv
# def read() -> list:
#     with open('data/data.json', 'r') as file:
#         data = json.load(file)
#     return data

# def write(data:dict):
#     arr = read()
#     arr.append(data)
#     with open('data/data.json', 'w') as file:
#         json.dump(arr, file, indent=4)

filename = 'data/data.csv'
def write_to_csv(data):
    with open(filename, 'w', newline='',encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Username', 'Text', 'Time'])  # Viết tiêu đề cột
        # writer.writerows(data)  # Viết các dòng dữ liệu

def read_from_csv():
    with open(filename, 'r', newline='') as file:
        reader = csv.reader(file)
        data = list(reader)
    return data
    
def append_to_csv(data):
    with open(filename, 'a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(data)


def list_of_lists_to_list_of_dicts(data_list):
    keys = ['user', 'text', 'time']
    list_of_dicts = []
    for sublist in data_list:
        dictionary = dict(zip(keys, sublist))
        list_of_dicts.append(dictionary)
    return list_of_dicts

data = read_from_csv()
# print(list_of_lists_to_list_of_dicts(data))

# write_to_csv(filename)
# print(read_from_csv())

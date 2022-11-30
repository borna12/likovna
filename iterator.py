import os, glob
import xlsxwriter

adresa="/".join(os.getcwd().split(os.sep))+"/cetvrti-svezak-txt"
workbook = xlsxwriter.Workbook('demo.xlsx')
worksheet = workbook.add_worksheet()
worksheet.write('A1', 'Natuknica')
worksheet.write('B1', 'Stranica')



i=2
for filename in glob.glob(os.path .join(adresa, '*.txt')):
   with open(os.path.join(os.getcwd(), filename), mode='r',  encoding="utf-8") as f:
    stranica= (f.readline().strip('\n'))
    for x in f.readlines():
        worksheet.write('A'+str(i), x.strip('\n'))
        worksheet.write('B'+str(i), stranica)
        i+=1

workbook.close()
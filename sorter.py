import pandas
csvData = pandas.read_csv('podatci.csv')
csvData.sort_values(["Natuknica"], axis=0, ascending=[True], inplace=True)
csvData.dropna(subset = ['Tekst'], inplace = True)
csvData.to_csv('sortirano.csv', index=False)

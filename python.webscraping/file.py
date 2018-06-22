import requests
import bs4
from selenium import webdriver

n=0

driver=webdriver.Firefox(executable_path= "C:/New Folder/geckodriver.exe")
driver.get("http://www.fakenamegenerator.com")
csvfile=open("csvfile.csv","a")
csvfile.write('name,address,phone\n')

while(n<10):
	buton=driver.find_element_by_xpath('//*[@id="genbtn"]')
	buton.click()
	n=n+1
	res=requests.get('https://www.fakenamegenerator.com')
	soup=bs4.BeautifulSoup(res.text,'html.parser')
	containers=soup.findAll('div',{'class':'info'})
	container=containers[0]
	name=container.findAll('h3')
	address=container.findAll('div',{'class':'adr'})
	adress=address[0].text.replace(","," ")
	phone=container.find('dt',text='Phone').findNext('dd').contents[0]
	print(name[0].text)
	print(adress.strip())
	print(phone)
	csvfile.write(name[0].text+','+ adress.strip()+','+phone+'\n')
csvfile.close()


import random
import numpy as np
import time
import string

# INSERT INTO TABLE(ColName)
# VALUES(colorName)


def GetInsertStr(tableName, paramNames, values):
    return f"INSERT INTO {tableName}({paramNames}) VALUES({values})\n"


def GetComment(tableName):
    return f"\n--{tableName} TABLE\n"


def generatePhoneNumber():
    i = 0
    res = '+380'
    while i <= 5:
        res += str(random.randint(0, 9))
        i = i + 1
    return res


def str_time_prop(start, end, format, prop):
    """Get a time at a proportion of a range of two formatted times.

    start and end should be strings specifying times formated in the
    given format (strftime-style), giving an interval [start, end].
    prop specifies how a proportion of the interval to be taken after
    start.  The returned time will be in the specified format.
    """

    stime = time.mktime(time.strptime(start, format))
    etime = time.mktime(time.strptime(end, format))

    ptime = stime + prop * (etime - stime)

    return time.strftime(format, time.localtime(ptime))


def randomDates(start, end, count):
    i = 0
    res = []
    while i <= count:
        res.append(str_time_prop(start, end, '%m/%d/%Y', random.random()))
        i = i + 1
    return res


def randomString(stringLength=10):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


f = open("napovnenya.txt", "w")

# Things that are used for a lot of tables
streets = ['Комарова', 'Дорошенка', 'Бандери',
           'Київська', 'Головна', 'Шевченка', 'Свободи']
buildings = np.arange(1, 30, 1)
startedDates = randomDates("1/1/2019", "12/31/2019", 50)
finishedDates = randomDates("1/1/2020", "12/31/2020", 50)
names = ['Олександр', 'Роман', 'Андрій', 'Петро', 'Сергій',
         'Михайло', 'Ігор', 'Олег', 'Володимир', 'Назар']
surnames = ['Петренко', 'Зібайло', 'Кіпіш', 'Размук', 'Брітвін',
            'Захватка', 'Бухів', 'Мазурик', 'Нечай', 'Холодний']
furnitureDescription = """Меблі (від лат. mobile — рухомий через фр. meuble) — рухлядь, рухоме майно, 
тобто та частина майна, яку на відміну від нерухомого, можливо переміщувати. 
У вузькому розумінні це лише вбудовані чи розташовані окремо предмети житла, 
призначені для зберігання різних предметів використання людини, комфорту. 
Існує також давньоруський відповідник поняття «меблі» і «рухоме майно». Це — «рухлядь».
У зв"язку з тим, що «рухоме майно» як правило має менший термін використання ніж нерухоме, 
це слово стало також вживатись у значенні «речі, зокрема предмети одягу і оздоблення, 
які швидко тліють, або вже зотліли», в якому і вживається в наш час.
"""

detailDescription = """Фурнітура (фр. fourniture від fournir — «доставляти», «постачати») — допоміжні частини та деталі, 
необхідні для виготовлення якогось цільного предмета.

Види
Меблева фурнітура — засувки, ручки, петлі
Галантерейна фурнітура — пряжки, шнурки, блискавки
Будівельна фурнітура — замки, коннектори
Віконна фурнітура — ручки, петлі тощо.
Також до фурнітури відносять частини вогнепальної зброї, які традиційно виготовлялися з дерева — ложа, 
приклад, пістолетна рукоятка, цівка.

Фурнітура, як правило, виготовляється окремо від виробництва основних складових виробу, тому що, 
здебільшого вимагає іншого технологічного процесу.
"""

# Countries TABLE
f.write(GetComment("Countries"))
countryNames = ['Україна', 'Польща', 'Німеччина', 'Росія', 'США', 'Китай', 'Японія',
                'Фінляднія', 'Франція', 'Італія', 'Іспанія']
for countryName in countryNames:
    insertStr = GetInsertStr("Countries", "Name", f'\'{countryName}\'')
    f.write(insertStr)

# Cities TABLE
f.write(GetComment("Cities"))
citiesNames = ['Київ', 'Львів', 'Чернівці', 'Рівне',
               'Сокаль', 'Тернопіль', 'Черкаси', 'Херсон']
for cityName in citiesNames:
    insertStr = GetInsertStr(
        "Cities", "CountryId, Name", f'{1}, \'{cityName}\'')
    f.write(insertStr)

# Colors TABLE
f.write(GetComment("Colors"))
colorNames = ['Синій', 'Зелений', 'Жовтий', 'Червоний',
              'Чорний', 'Білий', 'Сірий', 'Коричновий']
for colorName in colorNames:
    insertStr = GetInsertStr("Colors", "Name", f'\'{colorName}\'')
    f.write(insertStr)

# Materials TABLE
f.write(GetComment("Materials"))
materialNames = ['Дерево', 'ДСП', 'Фанера','Скло', 'Акрил', 'Сталь', 'Пластик']
for materialName in materialNames:
    insertStr = GetInsertStr("Materials", "Name", f'\'{materialName}\'')
    f.write(insertStr)

# Producers TABLE
f.write(GetComment("Producers"))
producerNames = ['Materials Inc', 'BestMat', 'Mat4U', 'MatProd']
for producerName in producerNames:
    countryId = random.randrange(1, len(countryNames) + 1)
    insertStr = GetInsertStr("Producers", "Name, CountryId", f'\'{producerName}\', {countryId}')
    f.write(insertStr)

# Providers TABLE
f.write(GetComment("Providers"))
providerNames = ['Fast&Furious', 'BestProv', 'Provide4You', 'DetProv Inc']
for providerName in providerNames:
    cityId = random.randrange(1, len(citiesNames) + 1)
    phoneNumber = generatePhoneNumber()
    street = random.choice(streets)
    building = random.choice(buildings)
    insertStr = GetInsertStr("Providers", "Name, CityId, PhoneNumber, Street, Building", 
        f'\'{providerName}\', {cityId}, \'{phoneNumber}\', \'{street}\', {building}')
    f.write(insertStr)

# Details TABLE
f.write(GetComment("Details"))
detailNums = np.arange(1, 61)
detailNames = []
for detail in detailNums:
    detailNames.append("Деталь " + str(detail))
for name in detailNames:
    materialId = random.randrange(1, len(materialNames) + 1)
    colorId = random.randrange(1, len(colorNames) + 1)
    producerId = random.randrange(1, len(producerNames) + 1)
    price = random.randrange(100, 1000)
    insertStr = GetInsertStr("Details", "MaterialId, ColorId, ProducerId, Name, Price, Description",
                             f'{materialId}, {colorId}, {producerId}, \'{name}\', {price}, \'{detailDescription}\'')
    f.write(insertStr)

# Warehouses TABLE
f.write(GetComment("Warehouses"))
warehouseCount = 10
i = 0
while i <= warehouseCount:
    cityId = random.randrange(1, len(citiesNames) + 1)
    street = random.choice(streets)
    building = random.choice(buildings)
    insertStr = GetInsertStr("Warehouses", "CityId, Street, Building",
                             f'{cityId}, \'{street}\', {building}')
    f.write(insertStr)
    i = i + 1

# WarehouseDetails TABLE
f.write(GetComment("WarehouseDetails"))
warehouseDetailsCount = 55
i = 1
while i <= warehouseCount:
    warehouseId = i
    j = 0
    usedDetails = []
    while j < warehouseDetailsCount:
        while True:
            detailId = random.randrange(1, len(detailNames) + 1)
            if not (detailId in usedDetails):
                usedDetails.append(detailId)
                break
        count = random.randrange(100, 1000)
        insertStr = GetInsertStr("WarehouseDetails", "DetailId, Count, WarehouseId",
                             f'{detailId}, {count}, {warehouseId}')
        f.write(insertStr)
        j = j + 1
    i += 1

# Categories TABLE
# f.write(GetComment("Categories"))
# mainCategoryNames = ['Гостинна', 'Кухня', 'Ванна', 'Спальня', 'Офіс']
# for categoryName in mainCategoryNames:
#     insertStr = GetInsertStr("Categories", "Name", f'\"{categoryName}\", NULL')
#     f.write(insertStr)
# subCategoryNames = ('Робочі Столи', 'Шафи', 'Ліжка', 'Дзеркала',
#                     'Стільчики', 'Обідні Столи', 'Дивани', 'Стелажі')
# for categoryName in subCategoryNames:
#     parentCatergoryId = random.randrange(1, len(mainCategoryNames) + 1)
#     insertStr = GetInsertStr("Categories", "Name",
#                              f'\"{categoryName}\", {parentCatergoryId}')
#     f.write(insertStr)

# Categories TABLE
f.write(GetComment("Categories"))
categoryNames = ('Робочі Столи', 'Шафи', 'Ліжка', 'Дзеркала',
                    'Стільчики', 'Обідні Столи', 'Дивани', 'Стелажі')
for categoryName in categoryNames:
    insertStr = GetInsertStr("Categories", "Name",
                             f'\'{categoryName}\'')
    f.write(insertStr)

# Styles TABLE
f.write(GetComment("Styles"))
styleNames = ('Традиційний', 'Модерн', 'Сучасний', 'Перехідний', 'Преміум')
for styleName in styleNames:
    insertStr = GetInsertStr("Styles", "Name", f'\'{styleName}\'')
    f.write(insertStr)

# Collections TABLE
f.write(GetComment("Collections"))
collectionNums = np.arange(1, 11)
collectionNames = []
for collection in collectionNums:
    collectionNames.append("Колекція  " + str(collection))
for name in collectionNames:
    styleId = random.randrange(1, len(styleNames) + 1)
    insertStr = GetInsertStr("Collections", "Name, StyleId",
                             f'\'{name}\', {styleId}')
    f.write(insertStr)

# Furnitures TABLE
f.write(GetComment("Furnitures"))
furnitureCount = 80
furnitureNums = np.arange(1, furnitureCount + 1)
furnitureNames = []
for furniture in furnitureNums:
    furnitureNames.append("Мебель  " + str(furniture))
for name in furnitureNames:
    timeToBuild = random.randrange(1, 11, 1)
    categoryId = random.randrange(1, len(categoryNames) + 1)
    heigth = random.randrange(100, 1001, 1)
    width = random.randrange(100, 1001, 1)
    depth = random.randrange(100, 1001, 1)
    collectionId = random.randrange(1, len(collectionNames) + 1)
    price = random.randrange(100, 1000, 1)
    styleId = random.randrange(1, len(styleNames) + 1)
    insertStr = GetInsertStr("Furnitures", "Name, TimeToBuild, CategoryId, Height, Width, Depth, CollectionId, Price, Description",
                             f'\'{name}\', {timeToBuild}, {categoryId}, {heigth}, {width}, {depth}, {collectionId}, {price}, \'{furnitureDescription}\'')
    f.write(insertStr)

# DetailInFurniture TABLE
f.write(GetComment("DetailsInFurnitures"))
i = 1
while i <= furnitureCount:
    detailsPerFurniture = random.randrange(4, 10)
    j = 0
    usedDetails = []
    while j < detailsPerFurniture:
        furnitureId = i
        detailId = random.randrange(1, len(detailNames) + 1)
        while detailId in usedDetails:
            detailId = random.randrange(1, len(detailNames) + 1)
        usedDetails.append(detailId)
        count = random.randrange(1, 11)
        isAdditional = random.choice([1, 0, 0, 0])
        timeToIntegrate = 0
        if isAdditional:
            timeToIntegrate = random.randrange(1, 11, 1)
        insertStr = GetInsertStr("DetailsInFurnitures", "DetailId, Count, FurnitureId, IsAdditional, TimeToIntegrate",
                                f'{detailId}, {count}, {furnitureId}, {isAdditional}, {timeToIntegrate}')
        f.write(insertStr)
        j += 1
    i = i + 1

# PaymentSystems TABLE
f.write(GetComment("PaymentSystems"))
psNames = ('PayPal', 'Готівка', 'LiqPay', 'WebMoney', 'Visa/Mastercard')
for psName in psNames:
    insertStr = GetInsertStr("PaymentSystems", "Name", f'\'{psName}\'')
    f.write(insertStr)

# Customers TABLE
f.write(GetComment("Customers"))
for customerName in names:
    phoneNumber = generatePhoneNumber()
    insertStr = GetInsertStr(
        "Customers", "Name, PhoneNumber", f'\'{customerName}\', \'{phoneNumber}\'')
    f.write(insertStr)

# Posts TABLE
f.write(GetComment("Posts"))
postNames = ('Менеджер з продажу','Менеджер з поставок', 'Фахівець з виробництва', 'Працівник складу', 'Адмін')
salary = (1100, 1000, 700, 600, 2000)
i = 0
for postName in postNames:
    insertStr = GetInsertStr("Posts", "Name, Salary",
                             f'\'{postName}\', {salary[i]}')
    f.write(insertStr)
    i = i + 1

# Workers TABLE
f.write(GetComment("Workers"))
i = 0
for workerName in names:
    postId = random.randrange(1, len(postNames) + 1)
    name = workerName
    surname = random.choice(surnames)
    email = f'worker{i}@gmail.com'
    phone = generatePhoneNumber()
    password = randomString()
    status = "Вільний"
    insertStr = GetInsertStr("Workers", "PostID, Name, Surname, Email, PhoneNumber, Password, Status",
                             f'{postId}, \'{name}\', \'{surname}\', \'{email}\', \'{phone}\', \'{password}\', \'{status}\'')
    f.write(insertStr)
    i = i + 1

# I THINK WE SHOULD NOT SEED THIS DATA, IT SHOULD BE FILLED IN APP FOR KURSACH
# BUT FOR TSYMBALUK WE NEED THIS SEEDING

#Orders TABLE
# f.write(GetComment("Orders"))
# ordersCount = 100
# i = 0
# while i <= ordersCount:
#     customerId = random.randrange(1, len(names) + 1)
#     psId = random.randrange(1, len(psNames) + 1)
#     workerId =  random.randrange(1, len(names) + 1)
#     date = random.choice(startedDates)
#     status = random.choice(["Виготовляється", "Завершено", "Доставляється", "Прийнято"])
#     insertStr = GetInsertStr("Orders", "CustomerID, PaymentSystemId, WorkerId, OrderDate, Status",
#         f'{customerId}, {psId}, {workerId}, \"{date}\", \"{status}\"')
#     f.write(insertStr)
#     i = i + 1

# #DeliveryInfos TABLE
# f.write(GetComment("DeliveryInfos"))
# ordersCount = 100
# i = 0
# while i <= ordersCount:
#     cityId = random.randrange(1, len(citiesNames) + 1)
#     price = random.randint(10, 50)
#     street = random.choice(streets)
#     building = random.choice(buildings)
#     startDate = random.choice(startedDates)
#     endDate = random.choice(finishedDates)
#     insertStr = GetInsertStr("DeliveryInfos", "OrderId, CityId, DeliveryPrice, Street, Building, DeliveryStarted, DeliveryFinished",
#         f'{i}, {cityId}, {price}, \"{street}\", {building}, \"{startDate}\", \"{endDate}\"')
#     f.write(insertStr)
#     i = i + 1

#WarehouseMovement TABLE
# f.write(GetComment("WarehouseMovements"))
# movementCount = 20
# i = 0
# while i < 20:
#     toWarehouseDetailId = random.randrange(1, warehouseDetailsCount)
#     fromWarehouseDetailId = random.randrange(1, warehouseDetailsCount)
#     date = "{}.{}.{}"
#     date = date.format(random.randrange(1, 30), random.randrange(1, 12), 2019)
#     workerId = random.randrange(1, len(names) + 1)
#     insertStr = GetInsertStr("WarehouseMovement", "ToWarehouse_DetailID, FromWarehouse_DetailID, Date, WorkerID",
#         f'{toWarehouseDetailId}, {fromWarehouseDetailId}, {date}, {workerId}')
#     f.write(insertStr)
#     i = i + 1

# Coming TABLE
# f.write(GetComment("Comings"))
# comingFurnitureCount = 100
# i = 0
# while i <= comingFurnitureCount:
#     warehouseDetailID = i
#     date = "{}.{}.{}"
#     date = date.format(random.randrange(1, 30), random.randrange(1, 12), 2019)
#     detailOrderRowId = random.randrange(1, len(detailOrderRowCount) + 1)
#     workerId = random.randrange(1, len(names) + 1)
#     insertStr = GetInsertStr("Coming", "Warehouse_DetailID, Date, DetailOrderRowID, WorkerID",
#         f'{warehouseDetailID}, {date}, {detailOrderRowId}, {workerId}')
#     f.write(insertStr)
#     i = i + 1

f.close()
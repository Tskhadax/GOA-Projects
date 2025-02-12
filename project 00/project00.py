#bank project

print(" ")
print("Welcome to S B G bank!")                                  #introduction
print("Please create an account to continue working with us!")
print(" ")
username = input("Please create your username: ")                #verification
password = input("Please create your pasword: ")
pin_code = int(input("Please create your pin code: "))
age = int(input("Please enter your real age: "))
if age > 18 or age == 18 :

    personal_number = input("Please put in your personal number: ")
    name = input("Please enter your real name: ")
    lastname = input("Pelase enter your real lastname: ")

    print(" ")
    print("Hello " + name + " " + lastname + "! Our bank S B G thanks you for choosing us! We will try not to disappoint you and will work with you until the end!")

    print(" ")
    print("How can we help you?")

    print(" ")
    print("Options: ")                                           #options of services 
    print("1 - I'm interested in the current exchange rates!")
    print("2 - I want to take out a loan!")
    print("3 - I want to transfer money to another bank account!")
    print("4 - I want to block my card!")
    print("5 - I want to cash out my money!")
    print("6 - I want to create new account!")
    print("7 - i want to create a card!")
    print("8 - i have some other needs")
    print(" ")
    hello = int(input("Please select number 1-8: "))                 #choosing the service

    print(" ")
    if hello == 1 :                                                             #exchange rates
        print("100 AED (United Arab Emirates Dirhams)    =    7.4747 GEL (Georgian Lari)")
        print("1000 AMD (Armenian Dram)    =    7.0478 GEL (Georgian Lari)")
        print("1 AUD (Australian Dollar)    =    1.8631 GEL (Georgian Lari)")
        print("1 AZN (Azerbaijan Manat)    =    1.6148 GEL (Georgian Lari)")
        print("1 BGN (Bulgarian Lev)    =    1.5393 GEL (Georgian Lari)")
        print("1 BRL (Brazilian Real)    =    0.5031 GEL (Georgian Lari)")
        print("1 BYN (Belarusian Rouble)    =    0.8405 GEL (Georgian Lari)")
        print("1 CAD (Canadian Dollar)    =    2.0199 GEL (Georgian Lari)")
        print("1 CHF (Swiss Franc)    =    3.2013 GEL (Georgian Lari)")
        print("10 CNY (China Renminbi)    =    3.9111 GEL (Georgian Lari)")
        print("10 CZK (Czech Koruna)    =    1.1868 GEL (Georgian Lari)")
        print("10 DKK (Danish Krone)    =    4.0373 GEL (Georgian Lari)")
        print("10 EGP (Egyptian Pound    =    0.5673 GEL (Georgian Lari)")
        print("1 EUR (Euro)    =    3.0106 GEL (Georgian Lari)")
        print("1 GBP (United Kingdom Pound)    =    3.5873 GEL (Georgian Lari)")
        print("10 HKD (Hong-Kong Dollar)    =    3.5344 GEL (Georgian Lari)")
        print("100 HUF (Hungarian Forint)    =    0.7492 GEL (Georgian Lari)")
        print("10 ILS (Israeli Shekel)    =    7.2528 GEL (Georgian Lari)")
        print("100 JPY (Japanese Yen)    =    1.8477 GEL (Georgian Lari)")
        print("100 KGS (Kyrgyzstan Som)    =    3.2542 GEL (Georgian Lari)")
        print("1000 KRW (South Korean Won)    =    2.0376 GEL (Georgian Lari)")
        print("1 KWD (Kuwaiti Dinar)    =    8.9563 GEL (Georgian Lari)")
        print("100 KZT (Kazakhstan Tenge)    =    0.5662 GEL (Georgian Lari)")
        print("10 MDL (Moldova Lei)    =    1.5615 GEL (Georgian Lari)")
        print("10 NOK (Norwegian Krone)    =    2.5816 GEL (Georgian Lari)")
        print("1 NZD (New Zealand Dollar)    =    1.6858 GEL (Georgian Lari)")
        print("10 PLN (Polish Zloty)    =    6.9613 GEL (Georgian Lari)")
        print("10 QAR (Qatari Rial)    =    7.5384 GEL (Georgian Lari)")
        print("10 RON (Romanian Leu)    =    6.0489 GEL (Georgian Lari)")
        print("100 RSD (Serbian Dinar)    =    2.5731 GEL (Georgian Lari)")
        print("100 RUB (Russian Ruble)    =    2.8510 GEL (Georgian Lari)")
        print("10 SEK (Swedish Krona)    =    2.6469 GEL (Georgian Lari)")
        print("1 SGD (Singapore Dollar)    =    2.1050 GEL (Georgian Lari)")
        print("10 TJS (Tajikistan Somoni)    =    2.5710 GEL (Georgian Lari)")
        print("10 TMT (Turkmenistan Manat)    =    7.8431 GEL (Georgian Lari)")
        print("1 TRY (Turkish Lira)    =    0.0801 GEL (Georgian Lari)")
        print("10 UAH (Ukraine Hryvna)    =    0.6662 GEL (Georgian Lari)")
        print("1 USD (US Dollar)    =    2.7451 GEL (Georgian Lari)")
        print("1000 UZS (Uzbekistan Sum)    =    0.2147 GEL (Georgian Lari)")
        print("10 ZAR (South African Rand)    =    1.5778 GEL (Georgian Lari)")
        print(" ")
        print("the deal is complete, thank you for using our bank!")
    elif hello == 2:                                                                #taking out a loan
        money = int(input("How much money are you asking for?: "))
        income = int(input("How much is your yearly income?: "))
        months = int(input("How many months would you like to pay your loan?: "))
        monthly_payment = (money / months)
        print("Your monthly payment will be: " +  str(monthly_payment))
        print("the deal is complete, thank you for using our bank!")
    elif hello == 3:                                                                #transfering to other accounts
        input("Please put in a card number of who you transfering to: ")
        input("How much would you like to transfer?: ")
        pin = int(input("Please enter your pin code: "))
        if pin == pin_code:
            print("transfered succesfully")
        else:
            print("Your pin code is incorrect, your card is blocked for your security, you can come to the our bank at any time or use mobile bank to unblock the card")
    elif hello == 4:                                                               #blocking the card
        answer = input("Are you sure that you want block your card? yes/no: ")
        if answer == "yes":
            print("Your card has been blocked at your request!")
            print("the deal is complete, thank you for using our bank!")
        else:
            print("Card blocking has been cancelled")
    elif hello == 5:                                                                #withdrawing money
        input("How much money would you like withdraw?: ")
        pin2 = int(input("Please enter your pin code: "))
        if pin2 == pin_code:
            print("Cashout complite")
            print("The deal is complete, thank you for using our bank!")
        else:
            print("Your pin code is incorrect, your card is blocked for your security, you can come to the our bank at any time or use mobile bank to unblock the card")
    elif hello == 6:                                                                #creating an account
        input("Are you sure you want to create a new account?: ")
        pin3 = int(input("Please enter your pin code: "))
        if pin3 == pin_code:
            print("your personal account has been created")
        if pin3 == pin_code:
            print("your account has been created")
        else:
            print("something went wrong try again")
    elif hello == 7:
        card = input("what kind of card do you want to make, debit or credit card?: ")         #creating a card
        if card == "debit":
            input("please enter your pin code: ")
            input("please enter your personal number: ")
            input("please enter your real name again: ")
            input("please enter your real lastname again: ")
            print("your debit card has been made, come to SBG bank for pickup")
        elif card == "credit":
            input("please enter your pin code: ")
            input("please enter your personal number: ")
            input("please enter your real name: ")
            input("please enter your real lastname: ")
            print("your credit card has been made, come to SBG bank for pickup")
    elif hello == 8:
        print("sorry to hear that, our assistant will get back to you very soon")              #another problem
        print(" ")
        input("please tell us what your issue was, in order to improve our service: ")
        print("good bye thank you for choosing SBG.")
    else:
        print("we do not offer those services,sorry.")
else:
    print("you cannot open a new account you are underage")

print(" ")


score = int(input("please score our project on a scale 1-10 "))       
if score == 10:
    print("thank youu<3")
else:
    print(" ")
    print("whyyy!!!!!!      (ง •̀_•́)ง")
    print(" ")
# Онлайн карта
* Запуск серверной части:    
    - cd server  
    - npm ci  
    - npm start  
* Запуск клиентской части:
    - cd client  
    - npm ci  
    - npm run dev  
    - в браузере localhost:5137  
  
* Принцип работы:   
    Открывается приложение с картой, все клиенты, которые открыли приложение находятся в единой рабочей области.  
    При клике на карту, откроется попап с вводом информации о метке, которую пользователь хочет добавить на карту, у остальных пользователей на карте также появится метка.  
    Метку можно перемещать, также при нажатии на нее откроется информационное окно с возможность редактирования и удаления.   
    Также справа сайдбар со списком маркеров, при клике на маркер карта переносится к его расположению на карте.

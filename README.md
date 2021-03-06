# Range slider

## [DEMO](https://cosmoboyme.github.io/range-slider/)

## Библеотеки
JQuery: 3.6.0

## Команды
    Установка зависимойстей
```
npm -i
```
    Запуск проекта в браузере
```
npm start
```
    Сборка проекта в режиме разработчика
```
npm run dev
```
    Сборка проекта для продакшена
```
npm run build
```
    Проверка стилий в проекте
```
npm run style
```
    Запуск тестов
```
npm run test
```
    Запуск линтов
```
npm run lint
```
## Использование
инициализация без опций
```const slider = $(element).slider()```
инициализация с опциями
```const slider = $(element).slider({min: 5, max: 10})```

После инициализации появляеться возможнность использования методов

Обновление опций
```slider.updateOptions({min: 1, max: 5});```
Получение объекта с опциями
```slider.getOptions()```
Подписаться на обновление слайдерра
```const cb = (options) => {}```
```slider.onChangeOptions(cb)```

## Опции
| Options       | Defaults    | Type     | Description   |
|:-------------:|    :-----:  | :------: | ----------- |
| min           | 0           | number   | Минимальное значение диапазона  |
| max           | 10          | number   | Максимальное значение диапазона |
| step          | 1           | number   | Шаг должен быть больше чем 0 |
| scaleCounts   | 11          | number   | Количество значений шкалы, если значение прилипает на другое значение то данное значение будет удаленно |
| values        | [5, 6]      | number[] | Значения ползунков, может быть любое количество |
| scale         | true        | boolean  | Включить или выключить шкалу значений |
| tooltip       | true        | boolean  | Включить или выключить подсказки |
| progress      | true        | boolean  | Включить или выключить прогресс бар  |



## API Плагина

| Methods       | Parameters| Description   |
|:-------------:|    :-----:  | ----------- |
|updateOptions  | Partial<IOptions> |Принимает объект с новыми опциями и изменяет старые значения на новые |
|onChangeOptions| callback Function | Принимает callback функцию которая будет вызываться каждый раз когда опции обновились и передает объект с новыми опциями|
|getOptions() |    | Возвращяет клонированный объект текуших опций|

## Архитектура
Приложение основано на MVP паттерне проектирования, данный паттерн требует, что бы каждый слой приложения отвечал только за определённую часть. Приложение разделено на 3 независимых слоя M(Model), V(View), Presenter(P).  Взаимодействие между слоями происходит с помощью подписок, используя паттерн Observer.

- Presenter: является связывавшимся звеном между view и model. Presenter подписывается на model и view и при изменении вызывает публичные методы. 
- Model: хранит в себе всю бизнес логику приложения, при изменение состояния оповещает Presenter 
- View: отвечает за визуальную часть приложения и взаимодействия пользователя с приложением. При изменение View происходит уведомление  Presenter


## [UML](https://is.gd/PXRHpg)
 

let dragMItems;
let backDragMItems;
let dropMArea = document.querySelector('.c-wz-mdrop-box');

let mobileWidgetOrder = [];
let oldMobileWidgetOrder = localStorage.getItem('MV_WIDGET_ORDER');
var defaultMobileWidgetOrder = 'mwzd-shapshot,mwzd-insights,mwzd-placeholder,mwzd-trends,mwzd-debts,mwzd-cash-flow,mwzd-recent-transactions,mwzd-recurring-merchants,mwzd-placeholder,mwzd-balance-sheet,mwzd-budgets,mwzd-credit-score,mwzd-placeholder';

if (!oldMobileWidgetOrder) {
    localStorage.setItem('MV_WIDGET_ORDER', defaultMobileWidgetOrder);
    oldMobileWidgetOrder = defaultMobileWidgetOrder;
}

mobileWidgetOrder = oldMobileWidgetOrder.split(',');

mobileWidgetOrder.forEach(function (widgetId) {
    let currentArrangementBox = document.querySelector('.c-wz-mbox-l');
    
    var spanEl = document.createElement('span');
    spanEl.classList.add('drag-mitem');
    spanEl.setAttribute('id', widgetId);
    spanEl.innerHTML = widgetId.split('-')[1].replace('-', ' ').toLocaleUpperCase();

    currentArrangementBox.appendChild(spanEl)
});


let touchStartHandler = function(event) {
    let el = event.target;
    
    if (el.classList.contains('new-arrangement-item')) {
        el.classList.remove('new-arrangement-item');
        document.querySelector('.c-wz-mbox-l').appendChild(el);

        if (!document.querySelector('.c-wz-mbox-l .mitem-placeholder').classList.contains('hide')) {
            document.querySelector('.c-wz-mbox-l .mitem-placeholder').classList.add('hide');
        }

        if (document.querySelectorAll('.c-wz-mbox-r .drag-mitem').length < 1) {
            document.querySelector('.c-wz-mbox-r .mitem-placeholder').classList.remove('hide');
        }
    } else {
        el.classList.add('new-arrangement-item');
        document.querySelector('.c-wz-mbox-r').appendChild(el);

        if (!document.querySelector('.c-wz-mbox-r .mitem-placeholder').classList.contains('hide')) {
            document.querySelector('.c-wz-mbox-r .mitem-placeholder').classList.add('hide');
        }

        if (document.querySelectorAll('.c-wz-mbox-l .drag-mitem').length < 1) {
            document.querySelector('.c-wz-mbox-l .mitem-placeholder').classList.remove('hide');
        }
    }
}

let addEventListenersForMItem = function(element) {
    element.addEventListener('touchstart', touchStartHandler);
}

document.querySelector('.c-wz-arrange-start-mbtn').addEventListener('click', function () {
    dragMItems = document.querySelectorAll('.drag-mitem');
    backDragMItems = document.querySelectorAll('.drag-mitem.back-item');

    dragMItems.forEach(function(dragMItem) {
        addEventListenersForMItem(dragMItem);
    })
    
    backDragMItems.forEach(function(backDragMItem) {
        addEventListenersForMItem(backDragMItem);
    })
});

document.querySelector('.c-wz-arrange-save-mbtn').addEventListener('click', function () {
    let spanForNewArrangement = document.querySelectorAll('.c-wz-mbox-r .drag-mitem.new-arrangement-item');

    if (spanForNewArrangement.length < 10) {
        document.querySelector('.c-mwz-msg-warn').classList.remove('hide');
        return;
    } else {
        document.querySelector('.c-mwz-msg-warn').classList.add('hide');
    }
    mobileWidgetOrder = [];

    spanForNewArrangement.forEach(function (element) {
        mobileWidgetOrder.push(element.id);
    });

    localStorage.setItem('MV_WIDGET_ORDER', mobileWidgetOrder);
});

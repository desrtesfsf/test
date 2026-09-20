// آلة حاسبة بسيطة - اختبار CodeRabbit
const resultInput = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let shouldResetDisplay = false;

/**
 * تحديث شاشة العرض
 */
function updateDisplay(value) {
    resultInput.value = value || '0';
}

/**
 * إضافة قيمة إلى المدخل الحالي
 */
function appendValue(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    currentInput += value;
    updateDisplay(currentInput);
}

/**
 * مسح كل شيء
 */
function clearAll() {
    currentInput = '';
    updateDisplay('0');
}

/**
 * حذف آخر حرف
 */
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}

/**
 * حساب النتيجة
 * ملاحظة: يستخدم eval لأغراض تعليمية فقط
 */
function calculate() {
    if (!currentInput) return;

    try {
        const result = eval(currentInput);
        currentInput = String(result);
        updateDisplay(currentInput);
        shouldResetDisplay = true;
    } catch (error) {
        updateDisplay('خطأ');
        currentInput = '';
    }
}

// ربط الأحداث بالأزرار
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value) {
            appendValue(value);
        } else if (action === 'clear') {
            clearAll();
        } else if (action === 'delete') {
            deleteLast();
        } else if (action === 'equals') {
            calculate();
        }
    });
});

// دعم لوحة المفاتيح (اختياري)
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
        appendValue(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearAll();
    }
});
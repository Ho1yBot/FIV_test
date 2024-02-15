$(document).ready(function () {
    $("a[href*=#]").on("click", function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 777);
        e.preventDefault();
        return false;
    });
});

window.addEventListener('DOMContentLoaded', function () {
    // Создаем массив с именами пользователей
    const userNames = ['Золтан', 'Дикая Охота', 'Эмгыр', 'Дийкстра', 'Йеннифэр'];
    let userNameIndex = 0; // Индекс текущего имени пользователя
    let goodsNumber; // Переменная для количества товаров
    let notificationShown = false; // Флаг для отслеживания показа плашки уведомления

    // Функция для отображения плашки уведомления
    function showNotification() {
        const userName = userNames[userNameIndex]; // Получаем текущее имя пользователя
        goodsNumber = Math.floor(Math.random() * 10) + 1; // Генерируем случайное количество товаров от 0 до 10
        notificationBanner.innerText = `${userName} купил этот товар в кол-ве ${goodsNumber} ед. в Новиграде `;
        notificationBanner.style.display = 'block'; // Показываем плашку


        // Увеличиваем индекс для следующего имени пользователя, при достижении конца массива начинаем сначала
        userNameIndex = (userNameIndex + 1) % userNames.length;
    }

    // Обработчик события прокрутки страницы
    window.addEventListener('scroll', function () {
        // Если доскроллили до формы и плашка еще не показывалась
        const formInner = document.querySelector('.form__inner');
        if (!notificationShown && window.scrollY >= formInner.offsetTop) {
            showNotification();
            notificationShown = true; // Устанавливаем флаг, что плашка уже показана
        }
    });

    // Заглушка для обновления плашки уведомления каждую минуту
    setInterval(showNotification, 60000); // Обновляем раз в минуту (60000 миллисекунд)
});

window.addEventListener('DOMContentLoaded', function () {
    let commentCounter = 1; // Счетчик для комментариев

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('reply-btn')) {
            const parentComment = target.closest('.comments-item');
            const parentCommentId = parentComment.getAttribute('data-parent-id'); // Используем атрибут data-parent-id

            // Создаем область для ввода ответа
            const replyArea = document.createElement('div');
            replyArea.classList.add('reply-area');
            replyArea.innerHTML = `
                <textarea class="reply-textarea" placeholder="Введите ваш ответ"></textarea>
                <button class="send-reply-btn">Отправить</button>
            `;
            parentComment.appendChild(replyArea);

            // Скрываем кнопку "Ответить"
            target.style.display = 'none';

            // Обработчик события для отправки ответа
            const sendReplyBtn = replyArea.querySelector('.send-reply-btn');
            sendReplyBtn.addEventListener('click', function () {
                const replyTextarea = replyArea.querySelector('.reply-textarea');
                const replyText = replyTextarea.value.trim();
                if (replyText) {
                    const commentIdentifier = `comment-${commentCounter}`;
                    parentComment.classList.add(commentIdentifier);

                    const replyId = `reply_${commentIdentifier}`;
                    let replies = localStorage.getItem(replyId);
                    replies = replies ? JSON.parse(replies) : [];
                    replies.push(replyText);
                    localStorage.setItem(replyId, JSON.stringify(replies));

                    appendReply(parentComment, replyText);
                    commentCounter++;

                    saveUniqueClass(commentIdentifier);

                    // Скрыть область для ввода ответа после отправки
                    parentComment.removeChild(replyArea);

                    // Показать кнопку "Ответить" после отправки ответа
                    target.style.display = 'inline';
                }
            });
        }
    });

    function appendReply(parentComment, replyText) {
        const replyElement = document.createElement('div');
        replyElement.classList.add('comment-reply');
        replyElement.innerHTML = `
            <div class="comment-avatar">
                <img src="img/autoCommentsAva.jpg" width="32" height="32" />
            </div>
            <div class="comment-text">
                <span class="comment-username">Ваше имя</span><br>
                ${replyText}
                <br>
            </div>
        `;
        parentComment.appendChild(replyElement);
    }

    function saveUniqueClass(className) {
        let classes = localStorage.getItem('commentClasses');
        classes = classes ? JSON.parse(classes) : [];
        if (!classes.includes(className)) {
            classes.push(className);
            localStorage.setItem('commentClasses', JSON.stringify(classes));
        }
    }

    function restoreUniqueClasses() {
        let classes = localStorage.getItem('commentClasses');
        classes = classes ? JSON.parse(classes) : [];
        classes.forEach(className => {
            const elements = document.querySelectorAll(`.${className}`);
            elements.forEach(element => {
                element.classList.add(className);
            });
        });
    }

    restoreUniqueClasses();
});





var send = document.querySelector(".send-btn"),
    textarea = document.querySelector(".textarea"),
    sendContainer = document.querySelector(".input-action"),
    commentNameInput = document.querySelector(".comment-name-input");
const key = `commentOn${window.location.pathname}`;
let inputBlock = document.querySelector(".form__sand");
let adminText = document.querySelector(".comment__admin");
let comment = document.querySelector(".comment-appear");

adminText.style.display = "none";
comment.style.display = "none";

if (sendContainer) {
    function likeCount() {
        var like = document.querySelectorAll(".like");
        var likeCountOutput = document.querySelectorAll(".like-count");
        [].forEach.call(like, function (item, i) {
            item.onclick = function () {
                if (item.classList.contains("liked")) {
                    item.classList.remove("liked");
                    item.style.fontWeight = "normal";
                    --likeCountOutput[i].innerHTML;
                    likeCountOutput[i].classList.remove("like-count-liked");
                    likeCountOutput[i].classList.add("like-count-unliked");
                } else {
                    item.classList.add("liked");
                    item.style.fontWeight = "bold";
                    ++likeCountOutput[i].innerHTML;
                    likeCountOutput[i].classList.add("like-count-liked");
                    likeCountOutput[i].classList.remove("like-count-unliked");
                }
            };
        });
    }
    likeCount();

    sendContainer.classList.remove("input-action-focus");
    // И ширина инпута тоже будет больше
    textarea.classList.remove("textarea-focus");

    // При фокусировке на поле ввода появляется кнопка отправления комментария, а также увеличивается высота поля ввода
    textarea.addEventListener("focus", function (event) {
        sendContainer.classList.add("input-action-focus");
        textarea.classList.add("textarea-focus");
    });

    // При потере фокуса поле ввода схлопнется, если оно пустое
    textarea.addEventListener("blur", function () {
        if (!textarea.value) {
            textarea.classList.remove("textarea-focus");
        } else {
            return false;
        }
    });

    // Добавление коммента и проверка заполненности полей
    send.addEventListener("click", function (event) {
        if (!textarea.value) {
            alert("WRITE YOUR COMMENT!");
            send.disabled = true;
        } else {
            var allComments = document.querySelectorAll(".comments-item");
            var newComment = document.createElement("div");
            newComment.classList.add("comments-item");
            newComment.classList.add("comment-appear");
            newComment.innerHTML = allComments[0].innerHTML;
            newComment.querySelector(".comment-username").innerHTML =
                textarea.value;
            newComment
                .querySelector(".like-count")
                .classList.remove("like-count-liked");
            newComment.querySelector(".like").classList.remove("liked");
            newComment.querySelector(".like").style.fontWeight = "normal";
            newComment.querySelector(".like-count").innerHTML = 0;
            newComment.querySelector(".comment-date").innerHTML = "";
            // вставляем данные в новый коммент, если есть инпут имени
            if (commentNameInput) {
                newComment.querySelector(".comment-text").innerHTML =
                    '<span class="comment-username">' +
                    commentNameInput.value +
                    "</span>" +
                    textarea.value;
                let q1 = commentNameInput.value;
                let q2 = textarea.value;
                localStorage.setItem("user", q1);
                localStorage.setItem("text", q2);
                textarea.value = "";
                commentNameInput.value = "";
                document
                    .querySelector(".comments")
                    .insertBefore(newComment, document.querySelector("#asd"));
                likeCount();
            } else {
                alert("Your comment is sent for moderation!");
                textarea.value = "";
            }
        }
    });
}

if (!localStorage.getItem(key)) {
    send.addEventListener("click", (e) => {
        e.preventDefault();
        window.localStorage.setItem(key, "true");

        inputBlock.style.display = "none";
        adminText.style.display = "block";
    });
} else {
    inputBlock.style.display = "none";
    adminText.style.display = "block";
    comment.style.display = "block";

    let commentUserName2 = localStorage.getItem("user");
    document.getElementById("username").innerHTML = commentUserName2;

    let commentUserText2 = localStorage.getItem("text");
    document.getElementById("usercomment").innerHTML = commentUserText2;
}

window.onload = function () {
    // Главная дата - нужно добавить класс элементу .mv_mdate
    var mv_mdate = document.getElementsByClassName("mv_mdate");
    var mv_now = Date.now(),
        mv_one_month = 1000 * 60 * 60 * 24 * 10;
    if (mv_mdate) {
        for (i = 0; i < mv_mdate.length; i++) {
            mv_mdate[i].innerHTML = new Date(
                mv_now - mv_one_month
            ).toLocaleDateString();
        }
    }

    // Дата сегодня- нужно добавить класс элементу .mv_tdate
    var mv_tdate = document.getElementsByClassName("mv_tdate");
    if (mv_tdate) {
        for (i = 0; i < mv_tdate.length; i++) {
            mv_tdate[i].innerHTML = new Date(mv_now).toLocaleDateString();
        }
    }

    // Даты для комментов - нужно элементам где должна быть дата добавить класс .mv_rdate
    var mv_rdate = document.getElementsByClassName("mv_rdate");
    if (mv_rdate) {
        for (i = 0; i < mv_rdate.length; i++) {
            let now = Date.now();
            let one_month = 1000 * 60 * 60 * 24 * (i + 2) * 0.3;
            let new_rdate = new Date(now - one_month).toLocaleDateString();
            let y = mv_rdate.length - i - 1;
            mv_rdate[y].innerHTML = new_rdate;
        }
    }

    // Даты для комментов - нужно элементам где должна быть дата добавить класс .mv_rtdate
    var mv_rtdate = document.getElementsByClassName("mv_rtdate");
    if (mv_rtdate) {
        for (i = 0; i < mv_rtdate.length; i++) {
            let now = Date.now();
            let one_month = 1000 * 60 * 60 * 24 * (i + 2) * 0.3;
            let new_rtdate = new Date(now - one_month).toLocaleDateString();
            let new_rtdateH =
                new Date(now - one_month).getHours() >= 10
                    ? new Date(now - one_month).getHours()
                    : "0" + new Date(now - one_month).getHours();
            let new_rtdateM =
                new Date(now - one_month).getMinutes() >= 10
                    ? new Date(now - one_month).getMinutes()
                    : "0" + new Date(now - one_month).getMinutes();
            let new_rtdateT = new_rtdateH + ":" + new_rtdateM;
            let y = mv_rtdate.length - i - 1;
            mv_rtdate[y].innerHTML = new_rtdate + " " + new_rtdateT;
        }
    }

    // Текущий год - нужно добавить класс элементу .mv_tyear
    var mv_tyear = document.getElementsByClassName("mv_tyear");
    if (mv_tyear) {
        for (i = 0; i < mv_tyear.length; i++) {
            mv_tyear[i].innerHTML = new Date().getFullYear();
        }
    }
};



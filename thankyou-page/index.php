<?php
session_start();

require_once(__DIR__ . '/translations.php');

const MAX_COMMENTS_COUNT = 3;
const DEFAULT_COUNTRY = 'ES';

$geo = $_SESSION['country'];
$fio = $_SESSION['name'];
$phone = $_SESSION['phone'];
        
$country = isset($languages[$geo]) ? $geo : DEFAULT_COUNTRY;
$translation = $languages[$country];

function getComments($names, $texts)
{
    $commentCount = min(MAX_COMMENTS_COUNT, count($names), count($texts));

    $nKeys = array_rand($names, $commentCount);
    $tKeys = array_rand($texts, $commentCount);

    $comments = [];
    for ($i = 0; $i < $commentCount; $i++) {
        array_push($comments, [
            'name' => $names[$nKeys[$i]],
            'text' => $texts[$tKeys[$i]],
        ]);
    }

    return $comments;
}

?>
<!DOCTYPE html>
<html lang="<?= @$country; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="thankyou-page/thanks.ico" type="image/x-icon">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="theme-color" content="#111111">
    <title>Thanks</title>
    <link rel="stylesheet" href="css/thanks.css">
</head>

<body>
    <div class="page-wrapper">
        <div class="main">

            <div class="header">
                <div class="header__title">
                    <h3 id="title"><?= @$translation['a1']; ?></h3>
                </div>
                <div class="header__subtitle">
                    <p id="subtitle"><?= @$translation['a2']; ?></p>
                </div>
            </div>
            <div class="user-info">
                <div class="user-info__item">
                    <p> <span id="name"><?= @$translation['a3']; ?></span> <span class="user-info__name"><?= @$fio ?></span></p>
                </div>
                <div class="user-info__item">
                    <p><span id="phone"><?= @$translation['a4']; ?></span> <span class="user-info__phone"><?= @$phone ?></span></p>
                </div>
            </div>
            <div class="order-steps">
                <div class="order-steps__item">
                    <div class="order-steps__img">
                        <img src="img/tp-step-1.png" alt="">
                    </div>
                    <div class="order-steps__title">
                        <p id="step1">
                            <?= @$translation['a5']; ?>
                        </p>
                    </div>
                </div>
                <div class="order-steps__item">
                    <div class="order-steps__img">
                        <img src="img/tp-step-2.png" alt="">
                    </div>
                    <div class="order-steps__title">
                        <p id="step2">
                            <?= @$translation['a6']; ?>
                        </p>
                    </div>
                </div>
                <div class="order-steps__item">
                    <div class="order-steps__img">
                        <img src="img/tp-step-3.png" alt="">
                    </div>
                    <div class="order-steps__title">
                        <p id="step3">
                            <?= @$translation['a7']; ?>
                        </p>
                    </div>
                </div>
            </div>
            <div class="reviews">
                <?php
                    $comments = getComments($translation['n'], $translation['c']);
                    $commentCount = count($comments);

                    for ($i = 0; $i < $commentCount; $i++) {
                        $r = rand(0, 5);
                        $dateClass = $i == ($commentCount - 1) ? 'day-1' : 'day-0';
                        $bgAvatarClass = $r == 0 ? '' : "bg-color-${r}"; 
                    ?>
                        <div class="reviews__item">
                            <div class="reviews__avatar">
                                <div class="avatar-circle <?= $bgAvatarClass ?>">
                                    <span class="symbol"><?= @iconv_substr($comments[$i]['name'], 0, 1, 'utf-8') ?></span>
                                </div>
                            </div>
                            <div class="reviews__body">
                                <div class="reviews__info">
                                    <span class="reviews__name"><?= @$comments[$i]['name'] ?></span>
                                    <div class="reviews__stars"></div>
                                    <span class="reviews__date"><span class="<?= $dateClass ?>"></span></span>
                                </div>
                                <div class="reviews__text">
                                    <p><?= @$comments[$i]['text'] ?></p>
                                </div>
                            </div>
                        </div>
                    <?php } ?>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment-with-locales.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            moment.locale(document.getElementsByTagName("html")[0].getAttribute("lang"));

            document.querySelectorAll('.day-0').forEach(node => {
                node.innerHTML = moment().add('days', 0).format('L');
            });
            document.querySelectorAll('.day-1').forEach(node => {
                node.innerHTML = moment().add('days', -1).format('L');
            })
        })
    </script>
</body>

</html>

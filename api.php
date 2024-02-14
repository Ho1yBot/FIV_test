<?php
error_reporting(0);
session_start();

$listCountries =  get_information_for_landing();

function get_information_for_landing(){
    $params = array(
        'offer_id' => "134910",
        'country' => "IT"
    );
    $return = goCurl('get_information_for_landing', $params);

    return $return;
}

if (!empty($_POST)) {
    send_the_order($_POST);
}

function send_the_order($post)
{
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } else if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else if (isset($_SERVER['HTTP_X_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } else if (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } else if (isset($_SERVER['HTTP_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } else if (isset($_SERVER['REMOTE_ADDR'])) {
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    } else {
        $ipaddress = 'UNKNOWN';
    }

    $params = array(
        'goods_id' => $post['goods_id'],
        'ip' => $ipaddress,
        'msisdn' => $post['phone'],
        'name' => $post['name'],
        'country' => $post['country'],
        'domain' => $_SERVER['SERVER_NAME'],
    );

    if (isset($post['sub1'])) {
        $params['url_params[sub1]'] = $post['sub1'];
    }
    if (isset($post['sub2'])) {
        $params['url_params[sub2]'] = $post['sub2'];
    }
    if (isset($post['sub3'])) {
        $params['url_params[sub3]'] = $post['sub3'];
    }
    if (isset($post['sub4'])) {
        $params['url_params[sub4]'] = $post['sub4'];
    }
    if (isset($post['sub5'])) {
        $params['url_params[sub5]'] = $post['sub5'];
    }
    if (isset($post['utm_source'])) {
        $params['url_params[utm_source]'] = $post['utm_source'];
    }
    if (isset($post['utm_content'])) {
        $params['url_params[utm_content]'] = $post['utm_content'];
    }
    if (isset($post['utm_term'])) {
        $params['url_params[utm_term]'] = $post['utm_term'];
    }
    if (isset($post['utm_campaign'])) {
        $params['url_params[utm_campaign]'] = $post['utm_campaign'];
    }
    if (isset($post['name'])) {
        $_SESSION['name'] = $post['name'];
    }
    if (isset($post['phone'])) {
        $_SESSION['phone'] = $post['phone'];
    }
    if (isset($post['country'])) {
        $_SESSION['country'] = $post['country'];
    }
    if (isset($post['pixel'])) {
        $_SESSION['pixel'] = $post['pixel'];
    }
    if (isset($post['stats_uuid'])) {
        $params['session_id'] = $post['stats_uuid'];
    }
    // write to file
    /*
    $fp = fopen('orders.txt', 'a');
    fwrite($fp, date("d-m-Y H:i:s"));
    fwrite($fp, ";");
    fwrite($fp, $params['name']);
    fwrite($fp, ";");
    fwrite($fp, $params['msisdn']);
    fwrite($fp, "\n");
    fclose($fp);
    */

    $return = goCurl('order/create.php', $params);
    $array = json_decode($return, true);
//    echo '<pre>';
//    print_r($array);
//    echo '</pre>';
//    die();
   
    header('Location:' . 'thankyou-page');

    // Show the error while testing
    /*
    if (isset($array['response'])) $array = $array['response'];
    if ($array['msg'] == "error") {
    header('Location:'.'error.php?msg='.$array['msg'].'&error='.$array['error']);
    } else {
    include './thankyou-page/index.php';
    }
    */
}

function goCurl($url, $data){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api-new.leadreaktor.com/api/$url?api_key=ad63f793816846f4a650b646110ffc2f");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $return = curl_exec($ch);
    curl_close($ch);

    return $return;
}
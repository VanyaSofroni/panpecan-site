<?php

$recepient = "mail.@mail.com"; //change
$siteName = "Название сайта \"Бренд\" "; //change

$pp_name = trim($_POST["pp_name"]);
$pp_phone = trim($_POST["pp_phone"]);
$pp_cake = trim($_POST["pp_cake"]);
$pp_email = trim($_POST["pp_email"]);
$pp_textarea = trim($_POST["pp_text"]);

$titleMail = "Новая заявка с сайта $siteName ";
$message = "
			ИМЯ:  $pp_name
			ТЕЛЕФОН:  $pp_phone

			EMAIL:  $pp_email
			СООБЩЕНИЕ:  $pp_textarea

			НАЗВАНИЕ ТОРТА:  $pp_cake
";

mail($recepient, $titleMail, $message, "MIME-Version: 1.0\n Content-type: text/plain; charset=\"utf-8\" \n From: $recepient");

?>
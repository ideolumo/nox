CREATE TABLE captchas (
  captcha_id INT(11) NOT NULL AUTO_INCREMENT,
  question VARCHAR(200) NOT NULL,
  answer VARCHAR(200) NOT NULL,
  created_at INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY(captcha_id)
) ENGINE=InnoDB;

FROM php:7-apache
COPY ./apache2.conf /etc/apache2/apache2.conf
RUN ln -s /etc/apache2/mods-available/expires.load /etc/apache2/mods-enabled/
RUN ln -s /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/
RUN ln -s /etc/apache2/mods-available/headers.load /etc/apache2/mods-enabled/
RUN docker-php-ext-install -j$(nproc) mysqli
EXPOSE 80


